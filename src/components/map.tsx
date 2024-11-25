"use client";

import { monitors } from "@/lib/utils";
import {
  AdvancedMarker,
  Map as GMap,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { Card, CardContent } from "./ui/card";
import { Monitor } from "@/lib/types";

type monitorPos = { key: string; location: google.maps.LatLngLiteral };

const monitorLocations: monitorPos[] = monitors.map((monitor) => ({
  key: `${monitor.label} (${monitor.serial_number})`,
  location: {
    lat: Number(monitor.latitude),
    lng: Number(monitor.longitude),
  },
}));

interface MapProps {
  setMonitor: React.Dispatch<React.SetStateAction<Monitor | null>>;
}

export default function Map({ setMonitor }: MapProps) {
  function PositionMarkers(props: { positions: monitorPos[] }) {
    const map = useMap();
    const handlePositionClick = (e: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!e.latLng) return;
      map.panTo(e.latLng);
      const [lat, lng] = e
        .latLng!.toString()
        .slice(1, e.latLng!.toString().length - 1)
        .split(", ");
      const monitor = monitors.find(
        (item) => item.latitude === lat && item.longitude === lng
      );
      setMonitor(monitor || null);
    };
    return (
      <>
        {props.positions.map((position: monitorPos) => (
          <AdvancedMarker
            key={position.key}
            position={position.location}
            clickable
            onClick={handlePositionClick}
          >
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        ))}
      </>
    );
  }

  return (
    <Card className="w-full md:w-[60vw] h-[50vh] overflow-hidden">
      <CardContent className="w-full h-full p-0">
        <GMap
          mapId="6b9f6211196e3efe"
          defaultZoom={11}
          defaultCenter={{ lat: 53.369864, lng: -6.258966 }}
        >
          <PositionMarkers positions={monitorLocations} />
        </GMap>
      </CardContent>
    </Card>
  );
}
