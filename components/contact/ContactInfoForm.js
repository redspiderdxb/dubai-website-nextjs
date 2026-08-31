// components/contact/ContactInfoForm.js

import { useState } from "react";
import Button from "../ui/Button";
import FormAlert from "../ui/FormAlert";
import FormField from "../ui/FormField";
import ThemedSelect from "../ui/ThemedSelect";
import {
  focusField,
  getFirstErrorField,
  useFormValidation,
  validateAgreement,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateSelect,
} from "../../lib/formValidation";

const INITIAL_FORM_DATA = {
  country: "",
  service: "",
  fullName: "",
  country_code: "+971",
  phone: "",
  email: "",
  comment: "",
  agree_terms_and_policy: true,
};

const FIELD_ORDER = [
  "country",
  "service",
  "fullName",
  "phone",
  "email",
  "comment",
  "agree_terms_and_policy",
];

const FIELD_IDS = {
  country: "country",
  service: "service",
  fullName: "fullName",
  phone: "phone",
  email: "email",
  comment: "comment",
  agree_terms_and_policy: "contact-terms",
};

function getContactFieldError(name, value) {
  switch (name) {
    case "country":
      return validateSelect(value, "Choose your country.");
    case "service":
      return validateSelect(value, "Choose a service.");
    case "fullName":
      return validateName(value, "full name");
    case "phone":
      return validatePhone(value);
    case "email":
      return validateEmail(value);
    case "comment":
      return validateMessage(value, "message");
    case "agree_terms_and_policy":
      return validateAgreement(value);
    default:
      return "";
  }
}

