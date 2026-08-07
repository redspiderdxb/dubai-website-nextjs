import Link from "next/link";
import Image from "next/image";

export default function BlogDetailSidebar({
  recentPosts = [],
  categories = [],
  tags = [],
  author = null,
}) {
  return (
    <div className="sidebar">
      <div className="widgets-container">
        {/* Author Widget */}
        {author && (
          <div className="blog-author-widget widget-item">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center w-100">
                {author.avatar && (
                  <Image
                    src={author.avatar}
                    className="rounded-circle flex-shrink-0"
                    alt={author.name || "Author"}
                    width={80}
                    height={80}
                    loading="lazy"
                    unoptimized={author.avatar?.startsWith("http")}
                  />
                )}
                <div className="ms-3">
                  <h4>{author.name || "RedSpider Team"}</h4>
                  <div className="social-links">
                    {author.twitter && (
                      <a href={author.twitter} aria-label="Twitter">
                        <i className="bi bi-twitter-x" aria-hidden="true"></i>
                      </a>
                    )}
                    {author.facebook && (
                      <a href={author.facebook} aria-label="Facebook">
                        <i className="bi bi-facebook" aria-hidden="true"></i>
                      </a>
                    )}
                    {author.instagram && (
                      <a href={author.instagram} aria-label="Instagram">
                        <i className="bi bi-instagram" aria-hidden="true"></i>
                      </a>
                    )}
                    {author.linkedin && (
                      <a href={author.linkedin} aria-label="LinkedIn">
                        <i className="bi bi-linkedin" aria-hidden="true"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {author.bio && <p className="mt-2">{author.bio}</p>}
            </div>
          </div>
        )}

        {/* Search Widget */}
        <div className="search-widget widget-item">
          <h3 className="widget-title">Search</h3>
          <form action="" role="search">
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              autoComplete="off"
            />
            <button type="submit" aria-label="Search">
              <i className="bi bi-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>

        {/* Categories Widget — Sirf Text (No Links) */}
        <div className="categories-widget widget-item">
          <h3 className="widget-title">Categories</h3>
          <ul className="mt-3">
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <li key={cat.id}>
                  <span>{cat.name}</span> <span>({cat.count || 0})</span>
                </li>
              ))
            ) : (
              <li>No categories found</li>
            )}
          </ul>
        </div>

        {/* Recent Posts Widget — Dynamic */}
        <div className="recent-posts-widget widget-item">
          <h3 className="widget-title">Recent Posts</h3>
          {recentPosts && recentPosts.length > 0 ? (
            recentPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="post-item">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title || post.name || "Recent post"}
                    className="flex-shrink-0"
                    width={60}
                    height={60}
                    loading="lazy"
                    unoptimized={post.image?.startsWith("http")}
                  />
                )}
                <div>
                  <h4>
                    <Link href={`/blog/${post.slug || post.id}`}>
                      {post.title || post.name || "Untitled Post"}
                    </Link>
                  </h4>
                  <time dateTime={post.created_at}>
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Recent"}
                  </time>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No recent posts</p>
          )}
        </div>

        {/* Tags Widget — Sirf Text (Inline Display) */}
        <div className="tags-widget widget-item">
          <h3 className="widget-title">Tags</h3>
          <ul className="d-flex flex-wrap gap-1">
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <li key={tag.id} className="d-inline-block">
                  <span className="badge bg-light text-dark border px-3 py-2">
                    {tag.name}
                  </span>
                </li>
              ))
            ) : (
              <li>No tags found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
