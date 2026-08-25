import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import { fetchAllServices } from "../../lib/api";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage({ services }) {
  return (
    <Layout>
      <SEO
        title="Our Services | RedSpider"
        description="Explore our range of professional services in Dubai"
      />
      <div className="container mx-auto px-4 py-16 " style={{ paddingTop: "200px" }}>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Our Services
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          We offer a wide range of professional services to help your business grow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <Link 
              key={service.id} 
              href={`/service/${service.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                {service.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.image}`}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <span className="inline-block text-blue-600 font-medium group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetchAllServices();
    const services = response?.data || [];
    return {
      props: { services },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { props: { services: [] }, revalidate: 60 };
  }
}