export default function ContactInfoForm({ data }) {
  const infoTitle = data?.info_title || "Contact Us";

  const infoDescription =
    data?.info_description ||
    "RedSpider – Web & Art Design is looking forward to serving you soon. We hope to build a long term relationship with businesses. Feel free to contact us if you have any questions, and our customer care representatives will assist you right away.";

  const address =
    data?.address ||
    "Sofitel, Burj Gate Tower- Office 1002-Sheikh Zayed Road, Downtown Dubai - Dubai. United Arab Emirates";

  const businessHours = data?.business_hours || "Monday - Sunday, 8am - 8pm";

  const phone1 = data?.phone_1 || "+971 55 5515 475";
  const phone2 = data?.phone_2 || "+971 50 569 8733";

  const email = data?.email || "info@redspider.ae";

  const supportTitle = data?.support_title || "24/7 Support";

  const satisfactionTitle = data?.satisfaction_title || "Customer Satisfaction";

  const formTitle = data?.form_title || "Get In Touch";

  const formButtonText = data?.form_button_text || "MAKE APPOINTMENT";

  const formExtinfoText = data?.form_extinfo_text || "Or just Give us a call";

  const formExtinfoPhone = data?.form_extinfo_phone || "+971 5555 15475";

  const formExtinfoSmall =
    data?.form_extinfo_small || "The Support Centre is available 24/7";

  const {
    values: formData,
    handleChange,
    handleBlur,
    showError,
    validateAll,
    applyServerErrors,
    reset,
  } = useFormValidation(INITIAL_FORM_DATA, getContactFieldError);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setStatus({
      type: "",
      message: "",
    });

    const fieldErrors = validateAll();
    const firstInvalid = getFirstErrorField(fieldErrors, FIELD_ORDER);

    if (firstInvalid) {
      focusField(FIELD_IDS[firstInvalid]);
      return;
    }

    setLoading(true);

    try {
      const fullPhone = `${formData.country_code}${formData.phone}`.trim();

      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        country: formData.country.trim(),
        formSource: "contact",
        subject: `${formData.service} - ${formData.country}`,
        content: formData.comment.trim(),
        agree_terms_and_policy: formData.agree_terms_and_policy,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          const serverErrors = applyServerErrors(result?.errors || {}, {
            name: "fullName",
            content: "comment",
          });
          const firstServerField = getFirstErrorField(
            serverErrors,
            FIELD_ORDER,
          );

          if (firstServerField) {
            focusField(FIELD_IDS[firstServerField]);
            return;
          }

          throw new Error(
            result?.message ||
              "Please check the form details and try again.",
          );
        }

        if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment and try again.",
          );
        }

        throw new Error(
          result?.message || "Something went wrong. Please try again.",
        );
      }

      setStatus({
        type: "success",
        message:
          result?.message ||
          "Thank you! Your enquiry has been submitted successfully. We will contact you soon.",
      });

      reset(INITIAL_FORM_DATA);
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error);

      setStatus({
        type: "error",
        message:
          error?.message || "Unable to submit your enquiry. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hfaq-c" className="rs-contact-sec">
      <div className="container">
        <div className="rs-contact-layout">
          <div className="rs-contact-copy">
            <h2 className="rs-process-title text-start">{infoTitle}</h2>

            <p className="rs-section-subtitle text-start">{infoDescription}</p>

            <div className="rs-contact-details">
              <div className="rs-contact-detail">
                <span className="rs-contact-detail-icon" aria-hidden="true">
                  <i className="bi bi-geo"></i>
                </span>

                <div>
                  <h3>Location</h3>
                  <p>{address}</p>
                </div>
              </div>

              <div className="rs-contact-detail">
                <span className="rs-contact-detail-icon" aria-hidden="true">
                  <i className="bi bi-alarm"></i>
                </span>

                <div>
                  <h3>BUSINESS HOURS</h3>
                  <p>{businessHours}</p>
                </div>
              </div>

              <div className="rs-contact-detail">
                <span className="rs-contact-detail-icon" aria-hidden="true">
                  <i className="bi bi-phone"></i>
                </span>

                <div>
                  <h3>Call us</h3>
                  <p>
                    <a href={`tel:${phone1.replace(/\s/g, "")}`}>{phone1}</a>
                  </p>
                  <p>
                    <a href={`tel:${phone2.replace(/\s/g, "")}`}>{phone2}</a>
                  </p>
                </div>
              </div>

              <div className="rs-contact-detail">
                <span className="rs-contact-detail-icon" aria-hidden="true">
                  <i className="bi bi-send"></i>
                </span>

                <div>
                  <h3>Email</h3>
                  <p>
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="rs-contact-highlights">
              <div className="rs-contact-highlight">
                <i className="bi bi-people" aria-hidden="true"></i>
                <h3>{supportTitle}</h3>
              </div>

              <div className="rs-contact-highlight">
                <i className="bi bi-shield-check" aria-hidden="true"></i>
                <h3>{satisfactionTitle}</h3>
              </div>
            </div>
          </div>

          <div className="rs-contact-form-card">
            <h3>{formTitle}</h3>

            <form onSubmit={handleSubmit} noValidate className="rs-contact-form">
              <div className="rs-contact-form-grid">
                <FormField
                  id="country"
                  label="Country"
                  required
                  error={showError("country")}
                >
                  <ThemedSelect
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={Boolean(showError("country"))}
                    aria-label="Select your country"
                    aria-describedby={
                      showError("country") ? "country-error" : undefined
                    }
                    options={[
                      { value: "", label: "Select country", disabled: true },
                      { value: "UAE", label: "UAE" },
                      { value: "USA", label: "USA" },
                      { value: "UK", label: "UK" },
                    ]}
                  />
                </FormField>

                <FormField
                  id="service"
                  label="Service"
                  required
                  error={showError("service")}
                >
                  <ThemedSelect
                    name="service"
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={Boolean(showError("service"))}
                    aria-label="Select the service you need"
                    aria-describedby={
                      showError("service") ? "service-error" : undefined
                    }
                    options={[
                      { value: "", label: "Select service", disabled: true },
                      { value: "Consultation", label: "Consultation" },
                      { value: "Support", label: "Support" },
                    ]}
                  />
                </FormField>

                <FormField
                  id="fullName"
                  label="Full name"
                  required
                  error={showError("fullName")}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John Smith"
                    maxLength={100}
                    autoComplete="name"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(showError("fullName"))}
                    aria-describedby={
                      showError("fullName") ? "fullName-error" : undefined
                    }
                  />
                </FormField>

                <FormField
                  id="phone"
                  label="Phone number"
                  required
                  error={showError("phone")}
                >
                  <div className="phone-field">
                    <ThemedSelect
                      id="country_code"
                      name="country_code"
                      className="rs-themed-select--compact"
                      value={formData.country_code}
                      onChange={handleChange}
                      aria-label="Country code"
                      options={[
                        { value: "+971", label: "🇦🇪 +971" },
                        { value: "+966", label: "🇸🇦 +966" },
                        { value: "+968", label: "🇴🇲 +968" },
                        { value: "+973", label: "🇧🇭 +973" },
                        { value: "+974", label: "🇶🇦 +974" },
                        { value: "+965", label: "🇰🇼 +965" },
                        { value: "+91", label: "🇮🇳 +91" },
                        { value: "+92", label: "🇵🇰 +92" },
                        { value: "+44", label: "🇬🇧 +44" },
                        { value: "+1", label: "🇺🇸 +1" },
                      ]}
                    />

                    <input
                      type="tel"
                      className="form-control"
                      placeholder="50 123 4567"
                      autoComplete="tel"
                      inputMode="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(showError("phone"))}
                      aria-describedby={
                        showError("phone") ? "phone-error" : undefined
                      }
                    />
                  </div>
                </FormField>

                <FormField
                  id="email"
                  label="Email address"
                  required
                  error={showError("email")}
                >
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@company.com"
                    maxLength={150}
                    autoComplete="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(showError("email"))}
                    aria-describedby={
                      showError("email") ? "email-error" : undefined
                    }
                  />
                </FormField>

                <FormField
                  id="comment"
                  label="Message"
                  required
                  fullWidth
                  error={showError("comment")}
                >
                  <textarea
                    className="form-control"
                    placeholder="Tell us about your project or enquiry"
                    id="comment"
                    name="comment"
                    rows={5}
                    maxLength={10000}
                    value={formData.comment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(showError("comment"))}
                    aria-describedby={
                      showError("comment") ? "comment-error" : undefined
                    }
                  ></textarea>
                </FormField>

                <FormField
                  id="contact-terms"
                  label="Terms and privacy policy"
                  hideLabel
                  fullWidth
                  error={showError("agree_terms_and_policy")}
                >
                  <label htmlFor="contact-terms" className="rs-contact-terms">
                    <input
                      type="checkbox"
                      id="contact-terms"
                      name="agree_terms_and_policy"
                      checked={formData.agree_terms_and_policy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(
                        showError("agree_terms_and_policy"),
                      )}
                      aria-describedby={
                        showError("agree_terms_and_policy")
                          ? "contact-terms-error"
                          : undefined
                      }
                    />
                    <span>I agree to the terms and privacy policy.</span>
                  </label>
                </FormField>

                <div className="rs-contact-submit rs-form-field--full">
                  <Button type="submit" color="red" disabled={loading}>
                    {loading ? "Submitting..." : formButtonText}
                  </Button>
                </div>

                <div className="rs-form-field--full">
                  <FormAlert type={status.type} message={status.message} />
                </div>
              </div>
            </form>

            <div className="rs-contact-callout">
              <p>{formExtinfoText}</p>
              <a href={`tel:${formExtinfoPhone.replace(/\s/g, "")}`}>
                {formExtinfoPhone}
              </a>
              <small>{formExtinfoSmall}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
