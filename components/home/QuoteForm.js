import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://www.redspider.ae/api/v1";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    country_code: "+971",
    phone: "",
    email: "",
    subject: "",
    content: "",
    agree_terms_and_policy: true,
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    setLoading(true);

    try {
      const fullPhone = `${formData.country_code}${formData.phone}`.trim();

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        subject: formData.subject.trim(),
        content: formData.content.trim(),
        agree_terms_and_policy: formData.agree_terms_and_policy,
      };

      const response = await fetch(`${API_URL}/contacts`, {
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
          const errors = result?.errors || {};

          const firstError = Object.values(errors)?.[0]?.[0];

          throw new Error(
            firstError || "Please check the form details and try again.",
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
          "We received your message and will contact you soon!",
      });

      setFormData({
        name: "",
        country_code: "+971",
        phone: "",
        email: "",
        subject: "",
        content: "",
        agree_terms_and_policy: true,
      });
    } catch (error) {
      console.error("QUOTE FORM ERROR:", error);

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
    <section className="form-sec">
      <div className="containera">
        <div className="container mid_sec">
          <div className="row align-items-stretch">
            {/* Left Content */}
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

            {/* Form */}
            <div
              className="col-12 col-md-8"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="req_block">
                <div className="home-page-form px-lg-5 py-lg-3">
                  <form
                    name="frm_request"
                    method="post"
                    id="requestform"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className="req_block_right">
                      <div className="req_row1 row">
                        {/* Name */}
                        <div
                          className="home-input-cus col-12 col-md-6"
                          data-aos="fade-up"
                          data-aos-delay="100"
                        >
                          <label htmlFor="quote-name">Name*</label>

                          <div className="field-wrap">
                            <input
                              type="text"
                              name="name"
                              id="quote-name"
                              className="req_input mb-4"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              maxLength={40}
                              autoComplete="name"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div
                          className="home-input-cus col-12 col-md-6"
                          data-aos="fade-up"
                          data-aos-delay="200"
                        >
                          <label htmlFor="quote-phone">Phone Number*</label>

                          <div className="field-wrap">
                            <div className="phone-field">
                              <select
                                name="country_code"
                                id="quote-country-code"
                                className="country-code"
                                value={formData.country_code}
                                onChange={handleChange}
                                required
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
                                name="phone"
                                id="quote-phone"
                                className="req_input border-0"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                autoComplete="tel"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email */}
                        <div
                          className="home-input-cus col-12 col-md-6"
                          data-aos="fade-up"
                          data-aos-delay="300"
                        >
                          <label htmlFor="quote-email">Email*</label>

                          <div className="field-wrap">
                            <input
                              type="email"
                              name="email"
                              id="quote-email"
                              className="req_input mb-4"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              maxLength={80}
                              autoComplete="email"
                            />
                          </div>
                        </div>

                        {/* Enquiry About */}
                        <div
                          className="home-input-cus col-12 col-md-6"
                          data-aos="fade-up"
                          data-aos-delay="400"
                        >
                          <label htmlFor="quote-subject">Enquiry About*</label>

                          <div className="field-wrap">
                            <select
                              name="subject"
                              id="quote-subject"
                              className="req_selected mb-4"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                            >
                              <option value="" disabled>
                                Select
                              </option>

                              <option value="E-Commerce">E-Commerce</option>

                              <option value="Corporate Website">
                                Corporate Website
                              </option>

                              <option value="Business Emails">
                                Business Emails
                              </option>

                              <option value="Website Hosting">
                                Website Hosting
                              </option>

                              <option value="SMS Marketing">
                                SMS Marketing
                              </option>

                              <option value="Email Marketing">
                                Email Marketing
                              </option>

                              <option value="Digital Marketing">
                                Digital Marketing
                              </option>
                            </select>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div
                          className="home-input-cus col-12"
                          data-aos="fade-up"
                          data-aos-delay="500"
                        >
                          <label htmlFor="quote-content">
                            Project Details*
                          </label>

                          <div className="field-wrap">
                            <textarea
                              name="content"
                              id="quote-content"
                              className="req_textarea mb-4"
                              rows="3"
                              value={formData.content}
                              onChange={handleChange}
                              required
                              maxLength={10000}
                              autoComplete="off"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="req_row">
                        <div className="verify-wrap">
                          <label
                            htmlFor="quote-terms"
                            className="quote-terms-label"
                          >
                            <input
                              type="checkbox"
                              name="agree_terms_and_policy"
                              id="quote-terms"
                              checked={formData.agree_terms_and_policy}
                              onChange={handleChange}
                            />

                            <span>
                              I agree to the terms and privacy policy.
                            </span>
                          </label>

                          {/* Submit */}
                          <div data-aos="fade-up" data-aos-delay="700">
                            <button
                              type="submit"
                              className="btn btn-animation btn-red d-inline-flex align-items-center gap-3 mt-4 fw-normal"
                              disabled={loading}
                            >
                              <span className="btn-title">
                                {loading ? "Submitting..." : "Submit Now"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Status Message */}
                      {status.message && (
                        <div
                          className={`quote-form-message ${
                            status.type === "success"
                              ? "quote-form-success"
                              : "quote-form-error"
                          }`}
                          role="alert"
                        >
                          {status.message}
                        </div>
                      )}

                      {/* Anti-spam */}
                      <input
                        name="hiddensecurity"
                        value="7869045632"
                        className="antispam"
                        type="hidden"
                        readOnly
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
