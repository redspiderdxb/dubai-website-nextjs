import Layout from "../../components/layout/Layout";
import PageStyles from "../../components/seo/PageStyles";
import SEO from "../../components/seo/SEO";
import Button from "../../components/ui/Button";

export default function PrivacyPolicy() {
  return (
    <>
      <PageStyles href="/assets/css/pages/privacy-policy.css" />
      <SEO title="Privacy Policy | RedSpider Dubai" description="Read the RedSpider Privacy Policy to learn what information we collect, how we use it, and how we protect it." canonical="https://www.redspider.ae/privacy-policy/" robots="index,follow" />
      <Layout>
        <section className="rs-inner-hero design-developemnt-hero hero-marquee privacy-policy-hero" style={{ backgroundImage: "url(/assets/img/re-bg-hero.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="rs-hero-overlay" aria-hidden="true"></div>
          <div className="container"><div className="row align-items-center"><div className="col-lg-12"><div className="rs-process-title-sec">
            <h1 className="rs-process-title mb-3"><span className="rs-process-highlight">Privacy Policy<svg className="rs-process-underline" viewBox="0 0 320 22" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" /></svg></span></h1>
          </div></div></div></div>
        </section>
        <section className="privacy-policy-content" aria-label="Privacy policy content"><div className="container"><div className="row"><div className="col-12"><div className="privacy-policy-document"><aside className="privacy-policy-rail" aria-hidden="true"><span className="privacy-policy-rail-line"></span><span className="privacy-policy-rail-label">Privacy Policy</span><span className="privacy-policy-rail-brand">RedSpider</span></aside><div className="privacy-policy-copy"><div className="privacy-policy-intro" data-aos="fade-up">
          <p className="privacy-policy-lead">RedSpider uses and protects the information that you provide when you use this website.</p>
          <p>RedSpider is committed to protecting your privacy. If we ask you to provide certain information that identifies you when using this website, we will use it only in accordance with this privacy statement.</p>
          <p>RedSpider may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
          </div><section className="privacy-policy-section" data-aos="fade-up" data-aos-duration="650" aria-labelledby="privacy-collect"><h2 id="privacy-collect">What we collect</h2>
            <p>We may collect the following information:</p><ul>
              <li>name and job title</li><li>contact information including email address</li><li>demographic information such as postcode, preferences and interests</li><li>other information relevant to customer surveys and/or offers</li>
            </ul>
          </section>
          <section className="privacy-policy-section" data-aos="fade-up" data-aos-duration="650" aria-labelledby="privacy-use"><h2 id="privacy-use">What we do with the information we gather</h2>
            <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p><ul>
              <li>Internal record keeping.</li><li>We may use the information to improve our products and services.</li><li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li><li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customize the website according to your interests.</li>
            </ul>
          </section>
          <section className="privacy-policy-section" data-aos="fade-up" data-aos-duration="650" aria-labelledby="privacy-security"><h2 id="privacy-security">Security</h2>
            <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>
          </section>
          <section className="privacy-policy-section" data-aos="fade-up" data-aos-duration="650" aria-labelledby="privacy-cookies"><h2 id="privacy-cookies">How we use cookies</h2>
            <p>A cookie is a small file that requests permission to place itself on your computer’s hard drive. Once you agree, the file adds itself, and the cookie helps analyze web traffic or notifies you when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
            <p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
            <p>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
            <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>
          </section>
          <section className="privacy-policy-section" data-aos="fade-up" data-aos-duration="650" aria-labelledby="privacy-links"><h2 id="privacy-links">Links to other websites</h2>
            <p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot take responsibility for the protection and privacy of any information you provide while visiting such sites. These sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>
            <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</p>
            <p>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the below address. We will promptly correct any information found to be incorrect.</p>
          </section>
          <div className="privacy-policy-actions" data-aos="fade-up" data-aos-duration="650"><Button href="https://www.redspider.ae/our-portfolio/">View Portfolio</Button><Button href="/contact-us/">Submit Your Details and Get Quote</Button></div>
        </div></div></div></div></div></section>
      </Layout>
    </>
  );
}


