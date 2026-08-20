export default function QuoteForm() {
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
                  Simply complete the form and we will
                  contact you to discuss your{' '}
                 requirements further.
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
                    action=""
                    id="requestform"
                    noValidate
                  >
                    <div className="req_block_right">
                      <div className="req_row1 row">
                        {/* Name */}
                        <div
                          className="home-input-cus col-12 col-md-6"
                          data-aos="fade-up"
                          data-aos-delay="100"
                        >
                          <label htmlFor="fname">Name*</label>
                          <div className="field-wrap">
                            <input
                              type="text"
                              name="fname"
                              id="fname"
                              className="req_input mb-4"
                              required
                              autoComplete="given-name"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div
                          className="home-input-cus col-12 col-md-6"
                          data-aos="fade-up"
                          data-aos-delay="200"
                        >
                          <label htmlFor="mobile">Phone Number*</label>
                          <div className="field-wrap">
                            <div className="phone-field">
                              <select
                                name="country_code"
                                className="country-code"
                                required
                                defaultValue="+971"
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
                                name="mobile"
                                id="mobile"
                                className="req_input border-0"
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
                          <label htmlFor="email">Email*</label>
                          <div className="field-wrap">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="req_input mb-4"
                              required
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
                          <label htmlFor="enquiry_about">Enquiry About*</label>
                          <div className="field-wrap">
                            <select
                              name="enquiry_about"
                              id="enquiry_about"
                              className="req_selected mb-4"
                              required
                              defaultValue=""
                            >
                              <option value="" disabled>Select</option>
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
                          <label htmlFor="comments">Project Details*</label>
                          <div className="field-wrap">
                            <textarea
                              name="comments"
                              id="comments"
                              className="req_textarea mb-4"
                              rows="3"
                              required
                              autoComplete="off"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Recaptcha + Submit */}
                      <div className="req_row">
                        <div className="verify-wrap">
                          <div
                            className="g-recaptcha"
                            data-sitekey="6LfjVrkUAAAAAGXTZWkVCkr-mXD7IRcstN78qexV"
                            data-aos="zoom-in"
                            data-aos-delay="600"
                          ></div>
                          <div data-aos="fade-up" data-aos-delay="700">
                            <button
                              type="submit"
                              className="btn btn-animation btn-red d-inline-flex align-items-center gap-3 mt-4 fw-normal"
                            >
                              <span className="btn-title">Submit Now</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <input
                        name="hiddensecurity"
                        value="7869045632"
                        className="antispam"
                        type="hidden"
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