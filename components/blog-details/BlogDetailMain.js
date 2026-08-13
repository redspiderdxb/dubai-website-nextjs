import Image from "next/image";
import Link from "next/link";

export default function BlogDetailMain({ post }) {
  // Agar post nahi hai toh fallback
  if (!post) {
    return (
      <div className="col-lg-8">
        <div className="text-center py-5">
          <h4>No post data available</h4>
        </div>
      </div>
    );
  }

  // Format date
  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Recent";

  return (
    <div>
      {/* Blog Details Section */}
      <section id="blog-details" className="blog-details section">
        <div className="container">
          <article className="article">
            {/* Post Image */}
            <div className="post-img">
              <Image
                src={post.image || "/assets/img/blog/blog-1.jpg"}
                alt={post.title || "Blog Post Image"}
                width={800}
                height={450}
                className="img-fluid w-100"
                style={{ objectFit: "cover", maxHeight: "450px" }}
                loading="lazy"
                unoptimized={post.image?.startsWith("http")}
              />
            </div>

            {/* Title */}
            <h2 className="title">
              {post.title || post.name || "Untitled Post"}
            </h2>

            {/* Meta Top */}
            <div className="meta-top">
              <ul>
                <li className="d-flex align-items-center">
                  <i className="bi bi-person" aria-hidden="true"></i>
                  <span>{post.author?.name || "RedSpider Team"}</span>
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-clock" aria-hidden="true"></i>
                  <time dateTime={post.created_at}>{formattedDate}</time>
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-chat-dots" aria-hidden="true"></i>
                  <span>{post.comments_count || 0} Comments</span>
                </li>
              </ul>
            </div>

            {/* Content */}
            <div className="content">
              {post.description && (
                <p className="lead fw-medium">{post.description}</p>
              )}

              {post.content ? (
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="blog-content"
                />
              ) : (
                <p className="text-muted">Full content not available.</p>
              )}

              {/* Categories & Tags */}
              {(post.categories?.length > 0 || post.tags?.length > 0) && (
                <div className="meta-bottom d-flex flex-wrap gap-3 mt-4 pt-3 border-top">
                  {post.categories?.length > 0 && (
                    <>
                      <i className="bi bi-folder" aria-hidden="true"></i>
                      <ul className="cats list-inline mb-0">
                        {post.categories.map((cat, idx) => (
                          <li key={idx} className="list-inline-item">
                            <Link
                              href={`/category/${cat.slug}`}
                              className="text-decoration-none"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {post.tags?.length > 0 && (
                    <>
                      <i className="bi bi-tags" aria-hidden="true"></i>
                      <ul className="tags list-inline mb-0">
                        {post.tags.map((tag, idx) => (
                          <li key={idx} className="list-inline-item">
                            <Link
                              href={`/tag/${tag.slug}`}
                              className="text-decoration-none"
                            >
                              #{tag.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          </article>
        </div>
      </section>

    </div>
  );
}
