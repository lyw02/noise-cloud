"use client";

import { monitors } from "@/lib/utils";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
const dayjsFn: (args: any) => Dayjs = require("dayjs");
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface MonitorHourlyAvg {
  monitor: string;
  datetime: string;
  laeq: number;
}


export default function MonitorList() {
  // const queryClient = useQueryClient()
  const [monitorList, setMonitorList] = useState<MonitorHourlyAvg[]>();
  // const getAvg = async (monitor: string) => {
  //   const now = dayjsFn(new Date());
  //   const res = await fetch(
  //     `open-api/hourly-averages?username=dublincityapi&password=Xpa5vAQ9ki&monitor=${monitor}&start=${now
  //       .subtract(1, "hour")
  //       .unix()}&end=${now.unix()}`,
  //     {
  //       method: "POST",
  //     }
  //   );
  //   const json = await res.json();
  //   return { ...json[0], monitor } as unknown as MonitorHourlyAvg;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const temp: MonitorHourlyAvg[] = [];
  //     for (const monitor of monitors) {
  //       const data = await getAvg(monitor.serial_number);
  //       if (data) {
  //         data["monitor"] = monitor.serial_number;
  //         temp.push(data);
  //       }
  //     }
  //     setMonitorList(temp);
  //   };

  //   fetchData();
  // }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["monitorAvgList"],
    queryFn: fetchData,
  });

  return (
    <>
      {isLoading && <Loader2 className="animate-spin" />}
      {error && "Failed to fetch"}
      {data && (
        <ul className="flex flex-col max-h-[60%] overflow-y-scroll">
          {data
            .sort((a, b) => b.laeq - a.laeq)
            .map((monitor) => (
              <li key={uuidv4()} className="flex justify-between">
                <span>{monitor.monitor}</span>
                <span>{monitor.laeq}</span>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}

const getAvg = async (monitor: string) => {
  const now = dayjsFn(new Date());
  const res = await fetch(
    `open-api/hourly-averages?username=dublincityapi&password=Xpa5vAQ9ki&monitor=${monitor}&start=${now
      .subtract(1, "hour")
      .unix()}&end=${now.unix()}`,
    {
      method: "POST",
    }
  );
  const json = await res.json();
  return { ...json[0], monitor } as unknown as MonitorHourlyAvg;
};

const fetchData = async () => {
  const temp: MonitorHourlyAvg[] = [];
  for (const monitor of monitors) {
    const data = await getAvg(monitor.serial_number);
    if (data) {
      data["monitor"] = monitor.serial_number;
      temp.push(data);
    }
  }
  // setMonitorList(temp);
  return temp;
};
