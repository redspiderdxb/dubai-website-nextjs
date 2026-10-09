import Image from "next/image";
import styles from "../../styles/pages/web-development-services.module.css";

// Replace each icon path here when the final service icons are available.
const SERVICES = [
  {
    title: "Custom Website Development Dubai",
    description: "Tailored websites for your business.",
    icon: "/assets/img/web-development/service/1.webp",
  },
  {
    title: "Content Management System",
    description: "Easily manage your website content.",
    icon: "/assets/img/web-development/service/2.webp",
  },
  {
    title: "Ecommerce Integration",
    description: "Secure commerce and payment setup.",
    icon: "/assets/img/web-development/service/3.webp",
  },
  {
    title: "WordPress Development",
    description: "Flexible and manageable websites.",
    icon: "/assets/img/web-development/service/4.webp",
  },
  {
    title: "Custom WordPress Development",
    description: "Custom themes and features.",
    icon: "/assets/img/web-development/service/5.webp",
  },
  {
    title: "Landing Page Web Design",
    description: "Conversion-focused landing pages.",
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
            At RedSpider, we offer a wide range of web development services to
            cater to your needs.
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
