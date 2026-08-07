// pages/blog/[slug].js

import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import BlogHero from "../../components/blog/BlogHero";
import BlogPageTitle from "../../components/blog/BlogPageTitle";
import BlogDetailMain from "../../components/blog-details/BlogDetailMain";
import BlogDetailSidebar from "../../components/blog-details/BlogDetailSidebar";
import { fetchAllPosts, fetchPostBySlug } from "../../lib/api";

export default function BlogDetail({ post, recentPosts, categories, tags }) {
  // Agar post nahi mili toh fallback
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

  const seoData = {
    title: post.title || post.name || "Blog Details - RedSpider",
    description: post.description || "Read the full article on the latest trends in web design and development.",
    keywords: "blog details, web design article, redspider blog",
    canonical: `https://www.redspider.ae/blog/${post.slug}`,
    image: post.image || "https://www.redspider.ae/blog-og-image.jpg",
    noIndex: false,
  };

  return (
    <Layout>
      <SEO {...seoData} />
      <main className="main">
       
        <BlogPageTitle />

        <div className="container">
          <div className="row">
            
              <BlogDetailMain post={post} />
            
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

        {/* <BlogCTA /> */}
      </main>
    </Layout>
  );
}

// ✅ Sabhi slugs ke liye paths generate karo
export async function getStaticPaths() {
  const posts = await fetchAllPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

// ✅ Ek specific post + sidebar data fetch karo
export async function getStaticProps({ params }) {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  // ✅ Recent Posts (excluding current), Categories, Tags
  const allPosts = await fetchAllPosts();
  const recentPosts = allPosts.filter(p => p.id !== post.id).slice(0, 5);
  const categories = post.categories || [];
  const tags = post.tags || [];

  return {
    props: {
      post,
      recentPosts,
      categories,
      tags,
    },
    revalidate: 60,
  };
}