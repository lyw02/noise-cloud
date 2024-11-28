"use client";

import { AreaChartInteractive } from "@/components/area-chart-interactive";
import MapSection from "@/components/map-section";

interface DataPageProps {}

export default async function DataPage({}: DataPageProps) {
  return (
    <main className="flex flex-col mx-8 gap-y-5">
      <MapSection />
      <AreaChartInteractive />
    </main>
  );
}
