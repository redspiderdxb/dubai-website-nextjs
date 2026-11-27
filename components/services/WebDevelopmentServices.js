import Image from "next/image";
import styles from "../../styles/pages/web-development-services.module.css";

// Replace each icon path here when the final service icons are available.
const SERVICES = [
  {
    title: "Custom Website Development in Dubai",
    description: "We build websites around the features your business needs, such as enquiry forms, searchable listings, or connections to existing tools.",
    icon: "/assets/img/web-development/service/1.webp",
  },
  {
    title: "Content Management System (CMS) Development",
    description: "We set up a CMS so your team can update pages, images, and other content without editing code.",
    icon: "/assets/img/web-development/service/2.webp",
  },
  {
    title: "eCommerce Development and Integration",
    description: "We set up product catalogues, carts, and checkout, and connect your online store to the agreed payment gateway.",
    icon: "/assets/img/web-development/service/3.webp",
  },
  {
    title: "WordPress Development",
    description: "We build WordPress websites with editable pages and configure the plugins your site needs.",
    icon: "/assets/img/web-development/service/4.webp",
  },
  {
    title: "Custom WordPress Development",
    description: "We develop custom themes and features when your website needs more than a standard WordPress setup provides.",
    icon: "/assets/img/web-development/service/5.webp",
  },
  {
    title: "Landing Page Development",
    description: "We build responsive landing pages for enquiries or sign-ups and test that forms submit correctly across devices.",
    icon: "/assets/img/web-development/service/6.webp",
  },
];

export default function WebDevelopmentServices() {
  return (
    <section
      id="web-development-services"
      className={styles.section}
      aria-labelledby="web-development-services-title"
    >
      <svg
        className={styles.curves}
        viewBox="0 0 2172 724"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M-55 40 C80 340 475 460 850 615 S1410 655 1605 390 S1970 75 2220 155" />
      </svg>
      <div className={styles.content}>
        <header className={styles.heading}>
          <span className={styles.eyebrow}>Our Services</span>
          <h2 id="web-development-services-title">
            Our Web Development <span>Services</span>
          </h2>
          <p>
            Choose the development services your project needs, from a website
            your team can update to custom features and third-party integrations.
          </p>
        </header>
        <div className={styles.grid}>
          {SERVICES.map((service, index) => (
            <article className={styles.card} key={service.title}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.icon}>
                <Image src={service.icon} alt="" width={80} height={80} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {index < SERVICES.length - 1 ? (
                <span className={styles.connector} aria-hidden="true">
                  <svg
                    className={styles.connectorLine}
                    viewBox="0 0 64 120"
                    preserveAspectRatio="none"
                    focusable="false"
                  >
                    <path d="M0 5 C64 5 0 115 64 115" />
                  </svg>
                  <span className={styles.arrow}>
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="m9 5 7 7-7 7" />
                    </svg>
                  </span>
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
