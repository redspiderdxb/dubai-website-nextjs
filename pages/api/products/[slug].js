export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({
      message: "Invalid product slug",
    });
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.API_KEY;

  if (!API_URL || !API_KEY) {
    console.error("Product API configuration is missing.");

    return res.status(500).json({
      message: "Server API configuration is missing",
    });
  }

  try {
    const response = await fetch(
      `${API_URL}/products/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_KEY,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Product detail API error:", response.status);

      return res.status(response.status).json({
        message: "Failed to fetch product",
      });
    }

    const data = await response.json();

    return res.status(200).json({
      product: data?.data || null,
    });
  } catch (error) {
    console.error("Product detail proxy error:", error);

    return res.status(500).json({
      message: "Failed to fetch product",
    });
  }
}
