import { getGoogleReviews } from "../../lib/googleReviews";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const data = await getGoogleReviews();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );

  return res.status(200).json(data);
}
