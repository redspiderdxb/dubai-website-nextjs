import { render } from "@react-email/render";
import TeamNotificationEmail from "../../../emails/TeamNotificationEmail";
import ThankYouEmail from "../../../emails/ThankYouEmail";
import { getEmailTemplateProps } from "../../../lib/emailAssets";

const TEMPLATES = {
  "thank-you": {
    component: ThankYouEmail,
    sampleProps: {
      name: "John Smith",
    },
  },
  "team-notification": {
    component: TeamNotificationEmail,
    sampleProps: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+971 50 123 4567",
      subject: "Corporate Website",
      content:
        "We are looking for a modern corporate website with CMS integration and multilingual support. Please share your packages and timeline.",
      ipAddress: "203.0.113.42",
      location: "Dubai, Dubai, United Arab Emirates",
      formCountry: "UAE",
      formSource: "contact",
    },
  },
  "team-notification-quote": {
    component: TeamNotificationEmail,
    sampleProps: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+971 50 123 4567",
      subject: "Corporate Website",
      content:
        "We need a quote for a new corporate website with CMS and multilingual support.",
      ipAddress: "203.0.113.42",
      location: "Dubai, Dubai, United Arab Emirates",
      formCountry: "UAE",
      formSource: "quote",
    },
  },
};

export default async function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ message: "Not found" });
  }

  const template = String(req.query.template || "");

  const entry = TEMPLATES[template];

  if (!entry) {
    return res.status(404).json({
      message: "Unknown template. Use thank-you or team-notification.",
    });
  }

  try {
    const html = await render(
      entry.component(getEmailTemplateProps(entry.sampleProps, { forSend: false })),
    );

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(html);
  } catch (error) {
    console.error("Email preview error:", error);

    return res.status(500).json({
      message: "Failed to render email template",
    });
  }
}
