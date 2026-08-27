const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const PLACE_QUERY = "RedSpider Web & Art Design Dubai";
const GOOGLE_LISTING_URL = "https://share.google/Zmvt06D8A6xyIbCte";

let cache = {
  data: null,
  expiresAt: 0,
};

function getApiKey() {
  return process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
}

async function findPlaceId(apiKey) {
  if (process.env.GOOGLE_PLACE_ID) {
    return process.env.GOOGLE_PLACE_ID;
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  );

  url.searchParams.set("input", PLACE_QUERY);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,name");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data?.status !== "OK") {
    throw new Error(data?.error_message || data?.status || "Place lookup failed");
  }

  return data?.candidates?.[0]?.place_id || null;
}

function slimReviews(reviews) {
  if (!Array.isArray(reviews)) {
    return [];
  }

  return reviews.slice(0, 5).map((review) => ({
    author: review.author_name || "Google user",
    authorUrl: review.author_url || "",
    photo: review.profile_photo_url || "",
    rating: Number(review.rating || 0),
    time: review.relative_time_description || "",
    text: review.text || "",
  }));
}

export async function getGoogleReviews() {
  const now = Date.now();

  if (cache.data && now < cache.expiresAt) {
    return cache.data;
  }

  const apiKey = getApiKey();

  if (!apiKey) {
    return {
      available: false,
      name: "RedSpider Web & Art Design",
      rating: 4.9,
      total: 100,
      url: GOOGLE_LISTING_URL,
      reviews: [],
    };
  }

  try {
    const placeId = await findPlaceId(apiKey);

    if (!placeId) {
      throw new Error("Google Place ID not found");
    }

    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json",
    );

    url.searchParams.set("place_id", placeId);
    url.searchParams.set(
      "fields",
      "name,rating,user_ratings_total,url,reviews",
    );
    url.searchParams.set("reviews_sort", "most_relevant");
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString());
    const payload = await response.json();

    if (payload?.status !== "OK") {
      throw new Error(
        payload?.error_message || payload?.status || "Place details failed",
      );
    }

    const result = payload?.result || {};

    const data = {
      available: true,
      name: result.name || "RedSpider Web & Art Design",
      rating: Number(result.rating || 0),
      total: Number(result.user_ratings_total || 0),
      url: result.url || GOOGLE_LISTING_URL,
      reviews: slimReviews(result.reviews),
    };

    cache = {
      data,
      expiresAt: now + CACHE_TTL_MS,
    };

    return data;
  } catch (error) {
    console.error("Error fetching Google reviews:", error);

    return (
      cache.data || {
        available: false,
        name: "RedSpider Web & Art Design",
        rating: 4.9,
        total: 100,
        url: GOOGLE_LISTING_URL,
        reviews: [],
      }
    );
  }
}
