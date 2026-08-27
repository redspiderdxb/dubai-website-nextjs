// components/contact/ContactInfoForm.js

import { useState } from "react";

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
    <section
      id="hfaq-c"
      className="hfaq-c section darkblue-line py-5 dark-background"
    >
      <div className="container pt-md-5">
        <div className="row align-items-end g-5">
          {/* ==========================================
              LEFT COLUMN
          ========================================== */}

          <div
            className="col-lg-6 text-start mb-4 mb-lg-0"
            data-aos="zoom-in-up"
            data-aos-delay="150"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <div className="contact-info-left pe-lg-5">
              <div className="section-title text-start text-white mb-3">
                <h2 className="text-red">
                  <b>{infoTitle}</b>
                </h2>

                <p className="text-dark">{infoDescription}</p>

                <hr />
              </div>

              {/* Location */}

              <div className="d-flex align-items-start mt-4">
                <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                  <i className="bi bi-geo" aria-hidden="true"></i>
                </div>

                <div>
                  <h3 className="fs-6 text-body-emphasis text-dark text-uppercase">
                    Location
                  </h3>

                  <p>{address}</p>
                </div>
              </div>

              {/* Business Hours */}

              <div className="d-flex align-items-start mt-4">
                <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                  <i className="bi bi-alarm" aria-hidden="true"></i>
                </div>

                <div>
                  <h3 className="fs-6 text-body-emphasis text-dark text-uppercase">
                    BUSINESS HOURS
                  </h3>

                  <p>{businessHours}</p>
                </div>
              </div>

              {/* Phone */}

              <div className="d-flex align-items-start mt-4">
                <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                  <i className="bi bi-phone" aria-hidden="true"></i>
                </div>

                <div>
                  <h3 className="fs-6 text-body-emphasis text-dark text-uppercase">
                    Call us
                  </h3>

                  <p>
                    <a
                      href={`tel:${phone1.replace(/\s/g, "")}`}
                      className="text-dark"
                    >
                      {phone1}
                    </a>
                  </p>

                  <p>
                    <a
                      href={`tel:${phone2.replace(/\s/g, "")}`}
                      className="text-dark"
                    >
                      {phone2}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}

              <div className="d-flex align-items-start mt-4">
                <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                  <i className="bi bi-send" aria-hidden="true"></i>
                </div>

                <div>
                  <h3 className="fs-6 text-body-emphasis text-dark text-uppercase">
                    Email
                  </h3>

                  <p>
                    <a href={`mailto:${email}`} className="text-dark">
                      {email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Info */}

            <div className="comp-infoext d-flex mt-5 pt-3">
              <div className="row gx-5">
                <div className="col d-flex align-items-center">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i className="bi bi-people fs-1" aria-hidden="true"></i>
                  </div>

                  <div>
                    <h3 className="fs-5 text-body-emphasis">{supportTitle}</h3>
                  </div>
                </div>

                <div className="col d-flex align-items-center">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i
                      className="bi bi-shield-check fs-1"
                      aria-hidden="true"
                    ></i>
                  </div>

                  <div>
                    <h3 className="fs-5 text-body-emphasis">
                      {satisfactionTitle}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              RIGHT COLUMN - FORM
          ========================================== */}

          <div
            className="col-lg-6 text-center mb-4 mb-lg-0"
            data-aos="zoom-in-up"
            data-aos-delay="150"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <div className="form-touch">
              <div className="home-form container p-5">
                <h3 className="text-center mb-5">{formTitle}</h3>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-5">
                    {/* Country */}

                    <div className="col-md-6">
                      <select
                        className="form-select"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        name="country"
                        id="country"
                        aria-label="Select your country"
                      >
                        <option value="" disabled>
                          Select Country
                        </option>

                        <option value="UAE">UAE</option>

                        <option value="USA">USA</option>

                        <option value="UK">UK</option>
                      </select>
                    </div>

                    {/* Service */}

                    <div className="col-md-6">
                      <select
                        className="form-select"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        name="service"
                        id="service"
                        aria-label="Select the service you need"
                      >
                        <option value="" disabled>
                          Select Service
                        </option>

                        <option value="Consultation">Consultation</option>

                        <option value="Support">Support</option>
                      </select>
                    </div>

                    {/* Full Name */}

                    <div className="col-md-6">
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
                    </div>

                    {/* Phone */}

                    <div className="col-md-6">
                      <div className="phone-field">
                        <select
                          id="country_code"
                          name="country_code"
                          className="country-code"
                          required
                          value={formData.country_code}
                          onChange={handleChange}
                          aria-label="Country code"
                        >
                          <option value="+971">🇦🇪 +971</option>

                          <option value="+966">🇸🇦 +966</option>

                          <option value="+968">🇴🇲 +968</option>

                          <option value="+973">🇧🇭 +973</option>

                          <option value="+974">🇶🇦 +974</option>

                          <option value="+965">🇰🇼 +965</option>

                          <option value="+91">🇮🇳 +91</option>

                          <option value="+92">🇵🇰 +92</option>

                          <option value="+44">🇬🇧 +44</option>

                          <option value="+1">🇺🇸 +1</option>
                        </select>

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
                    </div>

                    {/* Email */}

                    <div className="col-md-12">
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
                    </div>

                    {/* Comment */}

                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        placeholder="Leave a comment here*"
                        id="floatingTextarea"
                        name="comment"
                        rows={4}
                        required
                        maxLength={10000}
                        value={formData.comment}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {/* Terms */}

                    <div className="col-12 text-start">
                      <label
                        htmlFor="contact-terms"
                        className="d-flex align-items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id="contact-terms"
                          name="agree_terms_and_policy"
                          checked={formData.agree_terms_and_policy}
                          onChange={handleChange}
                        />

                        <span>I agree to the terms and privacy policy.</span>
                      </label>
                    </div>

                    {/* Submit */}

                    <div className="col-12 text-center my-3">
                      <button
                        type="submit"
                        className="btn btn-light px-5"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : formButtonText}
                      </button>
                    </div>

                    {/* Status */}

                    {status.message && (
                      <div className="col-12">
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
                      </div>
                    )}
                  </div>
                </form>

                <div className="text-start mt-4 form-extinfo">
                  <p className="mb-1">{formExtinfoText}</p>

                  <h4>{formExtinfoPhone}</h4>

                  <small className="fs-5 pt-3">{formExtinfoSmall}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
