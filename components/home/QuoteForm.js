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
  name: "",
  country_code: "+971",
  phone: "",
  email: "",
  subject: "",
  content: "",
  agree_terms_and_policy: true,
};

const FIELD_ORDER = [
  "name",
  "phone",
  "email",
  "subject",
  "content",
  "agree_terms_and_policy",
];

const FIELD_IDS = {
  name: "quote-name",
  phone: "quote-phone",
  email: "quote-email",
  subject: "quote-subject",
  content: "quote-content",
  agree_terms_and_policy: "quote-terms",
};

function getQuoteFieldError(name, value) {
  switch (name) {
    case "name":
      return validateName(value);
    case "phone":
      return validatePhone(value);
    case "email":
      return validateEmail(value);
    case "subject":
      return validateSelect(value, "Choose an enquiry type.");
    case "content":
      return validateMessage(value, "project details");
    case "agree_terms_and_policy":
      return validateAgreement(value);
    default:
      return "";
  }
}

export default function QuoteForm() {
  const {
    values: formData,
    handleChange,
    handleBlur,
    showError,
    validateAll,
    applyServerErrors,
    reset,
  } = useFormValidation(INITIAL_FORM_DATA, getQuoteFieldError);

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

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const content = formData.content.trim();

    setLoading(true);

    try {
      const fullPhone = `${formData.country_code}${phone}`.trim();

      const payload = {
        name,
        email,
        phone: fullPhone,
        subject,
        content,
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

      let result = {};

      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("Invalid API response:", jsonError);
      }

      if (response.status === 422) {
        const serverErrors = applyServerErrors(result?.errors || {});
        const firstServerField = getFirstErrorField(serverErrors, FIELD_ORDER);

        if (firstServerField) {
          focusField(FIELD_IDS[firstServerField]);
        }

        if (!firstServerField) {
          setStatus({
            type: "error",
            message:
              result?.message ||
              "Please check the form details and try again.",
          });
        }

        return;
      }

      if (response.status === 429) {
        setStatus({
          type: "error",
          message:
            result?.message ||
            "Too many requests. Please wait a moment and try again.",
        });

        return;
      }

      if (!response.ok) {
        setStatus({
          type: "error",
          message: result?.message || "Something went wrong. Please try again.",
        });

        return;
      }

      setStatus({
        type: "success",
        message:
          result?.message ||
          "We received your message and will contact you soon!",
      });

      reset(INITIAL_FORM_DATA);
    } catch (error) {
      console.error("QUOTE FORM ERROR:", error);

      setStatus({
        type: "error",
        message: "Unable to submit your enquiry right now. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-sec">
      <div className="containera">
        <div className="container mid_sec">
          <div className="row align-items-stretch">
            <div
              className="col-12 col-md-4"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="req_block_left">
                <div className="h5 mb-3">Request a Quote</div>

                <p className="mb-0">
                  Simply complete the form and we will contact you to discuss
                  your requirements further.
                </p>
              </div>
            </div>

            <div
              className="col-12 col-md-8"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="rs-contact-form-card">
                <form
                  name="frm_request"
                  method="post"
                  id="requestform"
                  noValidate
                  className="rs-contact-form"
                  onSubmit={handleSubmit}
                >
                  <div className="rs-contact-form-grid">
                    <FormField
                      id="quote-name"
                      label="Name"
                      required
                      error={showError("name")}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John Smith"
                        name="name"
                        id="quote-name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(showError("name"))}
                        aria-describedby={
                          showError("name") ? "quote-name-error" : undefined
                        }
                        maxLength={40}
                        autoComplete="name"
                      />
                    </FormField>

                    <FormField
                      id="quote-phone"
                      label="Phone number"
                      required
                      error={showError("phone")}
                    >
                      <div className="phone-field">
                        <ThemedSelect
                          name="country_code"
                          id="quote-country-code"
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
                          name="phone"
                          id="quote-phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputMode="tel"
                          aria-invalid={Boolean(showError("phone"))}
                          aria-describedby={
                            showError("phone") ? "quote-phone-error" : undefined
                          }
                          autoComplete="tel"
                        />
                      </div>
                    </FormField>

                    <FormField
                      id="quote-email"
                      label="Email address"
                      required
                      error={showError("email")}
                    >
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@company.com"
                        name="email"
                        id="quote-email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(showError("email"))}
                        aria-describedby={
                          showError("email") ? "quote-email-error" : undefined
                        }
                        maxLength={80}
                        autoComplete="email"
                      />
                    </FormField>

                    <FormField
                      id="quote-subject"
                      label="Enquiry about"
                      required
                      error={showError("subject")}
                    >
                      <ThemedSelect
                        name="subject"
                        id="quote-subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={Boolean(showError("subject"))}
                        aria-label="Select enquiry type"
                        aria-describedby={
                          showError("subject") ? "quote-subject-error" : undefined
                        }
                        options={[
                          { value: "", label: "Select", disabled: true },
                          { value: "E-Commerce", label: "E-Commerce" },
                          {
                            value: "Corporate Website",
                            label: "Corporate Website",
                          },
                          {
                            value: "Business Emails",
                            label: "Business Emails",
                          },
                          {
                            value: "Website Hosting",
                            label: "Website Hosting",
                          },
                          {
                            value: "SMS Marketing",
                            label: "SMS Marketing",
                          },
                          {
                            value: "Email Marketing",
                            label: "Email Marketing",
                          },
                          {
                            value: "Digital Marketing",
                            label: "Digital Marketing",
                          },
                        ]}
                      />
                    </FormField>

                    <FormField
                      id="quote-content"
                      label="Project details"
                      required
                      fullWidth
                      error={showError("content")}
                    >
                      <textarea
                        className="form-control"
                        placeholder="Tell us about your project"
                        name="content"
                        id="quote-content"
                        rows={5}
                        value={formData.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(showError("content"))}
                        aria-describedby={
                          showError("content") ? "quote-content-error" : undefined
                        }
                        maxLength={10000}
                        autoComplete="off"
                      />
                    </FormField>

                    <FormField
                      id="quote-terms"
                      label="Terms and privacy policy"
                      hideLabel
                      fullWidth
                      error={showError("agree_terms_and_policy")}
                    >
                      <label htmlFor="quote-terms" className="rs-contact-terms">
                        <input
                          type="checkbox"
                          name="agree_terms_and_policy"
                          id="quote-terms"
                          checked={formData.agree_terms_and_policy}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={Boolean(
                            showError("agree_terms_and_policy"),
                          )}
                          aria-describedby={
                            showError("agree_terms_and_policy")
                              ? "quote-terms-error"
                              : undefined
                          }
                        />
                        <span>I agree to the terms and privacy policy.</span>
                      </label>
                    </FormField>

                    <div className="rs-contact-submit rs-form-field--full">
                      <Button type="submit" color="red" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Now"}
                      </Button>
                    </div>

                    <div className="rs-form-field--full">
                      <FormAlert type={status.type} message={status.message} />
                    </div>
                  </div>

                  <input
                    name="hiddensecurity"
                    value="7869045632"
                    className="antispam"
                    type="hidden"
                    readOnly
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
