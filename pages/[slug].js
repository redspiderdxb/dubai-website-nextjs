import { fetchPostBySlug } from "../lib/api";

/**
 * Legacy Blog URL Redirect
 *
 * Old:
 * /blog-title/
 *
 * New:
 * /blog/blog-title/
 *
 * Only redirects when the slug actually exists
 * as a blog post in the API.
 */

export default function LegacyBlogSlug() {
  // This page should never render because valid blog
  // slugs are permanently redirected server-side.
  return null;
}

export async function getServerSideProps({ params }) {
  const slug = params?.slug;

  // Invalid/missing slug → normal 404
  if (!slug || typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    // Verify that this root-level slug is an actual blog.
    const post = await fetchPostBySlug(slug);

    if (!post) {
      return {
        notFound: true,
      };
    }

    // Valid legacy blog URL → permanent redirect.
    return {
      redirect: {
        destination: `/blog/${encodeURIComponent(slug)}/`,
        permanent: true,
      },
    };
  } catch (error) {
    console.error("LEGACY BLOG REDIRECT ERROR:", error);

    // Fail safely.
    // Never redirect an unknown URL to a blog.
    return {
      notFound: true,
    };
  }
}
