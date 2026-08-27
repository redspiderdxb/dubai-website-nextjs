import ContactCTA from "../ui/ContactCTA";

export default function ServiceCTA({ service }) {
  const title = service?.cta_title;
  const description = service?.cta_description;
  const background = service?.cta_background;

  const backgroundImage = background
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${background}`
    : undefined;

  return (
    <ContactCTA
      title={title || undefined}
      description={description || undefined}
      backgroundImage={backgroundImage}
    />
  );
}
