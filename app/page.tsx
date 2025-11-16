import { prisma } from "@/lib/db";
import {
  adaptHeroAndIntro,
  adaptMarketSegments,
  adaptLifecycle,
  adaptCapabilities,
  adaptForgedWheels,
  adaptCompany,
} from "@/lib/adapters";
import HeroBanner from "./components/HeroBanner";
import MarketSegments from "./components/MarketSegments";
import FullProductLifecycle from "./components/FullProductLifecycle";
import Capabilities from "./components/Capabilities";
import ForgedWheelsSection from "./components/ForgedWheelsSection";
import CompanySection from "./components/CompanySection";
import CallToActionSection from "./components/CallToActionSection";

export default async function Home() {
  // Fetch page data from database
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
    include: {
      blocks: {
        orderBy: { order: "asc" },
      },
    },
  });

  // Handle case when page is not found
  if (!page) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600">
            The home page data has not been seeded yet. Please run:
          </p>
          <code className="block bg-gray-100 text-gray-800 px-4 py-2 rounded mt-4 font-mono text-sm">
            npx prisma db seed
          </code>
        </div>
      </div>
    );
  }

  // Adapt blocks to component props
  const heroAndIntro = adaptHeroAndIntro(page.blocks);
  const marketSegments = adaptMarketSegments(page.blocks);
  const lifecycle = adaptLifecycle(page.blocks);
  const capabilities = adaptCapabilities(page.blocks);
  const forgedWheels = adaptForgedWheels(page.blocks);
  const company = adaptCompany(page.blocks);

  return (
    <>
      <HeroBanner hero={heroAndIntro.hero} intro={heroAndIntro.intro} />
      <MarketSegments marketSegments={marketSegments} />
      <FullProductLifecycle lifecycle={lifecycle} />
      <Capabilities capabilities={capabilities} />
      <ForgedWheelsSection forgedWheels={forgedWheels} />
      <CompanySection company={company} />
      <CallToActionSection />
    </>
  );
}

