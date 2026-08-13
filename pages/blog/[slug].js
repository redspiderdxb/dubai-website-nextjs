// pages/blog/[slug].js

import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import BlogPageTitle from "../../components/blog/BlogPageTitle";
import BlogDetailMain from "../../components/blog-details/BlogDetailMain";
import BlogDetailSidebar from "../../components/blog-details/BlogDetailSidebar";

import { fetchPosts, fetchPostBySlug } from "../../lib/api";

export default function BlogDetail({ post, recentPosts, categories, tags }) {
  // ============================================
  // Post Not Found
  // ============================================

  if (!post) {
    return (
      <Layout>
        <SEO title="Post Not Found" />

        <main className="main">
          <div className="container py-5 text-center">
            <h1>Post Not Found</h1>
          </div>
        </main>
      </Layout>
    );
  }

  // ============================================
  // SEO Data
  // ============================================

  const seoData = {
    title:
      post.seo?.seo_title ||
      post.seo_title ||
      post.title ||
      post.name ||
      "Blog Details - RedSpider",

    description:
      post.seo?.seo_description ||
      post.seo_description ||
      post.description ||
      "Read the full article on the latest trends in web design and development.",

    keywords:
      post.seo?.seo_keywords ||
      post.seo_keywords ||
      "blog details, web design article, redspider blog",

    canonical: `https://www.redspider.ae/blog/${post.slug}`,

    image:
      post.seo?.seo_image ||
      post.seo_image ||
      post.image ||
      "https://www.redspider.ae/blog-og-image.jpg",

    noIndex: false,
  };

  // ============================================
  // Page
  // ============================================

  return (
    <Layout>
      <SEO {...seoData} />

      <main className="main">
        <BlogPageTitle />

        <div className="container">
          <div className="row">
            {/* Main Blog Content */}
            <div className="col-lg-8">
              <BlogDetailMain post={post} />
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <BlogDetailSidebar
                recentPosts={recentPosts}
                categories={categories}
                tags={tags}
                author={post.author}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

// ============================================
// Generate Static Paths
// ============================================

export async function getStaticPaths() {
  try {
    /*
     * fetchPosts() returns:
     *
     * {
     *   posts: [],
     *   pagination: {}
     * }
     */

    const result = await fetchPosts(1);

    const posts = result?.posts || [];

    const paths = posts
      .filter((post) => post?.slug)
      .map((post) => ({
        params: {
          slug: post.slug,
        },
      }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error generating blog static paths:", error);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

// ============================================
// Fetch Single Blog
// ============================================

export async function getStaticProps({ params }) {
  try {
    // ==========================================
    // Current Blog Post
    // ==========================================

    const post = await fetchPostBySlug(params.slug);

    if (!post) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    // ==========================================
    // Fetch Blog Posts For Sidebar
    // ==========================================

    const result = await fetchPosts(1);

    const allPosts = result?.posts || [];

    // ==========================================
    // Recent Posts
    // ==========================================

    const recentPosts = allPosts
      .filter((item) => String(item.id) !== String(post.id))
      .slice(0, 5);

    // ==========================================
    // Categories
    // ==========================================

    const categories = post.categories || [];

    // ==========================================
    // Tags
    // ==========================================

    const tags = post.tags || [];

    // ==========================================
    // Return Props
    // ==========================================

    return {
      props: {
        post,
        recentPosts,
        categories,
        tags,
      },

      revalidate: 60,
    };
  } catch (error) {
    console.error("Error loading blog detail:", error);

    return {
      notFound: true,
      revalidate: 60,
    };
  }
}
