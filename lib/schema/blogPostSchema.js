const ORGANIZATION_ID = "https://www.redspider.ae/#organization";
const SITE_URL = "https://www.redspider.ae";

function stripHtml(html = "") {
  return String(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function toIsoDate(value) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function extractFaqs(html = "") {
  if (!html) return [];

  const faqHeadingMatch =
    /<h2\b[^>]*>[\s\S]*?(?:\bfaq(?:s)?\b|frequently\s+asked\s+questions)[\s\S]*?<\/h2>/i.exec(
      html,
    );
  if (!faqHeadingMatch) {
    return [];
  }

  const sectionStart = faqHeadingMatch.index + faqHeadingMatch[0].length;

  const remainingHtml = html.slice(sectionStart);

  const nextH2Match = /<h2\b/i.exec(remainingHtml);

  const faqSection = nextH2Match
    ? remainingHtml.slice(0, nextH2Match.index)
    : remainingHtml;

  const questionRegex = /<h3\b[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3\b|$)/gi;

  const faqs = [];
  let match;

  while ((match = questionRegex.exec(faqSection)) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);

    if (!question || !answer) {
      continue;
    }

    faqs.push({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    });
  }

  return faqs;
}

export function buildBlogPostSchema(post, overrides = {}) {
  if (!post) {
    return [];
  }

  const slug = String(post.slug || "").trim();

  if (!slug) {
    return [];
  }

  const title = overrides.headline || post.title || post.name || "Blog Post";

  const description =
    overrides.description ||
    post.seo?.seo_description ||
    post.seo_description ||
    post.description ||
    "";

  const image =
    overrides.image ||
    post.image ||
    post.seo?.seo_image ||
    post.seo_image ||
    null;

  const canonicalUrl = `${SITE_URL}/blog/${slug}/`;

  const datePublished = toIsoDate(overrides.datePublished || post.created_at);

  const dateModified = toIsoDate(
    overrides.dateModified || post.updated_at || post.created_at,
  );

  const graph = [];

  const article = {
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    headline: title,
    description,
    author: {
      "@id": ORGANIZATION_ID,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  if (image) {
    article.image = image;
  }

  if (datePublished) {
    article.datePublished = datePublished;
  }

  if (dateModified) {
    article.dateModified = dateModified;
  }

  graph.push(article);

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  });

  const faqs = extractFaqs(post.content || "");

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqs,
    });
  }

  return graph;
}

export { extractFaqs };
