import ServiceHero from "../services/ServiceHero";
import ServiceBody from "../services/ServiceBody";
import ServiceCTA from "../services/ServiceCTA";

export default function HostingTemplate({ data }) {
  return (
    <>
      <ServiceHero service={data} />
      <ServiceBody service={data} />
      <ServiceCTA service={data} />
    </>
  );
}