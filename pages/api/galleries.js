import { getAllGalleries, getGalleriesPage } from "../../lib/galleries";

export function galleryCatalogCacheControl(complete) {
  if (complete) {
    return "public, s-maxage=300, stale-while-revalidate=3600";
  }

  return "private, no-store";
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  if (req.query.all === "1") {
    const result = await getAllGalleries();
    const galleries = Array.isArray(result?.galleries) ? result.galleries : [];
    const stale = result?.stale === true;
    const complete = result?.complete === true && !stale && galleries.length > 0;
    const body = {
      galleries,
      complete,
      total: Number(result?.total || 0),
    };

    if (stale) {
      body.stale = true;
      body.complete = false;
    }

    res.setHeader("Cache-Control", galleryCatalogCacheControl(body.complete));

    return res.status(200).json(body);
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=3600",
  );

  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.per_page || 12);
  const data = await getGalleriesPage(page, perPage);

  return res.status(200).json(data);
}
