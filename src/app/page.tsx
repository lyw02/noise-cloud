import { AreaChartInteractive } from "@/components/area-chart-interactive";
import MapSection from "@/components/map-section";

interface DataPageProps {
  searchParams: {
    monitor: string;
  };
}

export default async function DataPage({ searchParams }: DataPageProps) {
  const selectedMonitor = searchParams.monitor || null;

  return (
    <main className="mx-8">
      <MapSection />
      {/* <AreaChartInteractive /> */}
    </main>
  );
}
