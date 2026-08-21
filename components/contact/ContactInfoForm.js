// components/contact/ContactInfoForm.js

export default function ContactInfoForm({ data }) {
  // Get data from API or use fallback
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

  return (
    <section
      id="hfaq-c"
      className="hfaq-c section darkblue-line py-5 dark-background"
    >
      <div className="container pt-md-5">
        <div className="row align-items-end g-5">
          {/* Left Column: Contact Info */}
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
                <p>{infoDescription}</p>
                <hr />

                <div className="d-flex align-items-start mt-4">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i className="bi bi-geo" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="fs-6 text-body-emphasi text-white text-uppercase">
                      Location
                    </h3>
                    <p>{address}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start mt-4">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i className="bi bi-alarm" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="fs-6 text-body-emphasi text-white text-uppercase">
                      BUSINESS HOURS
                    </h3>
                    <p>{businessHours}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start mt-4">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i className="bi bi-phone" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="fs-6 text-body-emphasi text-white text-uppercase">
                      Call us
                    </h3>
                    <p>
                      <a
                        href={`tel:${phone1.replace(/\s/g, "")}`}
                        className="text-white"
                      >
                        {phone1}
                      </a>
                    </p>
                    <p>
                      <a
                        href={`tel:${phone2.replace(/\s/g, "")}`}
                        className="text-white"
                      >
                        {phone2}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mt-4">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i className="bi bi-send" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="fs-6 text-body-emphasi text-white text-uppercase">
                      Email
                    </h3>
                    <p>
                      <a href={`mailto:${email}`} className="text-white">
                        {email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

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

          {/* Right Column: Form */}
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
                <form>
                  <div className="row g-5">
                    {/* Select Country */}
                    <div className="col-md-6">
                      <select
                        className="form-select"
                        required
                        defaultValue=""
                        aria-label="Select your country"
                        name="country"
                        id="country"
                      >
                        <option value="" disabled>
                          Select Country
                        </option>
                        <option value="UAE">UAE</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                      </select>
                    </div>

                    {/* Select Service */}
                    <div className="col-md-6">
                      <select
                        className="form-select"
                        required
                        defaultValue=""
                        aria-label="Select the service you need"
                        name="service"
                        id="service"
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
                        autoComplete="name"
                        name="fullName"
                        id="fullName"
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <div className="phone-field">
                        <select
                          name="country_code"
                          className="country-code"
                          required
                          defaultValue="+971"
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
                          autoComplete="tel"
                          name="phone"
                          id="phone"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        id="email"
                      />
                    </div>

                    {/* Comment */}
                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        name="comment"
                        rows={4}
                      ></textarea>
                    </div>

                    {/* Button */}
                    <div className="col-12 text-center my-5">
                      <button type="submit" className="btn btn-light px-5">
                        {formButtonText}
                      </button>
                    </div>
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
