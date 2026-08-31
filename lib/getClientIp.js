export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    const firstIp = String(forwarded).split(",")[0]?.trim();

    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = req.headers["x-real-ip"];

  if (realIp) {
    return String(realIp).trim();
  }

  const remoteAddress = req.socket?.remoteAddress;

  if (remoteAddress) {
    return String(remoteAddress).trim();
  }

  return "Unknown";
}
