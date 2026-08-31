export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;

  if (!API_URL || !API_KEY) {
    console.error("Products API configuration is missing.");

    return res.status(500).json({
      message: "Server API configuration is missing",
    });
  }

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Products API error:", response.status);

      return res.status(response.status).json({
        message: "Failed to fetch products",
      });
    }

    const data = await response.json();

    return res.status(200).json({
      products: Array.isArray(data?.data) ? data.data : [],
    });
  } catch (error) {
    console.error("Products proxy error:", error);

    return res.status(500).json({
      message: "Failed to fetch products",
    });
  }
}
