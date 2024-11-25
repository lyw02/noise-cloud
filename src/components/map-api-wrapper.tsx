"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

function MapAPIWrapper({ children }: { children: React.ReactNode }) {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      {children}
    </APIProvider>
  );
}

export default MapAPIWrapper;
