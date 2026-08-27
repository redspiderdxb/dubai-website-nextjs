import Image from "next/image";
import Button from "../ui/Button";

export default function AboutBrands({ data }) {
  // Get data from API or use fallback
  const brandsTitle = data?.brands_title || "We've Worked With Amazing Brands";

  const brandsDescription =
    data?.brands_description ||
    "We are proudto work with leading government organizations, global enterprises, hospitality brands and growing businesses across the UAE and beyond.";

  const brandsImage = data?.brands_image || "/assets/img/Logo_black.webp";

  const brandsButtonText = data?.brands_button_text || "View Portfolio";

  const brandsButtonLink = data?.brands_button_link || "/our-portfolio/";

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // Full external URL
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Laravel storage image
    if (imagePath.includes("storage/")) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
        "http://localhost/redspider/public";

      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

      return `${baseUrl}${cleanPath}`;
    }

    // Local public assets
    if (imagePath.startsWith("/")) {
      return imagePath;
    }

    return `/${imagePath}`;
  };

  return (
    <section className="rs-about-company">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-4">
            <div className="rs-company-left">
              <h2>{brandsTitle}</h2>

              <p>{brandsDescription}</p>

              <Button color="red" href={brandsButtonLink}>
                {brandsButtonText}
              </Button>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="rs-company-logos">
              <Image
                src={getImageUrl(brandsImage)}
                className="img-fluid"
                alt="Client logos and partner brands of RedSpider Dubai"
                width={900}
                height={520}
                sizes="(max-width: 991px) 100vw, 66vw"
                loading="lazy"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
