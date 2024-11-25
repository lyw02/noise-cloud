import { Monitor } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

interface MonitorInfoProps {
  monitor: Monitor;
}

export default function MonitorInfo({ monitor }: MonitorInfoProps) {
  return (
    <>
      <dl className="flex flex-col justify-between h-full">
        {Object.entries(monitor).map(
          (entry) =>
            entry[0] !== "label" && (
              <span className="flex justify-between mb-2">
                <dt key={uuidv4()}>
                  <b>{capitalize(entry[0].replace("_", " "))}</b>
                </dt>
                <dd key={uuidv4()}>{entry[1]}</dd>
              </span>
            )
        )}
      </dl>
    </>
  );
}
