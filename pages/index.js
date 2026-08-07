import SEO from "../components/seo/SEO";
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import QuoteForm from "../components/home/QuoteForm";
import Portfolio from "../components/home/Portfolio";
import About from "../components/home/About";
import BlogStats from "../components/home/BlogStats";
import FAQIndustries from "../components/home/FAQIndustries";
import AgencyPackages from "../components/home/AgencyPackages";

export default function Home() {

  const seo = {
    title: "Home | RedSpider",
    description:
      "RedSpider is a leading Web Development & Digital Marketing Company.",
    keywords:
      "Web Development, SEO, Digital Marketing, Software Development",
    canonical: "https://www.redspider.com/",
    image: "https://www.redspider.com/images/og-image.jpg",
  };

  return (
    <>
      <SEO {...seo} />

      <Layout>
        <Hero />
        <Services />
        <QuoteForm />
        <Portfolio />
        <About />
        <BlogStats />
        <FAQIndustries />
        <AgencyPackages />
      </Layout>
    </>
  );
}