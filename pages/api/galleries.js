import { getAllGalleries, getGalleriesPage } from "../../lib/galleries";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=3600",
  );

  if (req.query.all === "1") {
    const galleries = await getAllGalleries();

    return res.status(200).json({
      galleries,
    });
  }

  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.per_page || 12);
  const data = await getGalleriesPage(page, perPage);

  return res.status(200).json(data);
}
