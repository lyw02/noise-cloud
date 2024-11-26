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
import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo, useState } from "react";
import { getAllUserData } from "@/lib/api";
import * as dayjs from "dayjs";
import { useToast } from "@/hooks/use-toast";

interface UserPos {
  latitude: number;
  decibels: number;
  userId: string;
  longitude: number;
  timestamp: number;
}

interface PosMarker {
  key: string;
  location: google.maps.LatLngLiteral;
  info?: {
    [key: string]: any;
  };
}

const monitorLocations: PosMarker[] = monitors.map((monitor) => ({
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
  function MonitorPositionMarkers(props: { positions: PosMarker[] }) {
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
        {props.positions.map((position: PosMarker) => (
          <AdvancedMarker
            key={uuidv4()}
            position={position.location}
            clickable
            onClick={handlePositionClick}
          >
            <Pin
              background={"#FBBC04"}
              glyphColor={"#fff"}
              borderColor={"#fff"}
            />
          </AdvancedMarker>
        ))}
      </>
    );
  }

  const [userLocations, setUserLocations] = useState<UserPos[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUserData();
        const json = await res?.body.json();
        setUserLocations(json as unknown as UserPos[]);
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const userPositionMarkers = useMemo(() => {
    if (!userLocations) return [];
    return userLocations.map(
      (item) =>
        ({
          key: item.userId,
          location: {
            lat: item.latitude,
            lng: item.longitude,
          },
          info: {
            user: item.userId,
            time: dayjs
              .unix(item.timestamp)
              .format("YYYY-MM-DD (ddd) HH:mm:ss"),
            decibels: item.decibels,
          },
        } as PosMarker)
    );
  }, [userLocations]);

  function UserPositionMarkers(props: { positions: PosMarker[] }) {
    const { toast } = useToast();
    return (
      <>
        {props.positions.map((position: PosMarker) => (
          <AdvancedMarker
            key={`${position.info!.time}${position.key}`}
            position={position.location}
            clickable
            onClick={() => {
              toast({
                description: (
                  <div className="flex flex-col justify-between w-full">
                    <span className="flex justify-between">
                      <b className="mr-5">User:</b> {position.info?.user}
                    </span>
                    <span className="flex justify-between">
                      <b className="mr-5">Time:</b> {position.info?.time}
                    </span>
                    <span className="flex justify-between">
                      <b className="mr-5">Decibels:</b>{" "}
                      {position.info?.decibels}
                    </span>
                  </div>
                ),
              });
            }}
          >
            <Pin
              scale={0.5}
              background={"#f00"}
              glyphColor={"#fff"}
              borderColor={"#fff"}
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
          fullscreenControl={false}
          mapTypeControl={false}
          zoomControl={false}
          scaleControl={false}
          streetViewControl={false}
          rotateControl={false}
          cameraControl={false}
          clickableIcons={false}
          disableDefaultUI
          reuseMaps
        >
          <MonitorPositionMarkers positions={monitorLocations} />
          <UserPositionMarkers positions={userPositionMarkers} />
        </GMap>
      </CardContent>
    </Card>
  );
}
