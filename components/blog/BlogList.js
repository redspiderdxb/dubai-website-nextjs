import Link from "next/link";
import Image from "next/image";

export default function BlogList({ posts = [] }) {
  // Agar posts nahi hain toh fallback message
  if (!posts || posts.length === 0) {
    return (
      <section id="blog-posts" className="blog-posts section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <h4>No blog posts found.</h4>
              <p className="text-muted">Check back later for updates.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Blog Posts Section */}
      <section id="blog-posts" className="blog-posts section">
        <div className="container">
          <div className="row gy-4">
            {posts.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6">
                <article className="h-100 d-flex flex-column">
                  {/* Post Image */}
                  <div className="post-img position-relative overflow-hidden">
                    <Image
                      src={post.image || "/assets/img/blog-placeholder.jpg"}
                      alt={post.title || post.name || "Blog Post"}
                      width={600}
                      height={400}
                      className="img-fluid w-100"
                      style={{ objectFit: "cover", height: "240px" }}
                      loading="lazy"
                      unoptimized={post.image?.startsWith("http")}
                    />
                  </div>

                  {/* Category */}
                  {post.category && (
                    <p className="post-category mt-3 mb-1">{post.category}</p>
                  )}

                  {/* Title */}
                  <h2 className="title fs-5 fw-bold">
                    <Link
                      href={`/blog/${post.slug || post.id}`}
                      className="text-dark text-decoration-none stretched-link"
                    >
                      {post.title || post.name || "Untitled Post"}
                    </Link>
                  </h2>

                  {/* Author & Date */}
                  <div className="d-flex align-items-center mt-auto pt-2">
                    <div className="post-meta">
                      <p className="post-author mb-0 small fw-medium">
                        {post.author?.name || "RedSpider Team"}
                      </p>
                      <p className="post-date mb-0 small text-muted">
                        <time dateTime={post.created_at}>
                          {post.created_at
                            ? new Date(post.created_at).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "Recent"}
                        </time>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Pagination Section */}
      <section id="blog-pagination" className="blog-pagination section">
        <div className="container">
          <div className="d-flex justify-content-center">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <i className="bi bi-chevron-left" aria-hidden="true"></i>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <i className="bi bi-chevron-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}