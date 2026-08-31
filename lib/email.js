import { render } from "@react-email/render";
import { Resend } from "resend";
import TeamNotificationEmail from "../emails/TeamNotificationEmail";
import ThankYouEmail from "../emails/ThankYouEmail";
import { getEmailLogoAttachment, getEmailTemplateProps } from "./emailAssets";

const DEFAULT_FROM = "RedSpider <info@redspider.ae>";
const DEFAULT_RECIPIENTS = [
  "info@redspider.ae",
  "ahmad@redspider.ae",
  "gccwebhosting@gmail.com",
];

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;
}

function getRecipientList() {
  const configured = process.env.CONTACT_EMAIL_RECIPIENTS;

  if (!configured) {
    return DEFAULT_RECIPIENTS;
  }

  return configured
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function getFormLabels(formSource) {
  if (formSource === "quote") {
    return {
      badge: "New quote request",
      intro: "A new quote request was submitted through the RedSpider home page form.",
      emailSubjectPrefix: "New quote request",
      plainHeading: "New quote request",
    };
  }

  return {
    badge: "New website enquiry",
    intro: "A new enquiry was submitted through the RedSpider contact page form.",
    emailSubjectPrefix: "New enquiry",
    plainHeading: "New website enquiry",
  };
}

function buildTeamPlainText({
  name,
  email,
  phone,
  subject,
  content,
  ipAddress,
  location,
  formCountry,
  formSource,
}) {
  const labels = getFormLabels(formSource);

  const lines = [
    labels.plainHeading,
    "",
    `Form: ${formSource === "quote" ? "Request a Quote" : "Contact Us"}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Enquiry about: ${subject}`,
    `IP address: ${ipAddress || "Unknown"}`,
    `Location: ${location || "Unknown"}`,
  ];

  if (formCountry) {
    lines.push(`Country selected: ${formCountry}`);
  }

  lines.push("", "Message:", content, "", `Reply to ${name} at ${email}`);

  return lines.join("\n");
}

function buildThankYouPlainText({ name }) {
  return [
    `Dear ${name},`,
    "",
    "Thank you for contacting RedSpider. We have received your enquiry and our team will get back to you shortly — usually within one business day.",
    "",
    "What happens next?",
    "1. Our team reviews your enquiry",
    "2. We contact you to discuss your needs",
    "3. We prepare a tailored proposal if needed",
    "",
    "If your request is urgent, call us at +971 55 5515 475.",
    "",
    "Best regards,",
    "The RedSpider Team",
    "https://www.redspider.ae",
  ].join("\n");
}

export async function buildTeamNotificationEmail(data, options = {}) {
  const html = await render(TeamNotificationEmail(getEmailTemplateProps(data, options)));
  const labels = getFormLabels(data.formSource);

  return {
    subject: `${labels.emailSubjectPrefix}: ${data.subject}`,
    html,
    text: buildTeamPlainText(data),
  };
}

export async function buildThankYouEmail(data, options = {}) {
  const html = await render(ThankYouEmail(getEmailTemplateProps(data, options)));

  return {
    subject: "Thank you for contacting RedSpider",
    html,
    text: buildThankYouPlainText(data),
  };
}

export async function sendContactEmails({
  name,
  email,
  phone,
  subject,
  content,
  ipAddress = "Unknown",
  location = "Unknown",
  formCountry = "",
  formSource = "contact",
}) {
  const resend = getResendClient();
  const from = getFromAddress();
  const recipients = getRecipientList();

  const sendOptions = { forSend: true };
  const logoAttachment = getEmailLogoAttachment();

  const teamEmail = await buildTeamNotificationEmail(
    {
      name,
      email,
      phone,
      subject,
      content,
      ipAddress,
      location,
      formCountry,
      formSource,
    },
    sendOptions,
  );

  const thankYouEmail = await buildThankYouEmail({ name }, sendOptions);

  const [teamResult, userResult] = await Promise.all([
    resend.emails.send({
      from,
      to: recipients,
      replyTo: email,
      subject: teamEmail.subject,
      html: teamEmail.html,
      text: teamEmail.text,
      attachments: [logoAttachment],
    }),
    resend.emails.send({
      from,
      to: email,
      subject: thankYouEmail.subject,
      html: thankYouEmail.html,
      text: thankYouEmail.text,
      attachments: [logoAttachment],
    }),
  ]);

  if (teamResult.error) {
    throw teamResult.error;
  }

  if (userResult.error) {
    console.error("Thank-you email failed:", userResult.error);
  }

  return {
    teamEmailId: teamResult.data?.id,
    thankYouEmailId: userResult.data?.id,
  };
}
