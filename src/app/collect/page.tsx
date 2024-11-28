"use client";

import LiveNoiseTab from "@/components/live-noise-tab";
import OpenDataTab from "@/components/open-data-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CollectPage() {
  return (
    <Tabs defaultValue="live" className="w-auto mx-8">
      <TabsList className="grid w-full grid-cols-2 space-x-2">
        <TabsTrigger value="live">Live Noise</TabsTrigger>
        <TabsTrigger value="open-data">Dublin City API</TabsTrigger>
      </TabsList>
      <TabsContent value="live">
        <LiveNoiseTab>Displayer Here</LiveNoiseTab>
      </TabsContent>
      <TabsContent value="open-data">
        <OpenDataTab />
      </TabsContent>
    </Tabs>
  );
}
