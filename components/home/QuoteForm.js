import { useState } from "react";
import Button from "../ui/Button";

const INITIAL_FORM_DATA = {
  name: "",
  country_code: "+971",
  phone: "",
  email: "",
  subject: "",
  content: "",
  agree_terms_and_policy: true,
};

export default function QuoteForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Remove old error while user is correcting form
    if (status.type === "error") {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  // ============================================
  // SUBMIT QUOTE FORM
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (loading) {
      return;
    }

    setStatus({
      type: "",
      message: "",
    });

    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const content = formData.content.trim();

    if (!name) {
      setStatus({
        type: "error",
        message: "Please enter your name.",
      });
      return;
    }

    if (!phone) {
      setStatus({
        type: "error",
        message: "Please enter your phone number.",
      });
      return;
    }

    if (!email) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    // Frontend email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (!subject) {
      setStatus({
        type: "error",
        message: "Please select an enquiry type.",
      });
      return;
    }

    if (!content) {
      setStatus({
        type: "error",
        message: "Please enter your project details.",
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
      // ==========================================
      // FULL PHONE NUMBER
      // ==========================================

      const fullPhone = `${formData.country_code}${phone}`.trim();

      // ==========================================
      // API PAYLOAD
      // ==========================================

      const payload = {
        name,
        email,
        phone: fullPhone,
        subject,
        content,
        agree_terms_and_policy: formData.agree_terms_and_policy,
      };

      // ==========================================
      // IMPORTANT:
      // Use INTERNAL Next.js API proxy.
      // API key remains server-side.
      // ==========================================

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      // ==========================================
      // READ API RESPONSE SAFELY
      // ==========================================

      let result = {};

      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("Invalid API response:", jsonError);
      }

      // ==========================================
      // VALIDATION ERROR
      // DO NOT THROW ERROR
      // ==========================================

      if (response.status === 422) {
        const errors = result?.errors || {};

        let errorMessage = "";

        // Laravel-style validation response
        for (const value of Object.values(errors)) {
          if (Array.isArray(value) && value.length > 0) {
            errorMessage = value[0];
            break;
          }

          if (typeof value === "string") {
            errorMessage = value;
            break;
          }
        }

        setStatus({
          type: "error",
          message:
            errorMessage ||
            result?.message ||
            "Please check the form details and try again.",
        });

        return;
      }

      // ==========================================
      // RATE LIMIT
      // ==========================================

      if (response.status === 429) {
        setStatus({
          type: "error",
          message:
            result?.message ||
            "Too many requests. Please wait a moment and try again.",
        });

        return;
      }

      // ==========================================
      // OTHER API ERRORS
      // ==========================================

      if (!response.ok) {
        setStatus({
          type: "error",
          message: result?.message || "Something went wrong. Please try again.",
        });

        return;
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      setStatus({
        type: "success",
        message:
          result?.message ||
          "We received your message and will contact you soon!",
      });

      // ==========================================
      // RESET FORM
      // ==========================================

      setFormData(INITIAL_FORM_DATA);
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
            {/* =========================================
                LEFT CONTENT
            ========================================== */}

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

            {/* =========================================
                FORM
            ========================================== */}

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
                        {/* =================================
                            NAME
                        ================================== */}

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

                        {/* =================================
                            PHONE
                        ================================== */}

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

                        {/* =================================
                            EMAIL
                        ================================== */}

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

                        {/* =================================
                            SUBJECT
                        ================================== */}

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

                        {/* =================================
                            PROJECT DETAILS
                        ================================== */}

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
                            />
                          </div>
                        </div>
                      </div>

                      {/* =====================================
                          TERMS
                      ====================================== */}

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

                          {/* =================================
                              SUBMIT BUTTON
                          ================================== */}

                          <div data-aos="fade-up" data-aos-delay="700">
                            <Button
                              type="submit"
                              color="red"
                              className="mt-4"
                              disabled={loading}
                            >
                              {loading ? "Submitting..." : "Submit Now"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* =====================================
                          STATUS MESSAGE
                      ====================================== */}

                      {status.message && (
                        <div
                          className={`quote-form-message ${
                            status.type === "success"
                              ? "quote-form-success"
                              : "quote-form-error"
                          }`}
                          role="alert"
                          aria-live="polite"
                        >
                          {status.message}
                        </div>
                      )}

                      {/* =====================================
                          ANTI-SPAM
                      ====================================== */}

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
