import {
  validateAgreement,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "../../lib/formValidation";
import { sendContactEmails } from "../../lib/email";
import { getClientIp } from "../../lib/getClientIp";

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

  const subjectError = body.subject?.trim()
    ? ""
    : "Choose an enquiry type.";

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");

    return res.status(500).json({
      message: "Email service is not configured",
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

  try {
    await sendContactEmails({
      name,
      email,
      phone,
      subject,
      content,
      ipAddress,
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
