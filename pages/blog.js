// pages/blog.js

import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import BlogHero from "../components/blog/BlogHero";
import BlogList from "../components/blog/BlogList";
import BlogCTA from "../components/blog/BlogCTA";

export default function Blog({ posts, pagination }) {
  const seoData = {
    title: "Blog - RedSpider | Latest Insights on Web Design & Development",

    description:
      "Read the latest blogs and insights on web design, development, and digital marketing trends from the experts at RedSpider.",

    keywords:
      "web design blog, development insights, redspider blog, digital marketing tips",

    canonical: "https://www.redspider.ae/blog",

    image: "https://www.redspider.ae/blog-og-image.jpg",

    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />

      <BlogHero />

      <BlogList posts={posts} pagination={pagination} />

      <BlogCTA />
    </Layout>
  );
}

// ============================================
// Server-side Initial Blog Data
// ============================================

export async function getStaticProps() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.API_KEY;

    if (!API_URL || !API_KEY) {
      console.error("Blog API configuration is missing.");

      return {
        props: {
          posts: [],
          pagination: {},
        },

        revalidate: 60,
      };
    }

    const response = await fetch(`${API_URL}/posts?page=1`, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
      },

      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Blog API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      props: {
        posts: data?.data || [],
        pagination: data?.meta || {},
      },

      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching initial blog posts:", error);

    return {
      props: {
        posts: [],
        pagination: {},
      },

      revalidate: 60,
    };
  }
}
