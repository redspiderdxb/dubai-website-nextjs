// components/contact/ContactInfoForm.js

import { useState } from "react";
import Button from "../ui/Button";
import ThemedSelect from "../ui/ThemedSelect";

export default function ContactInfoForm({ data }) {
  // ==========================================
  // CONTACT INFORMATION
  // ==========================================

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

  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    country: "",
    service: "",
    fullName: "",
    country_code: "+971",
    phone: "",
    email: "",
    comment: "",
    agree_terms_and_policy: true,
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    // ------------------------------------------
    // CLIENT SIDE VALIDATION
    // ------------------------------------------

    if (!formData.country) {
      setStatus({
        type: "error",
        message: "Please select your country.",
      });
      return;
    }

    if (!formData.service) {
      setStatus({
        type: "error",
        message: "Please select a service.",
      });
      return;
    }

    if (!formData.fullName.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your full name.",
      });
      return;
    }

    if (!formData.phone.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your phone number.",
      });
      return;
    }

    if (!formData.email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    if (!formData.comment.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your message.",
      });
      return;
    }

    if (!formData.agree_terms_and_policy) {
      setStatus({
        type: "error",
        message: "Please agree to the terms and privacy policy.",
      });
      return;
    }

    setLoading(true);

    try {
      // ------------------------------------------
      // FULL PHONE NUMBER
      // ------------------------------------------

      const fullPhone = `${formData.country_code}${formData.phone}`.trim();

      // ------------------------------------------
      // BACKEND PAYLOAD
      //
      // Same /contacts API used by QuoteForm
      // ------------------------------------------

      const payload = {
        name: formData.fullName.trim(),

        email: formData.email.trim(),

        phone: fullPhone,

        subject: `${formData.service} - ${formData.country}`,

        content: formData.comment.trim(),

        agree_terms_and_policy: formData.agree_terms_and_policy,
      };

      // ------------------------------------------
      // IMPORTANT:
      // Use Next.js internal API proxy.
      // API key stays on server.
      // ------------------------------------------

      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // ------------------------------------------
      // API ERROR HANDLING
      // ------------------------------------------

      if (!response.ok) {
        if (response.status === 422) {
          const errors = result?.errors || {};

          const firstError = Object.values(errors)?.flat()?.find(Boolean);

          throw new Error(
            firstError ||
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

      // ------------------------------------------
      // SUCCESS
      // ------------------------------------------

      setStatus({
        type: "success",
        message:
          result?.message ||
          "Thank you! Your enquiry has been submitted successfully. We will contact you soon.",
      });

      // ------------------------------------------
      // RESET FORM
      // ------------------------------------------

      setFormData({
        country: "",
        service: "",
        fullName: "",
        country_code: "+971",
        phone: "",
        email: "",
        comment: "",
        agree_terms_and_policy: true,
      });
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

  // ==========================================
  // UI
  // ==========================================

  return (
    <section id="hfaq-c" className="rs-contact-sec">
      <div className="container">
        <div className="rs-contact-layout">
          <div className="rs-contact-copy">
            <h2 className="rs-process-title text-start">
              {infoTitle}
            </h2>

            <p className="rs-section-subtitle text-start">
              {infoDescription}
            </p>

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

            <form onSubmit={handleSubmit} noValidate>
              <div className="rs-contact-form-grid">
                <ThemedSelect
                  name="country"
                  id="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  aria-label="Select your country"
                  options={[
                    { value: "", label: "Select Country", disabled: true },
                    { value: "UAE", label: "UAE" },
                    { value: "USA", label: "USA" },
                    { value: "UK", label: "UK" },
                  ]}
                />

                <ThemedSelect
                  name="service"
                  id="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  aria-label="Select the service you need"
                  options={[
                    { value: "", label: "Select Service", disabled: true },
                    { value: "Consultation", label: "Consultation" },
                    { value: "Support", label: "Support" },
                  ]}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Full Name*"
                  required
                  maxLength={100}
                  autoComplete="name"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <div className="phone-field">
                  <ThemedSelect
                    id="country_code"
                    name="country_code"
                    className="rs-themed-select--compact"
                    required
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
                    placeholder="Phone No"
                    required
                    autoComplete="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Email*"
                  required
                  maxLength={150}
                  autoComplete="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <textarea
                  className="form-control"
                  placeholder="Leave a comment here*"
                  id="floatingTextarea"
                  name="comment"
                  rows={5}
                  required
                  maxLength={10000}
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>

                <label htmlFor="contact-terms" className="rs-contact-terms">
                  <input
                    type="checkbox"
                    id="contact-terms"
                    name="agree_terms_and_policy"
                    checked={formData.agree_terms_and_policy}
                    onChange={handleChange}
                  />
                  <span>I agree to the terms and privacy policy.</span>
                </label>

                <div className="rs-contact-submit">
                  <Button type="submit" color="red" disabled={loading}>
                    {loading ? "Submitting..." : formButtonText}
                  </Button>
                </div>

                {status.message && (
                  <div
                    className={
                      status.type === "success"
                        ? "quote-form-message quote-form-success"
                        : "quote-form-message quote-form-error"
                    }
                    role="alert"
                  >
                    {status.message}
                  </div>
                )}
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
