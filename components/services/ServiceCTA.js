import ContactCTA from "../ui/ContactCTA";

const LOGO_FALLBACK_TITLE = "Ready to build a strong brand identity?";
const LOGO_FALLBACK_DESCRIPTION =
  "Let RedSpider create a professional logo that represents your business the right way.";

export default function ServiceCTA({ service }) {
  const slug = String(service?.slug || service?.name || "").toLowerCase();
  const isLogoService = slug.includes("logo");

  const rawTitle = service?.cta_title;
  const rawDescription = service?.cta_description;
  const background = service?.cta_background;

  const title =
    !isLogoService && rawTitle === LOGO_FALLBACK_TITLE
      ? undefined
      : rawTitle || undefined;

  const description =
    !isLogoService && rawDescription === LOGO_FALLBACK_DESCRIPTION
      ? undefined
      : rawDescription || undefined;

  const backgroundImage = background
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${background}`
    : undefined;

  return (
    <ContactCTA
      title={title}
      description={description}
      backgroundImage={backgroundImage}
    />
  );
}
