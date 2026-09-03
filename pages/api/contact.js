import {
  validateAgreement,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "../../lib/formValidation";
import { sendContactEmails } from "../../lib/email";
import { getClientIp } from "../../lib/getClientIp";
import { getLocationFromIp } from "../../lib/getLocationFromIp";

const SUCCESS_MESSAGE =
  "Thank you! Your enquiry has been submitted successfully. We will contact you soon.";

function collectFieldErrors(body) {
  const errors = {};

  const nameError = validateName(body.name);
  if (nameError) {
    errors.name = nameError;
  }

  const emailError = validateEmail(body.email);
  if (emailError) {
    errors.email = emailError;
  }

  const phoneError = validatePhone(body.phone);
  if (phoneError) {
    errors.phone = phoneError;
  }

  const subjectError = body.subject?.trim() ? "" : "Choose an enquiry type.";

  if (subjectError) {
    errors.subject = subjectError;
  }

  const contentError = validateMessage(body.content, "message");
  if (contentError) {
    errors.content = contentError;
  }

  const agreementError = validateAgreement(body.agree_terms_and_policy);
  if (agreementError) {
    errors.agree_terms_and_policy = agreementError;
  }

  return errors;
}

async function saveContactToDashboard(payload) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("Contact API configuration is missing.");
  }

  const response = await fetch(`${apiUrl}/contacts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data?.message || "Failed to save contact enquiry.");

    error.status = response.status;
    error.details = data;

    throw error;
  }

  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const body = req.body || {};
  const errors = collectFieldErrors(body);

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Please check the form details and try again.",
      errors,
    });
  }

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const phone = String(body.phone).trim();
  const subject = String(body.subject).trim();
  const content = String(body.content).trim();
  const ipAddress = getClientIp(req);
  const formCountry = String(body.country || "").trim();
  const formSource = String(body.formSource || "contact").trim();
  const location = await getLocationFromIp(ipAddress);

  const contactPayload = {
    name,
    email,
    phone,
    country: formCountry,
    formSource,
    subject,
    content,
    agree_terms_and_policy: body.agree_terms_and_policy,
  };

  // Save enquiry to dashboard/database first.
  try {
    await saveContactToDashboard(contactPayload);
  } catch (error) {
    console.error("Contact dashboard save error:", error);

    return res.status(error?.status || 500).json({
      message:
        error?.details?.message ||
        "Failed to save your enquiry. Please try again later.",
    });
  }

  // Existing email functionality preserved as-is.
  try {
    await sendContactEmails({
      name,
      email,
      phone,
      subject,
      content,
      ipAddress,
      location,
      formCountry,
      formSource,
    });

    return res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE,
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      message: "Failed to submit contact form. Please try again later.",
    });
  }
}
