export default function AboutBrands({ data }) {
  // Get data from API or use fallback
  const brandsTitle = data?.brands_title || "We've Worked With Amazing Brands";
  const brandsDescription = data?.brands_description || "We are proud to work with leading government organizations, global enterprises, hospitality brands and growing businesses across the UAE and beyond.";
  const brandsImage = data?.brands_image || "assets/img/Logo_black.webp";
  const brandsButtonText = data?.brands_button_text || "View Portfolio";
  const brandsButtonLink = data?.brands_button_link || "/portfolio";

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    
    if (imagePath.includes("storage/")) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost/redspider/public";
      const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
      return `${baseUrl}${cleanPath}`;
    }
    
    return imagePath;
  };

  return (
    <section className="rs-about-company">
      <div className="container" >
        <div className="row align-items-center g-5">
          <div className="col-lg-4">
            <div className="rs-company-left">
              <h2>{brandsTitle}</h2>
              <p>{brandsDescription}</p>
              <a href={brandsButtonLink} className="rs-company-btn">
                {brandsButtonText} <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="rs-company-logos">
              <img 
                src={getImageUrl(brandsImage)} 
                className="img-fluid" 
                alt="Client logos and partner brands" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}