export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.API_KEY;

  if (!API_URL || !API_KEY) {
    console.error("Contact API configuration is missing.");

    return res.status(500).json({
      message: "Server API configuration is missing",
    });
  }

  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Contact proxy error:", error);

    return res.status(500).json({
      message: "Failed to submit contact form",
    });
  }
}