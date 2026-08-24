export async function getServerSideProps({ res }) {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.redspider.ae/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}