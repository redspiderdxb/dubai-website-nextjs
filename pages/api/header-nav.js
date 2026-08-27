import { getHeaderNavData } from "../../lib/headerNav";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const data = await getHeaderNavData();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=3600",
  );

  return res.status(200).json(data);
}
