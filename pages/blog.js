// pages/blog.js
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import BlogHero from "../components/blog/BlogHero";
import BlogPageTitle from "../components/blog/BlogPageTitle";
import BlogList from "../components/blog/BlogList";
import BlogCTA from "../components/blog/BlogCTA";
import { fetchAllPosts } from "../lib/api";

export default function Blog({ posts }) {
  const seoData = {
    title: "Blog - RedSpider | Latest Insights on Web Design & Development",
    description: "Read the latest blogs and insights on web design, development, and digital marketing trends from the experts at RedSpider.",
    keywords: "web design blog, development insights, redspider blog, digital marketing tips",
    canonical: "https://www.redspider.ae/blog",
    image: "https://www.redspider.ae/blog-og-image.jpg",
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
        <BlogHero />
        <BlogPageTitle />
        <BlogList posts={posts} />  {/* ✅ Dynamic data pass ho raha hai */}
        <BlogCTA />
      </main>
    </Layout>
  );
}

// ✅ Build time pe API se data fetch hoga
export async function getStaticProps() {
  const posts = await fetchAllPosts();
  return {
    props: {
      posts: posts || [],
    },
    revalidate: 60, // 60 seconds baad update ho jayega (ISR)
  };
}