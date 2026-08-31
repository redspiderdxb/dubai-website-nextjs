export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const page = Number(req.query.page || 1);

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({
      message: "Invalid page",
    });
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;

  if (!API_URL || !API_KEY) {
    console.error("Blog API configuration is missing.");

    return res.status(500).json({
      message: "Server API configuration is missing",
    });
  }

  try {
    const response = await fetch(`${API_URL}/posts?page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Blog API error:", response.status);

      return res.status(response.status).json({
        message: "Failed to fetch blog posts",
      });
    }

    const data = await response.json();

    return res.status(200).json({
      posts: data?.data || [],
      pagination: data?.meta || {},
    });
  } catch (error) {
    console.error("Blog proxy error:", error);

    return res.status(500).json({
      message: "Failed to fetch blog posts",
    });
  }
}
