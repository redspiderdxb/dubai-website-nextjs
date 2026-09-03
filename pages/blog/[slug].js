import PageStyles from "../../components/seo/PageStyles";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import BlogPageTitle from "../../components/blog/BlogPageTitle";

import BlogDetailMain from "../../components/blog-details/BlogDetailMain";

import { fetchPosts, fetchPostBySlug } from "../../lib/api";

import Image from "next/image";
import Link from "next/link";
import ContactCTA from "../../components/ui/ContactCTA";

import { buildBlogPostSchema } from "../../lib/schema/blogPostSchema";

/* =====================================================
   RELATED INSIGHTS
===================================================== */

function RelatedInsights({ posts = [] }) {
  const relatedPosts = posts.filter(Boolean).slice(0, 4);

  if (!relatedPosts.length) {
    return null;
  }

  const featured = relatedPosts[0];
  const sidePosts = relatedPosts.slice(1, 4);

  return (
    <section className="rs-related-section">
      <div className="container">
        {/* =================================================
            HEADING
        ================================================= */}

        <div className="rs-related-heading">
          <div>
            <span>KEEP EXPLORING</span>

            <h2>
              Related
              <strong>Insights</strong>
            </h2>

            <p>More ideas for websites, portals and growth.</p>
          </div>
        </div>

        {/* =================================================
            RELATED GRID
        ================================================= */}

        <div className="rs-related-grid">
          {/* =================================================
              FEATURED
          ================================================= */}

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="rs-related-featured"
            >
              <div className="rs-related-image">
                <Image
                  src={featured.image || "/assets/img/blog/blog-1.webp"}
                  alt={featured.title || "Related Blog"}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="rs-related-img"
                  unoptimized={featured.image?.startsWith("http")}
                />
              </div>

              <div className="rs-related-overlay">
                <small>
                  {featured.categories?.[0]?.name || "Digital Marketing"}
                </small>

                <h3>{featured.title || featured.name || "Related Article"}</h3>

                <p>
                  {featured.description ||
                    "Discover useful insights, strategies and ideas."}
                </p>

                <span className="rs-related-read">
                  Read article
                  <i className="bi bi-arrow-up-right"></i>
                </span>
              </div>
            </Link>
          )}

          {/* =================================================
              SIDE POSTS
          ================================================= */}

          <div className="rs-related-side">
            {sidePosts.map((item, index) => (
              <Link
                key={item.id || item.slug || index}
                href={`/blog/${item.slug}`}
                className="rs-related-small"
              >
                <div className="rs-related-small-image">
                  <Image
                    src={item.image || "/assets/img/blog/blog-1.webp"}
                    alt={item.title || "Related Blog"}
                    fill
                    sizes="90px"
                    className="rs-related-small-img"
                    unoptimized={item.image?.startsWith("http")}
                  />
                </div>

                <div className="rs-related-small-content">
                  <span>
                    {item.categories?.[0]?.name || "Digital Marketing"}
                  </span>

                  <h4>{item.title || item.name || "Related Article"}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =================================================
            VIEW MORE
        ================================================= */}

        <div className="rs-related-more">
          <Link href="/blog">
            View More
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   PAGE
===================================================== */

export default function BlogDetail({ post, recentPosts, pageSchema }) {
  /* ===================================================
     NOT FOUND
  ================================================== */

  if (!post) {
    return (
      <Layout>
        <PageStyles href="/assets/css/pages/blog-detail.css" />
        <SEO title="Post Not Found" />

        <main className="main">
          <div className="container py-5 text-center">
            <h1>Post Not Found</h1>
          </div>
        </main>
      </Layout>
    );
  }

  /* ===================================================
     SEO
  ================================================== */

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

    canonical: `https://www.redspider.ae/blog/${post.slug}/`,

    image:
      post.seo?.seo_image ||
      post.seo_image ||
      post.image ||
      "https://www.redspider.ae/blog-og-image.jpg",

    robots: "index,follow",
  };

  /* ===================================================
     PAGE
  ================================================== */

  return (
    <Layout>
      <PageStyles href="/assets/css/pages/blog-detail.css" />
      <SEO {...seoData} pageSchema={pageSchema} />

      <main className="main rs-blog-detail-page">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <BlogPageTitle title={post.title || post.name} />

        {/* =================================================
            BLOG DETAIL
        ================================================= */}

        <div className="container rs-blog-wrapper">
          <BlogDetailMain post={post} />
        </div>

        {/* =================================================
            RELATED INSIGHTS
        ================================================= */}

        <RelatedInsights posts={recentPosts} />
        <ContactCTA />
      </main>
    </Layout>
  );
}

/* =====================================================
   STATIC PATHS
===================================================== */

export async function getStaticPaths() {
  try {
    const result = await fetchPosts(1);

    const posts = Array.isArray(result?.posts) ? result.posts : [];

    const paths = posts
      .filter((post) => post?.slug)
      .map((post) => ({
        params: {
          slug: String(post.slug),
        },
      }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("BLOG PATH ERROR:", error);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

/* =====================================================
   STATIC PROPS
===================================================== */

export async function getStaticProps({ params }) {
  try {
    if (!params?.slug) {
      return {
        notFound: true,
      };
    }

    /* =================================================
       CURRENT POST
    ================================================= */

    const post = await fetchPostBySlug(params.slug);
    const pageSchema = buildBlogPostSchema(post);

    if (!post) {
      return {
        notFound: true,
      };
    }

    /* =================================================
       RELATED POSTS
    ================================================= */

    const result = await fetchPosts(1);

    const allPosts = Array.isArray(result?.posts) ? result.posts : [];

    const recentPosts = allPosts
      .filter((item) => String(item.id) !== String(post.id))
      .slice(0, 4);

    /* =================================================
       RETURN
    ================================================= */

    return {
      props: {
        post,
        recentPosts,
        pageSchema,
      },

      revalidate: 60,
    };
  } catch (error) {
    console.error("BLOG DETAIL ERROR:", error);

    return {
      notFound: true,
    };
  }
}
