"use client";

import { useState } from "react";
import Map from "@/components/map";
import MonitorListAndInfo from "@/components/monitor-list-and-info";
import { Monitor } from "@/lib/types";

export default function MapSection() {
  const [monitor, setMonitor] = useState<Monitor | null>(null);
  return (
    <section className="flex flex-col md:flex-row justify-between w-full h-[50vh] gap-x-5 gap-y-5">
      <Map setMonitor={setMonitor} />
      <MonitorListAndInfo monitor={monitor} setMonitor={setMonitor} />
    </section>
  );
}
