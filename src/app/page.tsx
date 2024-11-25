import { AreaChartInteractive } from "@/components/area-chart-interactive";
import MapSection from "@/components/map-section";

interface DataPageProps {
  // searchParams: {
  //   monitor: string;
  // };
}

export default async function DataPage({}: DataPageProps) {
  // const selectedMonitor = searchParams.monitor || null;

  return (
    <main className="flex flex-col mx-8 gap-y-5">
      <MapSection />
      <AreaChartInteractive />
    </main>
  );
}
