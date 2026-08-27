import Link from "next/link";
import Image from "next/image";

export default function AboutServices({ data }) {
  // =========================================================
  // EXISTING SERVICES DATA
  // =========================================================

  const servicesTitle =
    data?.services_title || "Digital Services and Solutions ";

  const servicesDescription =
    data?.services_description ||
    "We offer a wide range of Digital Services and Solutions  for every business. Here is what you can get:";

  const servicesList =
    data?.services?.length > 0
      ? data.services
      : [
          {
            icon: "bi-code-square",
            title: "Web Design and Development",
            desc: "We specialize in creating websites that are visually appealing and user-friendly.",
          },
          {
            icon: "bi-hdd-network",
            title: "Web Hosting",
            desc: "We offer secure, reliable, and high-performance web hosting solutions.",
          },
          {
            icon: "bi-palette2",
            title: "Graphic Design",
            desc: "As a leading graphic design company in Dubai, we create eye-catching designs.",
          },
          {
            icon: "bi-vector-pen",
            title: "Logo Design",
            desc: "We create unique, memorable, and professional custom logo designs.",
          },
          {
            icon: "bi-journal-richtext",
            title: "Brochure & Profile Design",
            desc: "We provide creative brochure and company profile design services.",
          },
          {
            icon: "bi-envelope-paper",
            title: "Email Marketing",
            desc: "Our email marketing solutions help you engage customers through effective campaigns.",
          },
          {
            icon: "bi-cart-check",
            title: "Ecommerce Websites",
            desc: "We develop powerful eCommerce websites that are attractive, secure, and easy to manage.",
          },
          {
            icon: "bi-phone",
            title: "Mobile App Development",
            desc: "We build modern Android and iOS mobile applications tailored to your business needs.",
          },
          {
            icon: "bi-graph-up-arrow",
            title: "SEO Agency Dubai",
            desc: "Our SEO specialists create customized digital marketing strategies that improve search rankings.",
          },
        ];

  // =========================================================
  // REDSPIDER DIGITAL PRODUCTS SECTION
  // =========================================================

  const redServices = [
    {
      image: "/assets/img/services/devp.png.webp",
      title: "Web Design & Development",
      path: "/service/web-development",
      desc: "We build modern, responsive websites that look great on every device. As a trusted web design company in Dubai, we create websites that help your business attract more customers online.",
    },
    {
      image: "/assets/img/services/host.png.webp",
      title: "Web Hosting",
      path: "/service/web-hosting",
      desc: "Enjoy fast, secure, and reliable Web Hosting Dubai with excellent uptime. We keep your website running smoothly and securely around the clock.",
    },
    {
      image: "/assets/img/services/design.png.webp",
      title: "Graphic Design",
      path: "/service/graphic-design-services",
      desc: "Creative graphic design services in Dubai  that help your brand stand out. We design marketing materials that leave a lasting impression on your audience.",
    },
    {
      image: "/assets/img/services/logo-1.png.webp",
      title: "Logo Design",
      path: "/service/logo-designing-company-dubai-brand-identity",
      desc: "Get a unique logo design in Dubai that reflects your business identity. We create memorable logos that build trust and strengthen your brand.",
    },
    {
      image: "/assets/img/services/profile.png.webp",
      title: "Brochure/Profile Design",
      path: "/service/brochure-design-company-in-dubai",
      desc: "We provide professional Brochure Design Dubai and Company Profile Design services. Present your business with attractive and well-organized marketing materials.",
    },
    {
      image: "/assets/img/services/email.png.webp",
      title: "Email Marketing",
      path: "/service/email-marketing",
      desc: "Our Email Marketing services help you connect with customers through targeted campaigns. Increase engagement and promote your products and services with ease.",
    },
    {
      image: "/assets/img/services/ecom.png.webp",
      title: "E-Commerce Websites",
      path: "/service/ecommerce-web-design-dubai",
      desc: "Launch a secure and user-friendly Ecommerce Website Dubai for your business. We build online stores that help you increase sales and grow your brand.",
    },
    {
      image: "/assets/img/services/app.png.webp",
      title: "Mobile App Development",
      path: "/service/mobile-app-development-company-dubai",
      desc: "Our mobile app development team in Dubai creates Android and iOS apps with smooth performance. Turn your business idea into a powerful mobile application.",
    },
    {
      image: "/assets/img/services/Seo.png.webp",
      title: "Search Engine Optimization",
      path: "/service/",
      desc: "As an experienced SEO agency in Dubai, we help improve your Google rankings and online visibility. Our SEO Services Dubai generate quality traffic and valuable business leads.",
    },
  ];

  return (
    <>
     
      {/* =========================================================
          NEW REDSPIDER DIGITAL PRODUCTS SECTION
          ========================================================= */}

      <section className="service-container-red services">
        <div className="service-section-inner">
          <h2>Digital Services and Solutions </h2>

          <div className="grid">
            {redServices.map((service, index) => (
              <div className="service" key={index}>
                {/* ICON */}
                <Image
                  className="icon"
                  src={service.image}
                  alt=""
                  width={34}
                  height={34}
                  loading="lazy"
                />

                {/* CONTENT */}
                <div>
                  <h3>
                    <Link href={service.path}>{service.title}</Link>
                  </h3>

                  <p>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
