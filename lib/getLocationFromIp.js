function isPrivateOrLocalIp(ip) {
  if (!ip || ip === "Unknown") {
    return true;
  }

  const normalized = ip.replace(/^::ffff:/i, "");

  if (
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized.startsWith("127.")
  ) {
    return true;
  }

  if (
    normalized.startsWith("10.") ||
    normalized.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(normalized)
  ) {
    return true;
  }

  return false;
}

export async function getLocationFromIp(ip) {
  if (isPrivateOrLocalIp(ip)) {
    return "Unknown";
  }

  try {
    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(ip)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
      },
    );

    if (!response.ok) {
      return "Unknown";
    }

    const data = await response.json();

    if (!data?.success) {
      return "Unknown";
    }

    const parts = [data.city, data.region, data.country].filter(Boolean);

    return parts.join(", ") || "Unknown";
  } catch (error) {
    console.error("IP location lookup failed:", error);

    return "Unknown";
  }
}
