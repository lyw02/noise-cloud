"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  XAxis,
} from "recharts";
import { Dayjs } from "dayjs";
const dayjs: (args: any) => Dayjs = require("dayjs");

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getData, getOpenDataFromDb } from "@/lib/api";
import { OpenDataRecord } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { monitors } from "@/lib/utils";
import { MultiSelect } from "./ui/multi-select";

type timeRange = "7d" | "3d" | "1d";
type indicator = Exclude<keyof OpenDataRecord, "monitor" | "datetime">;

const indicators: indicator[] = [
  "laeq",
  "lcfmax",
  "lceq",
  "la10",
  "lc10",
  "lafmax",
  "la90",
  "lc90",
];

const indicatorConfig = indicators.reduce(
  (acc: Record<indicator, { label: string }>, cur) => {
    acc[cur] = { label: cur.toUpperCase() };
    return acc;
  },
  {} as Record<indicator, { label: string }>
);

const monitorColorConfig = {
  "10.1.1.1": { label: "Noise 1", color: "hsl(var(--chart-1))" },
  "01749": { label: "Noise 2", color: "hsl(var(--chart-2))" },
  "01508": { label: "Noise 3", color: "hsl(var(--chart-3))" },
  "10118": { label: "Noise 4", color: "hsl(var(--chart-4))" },
  "01548": { label: "Noise 5", color: "hsl(var(--chart-5))" },
  "10115": { label: "Noise 6", color: "hsl(var(--chart-6))" },
  "10.1.1.7": { label: "Noise 7", color: "hsl(var(--chart-7))" },
  "01870": { label: "Noise 8", color: "hsl(var(--chart-8))" },
  "01575": { label: "Noise 9", color: "hsl(var(--chart-9))" },
  "01737": { label: "Noise 10", color: "hsl(var(--chart-10))" },
  "10.1.1.11": { label: "Noise 11", color: "hsl(var(--chart-11))" },
  "10.1.1.12": { label: "Noise 12", color: "hsl(var(--chart-12))" },
  "01550": { label: "Noise 13", color: "hsl(var(--chart-13))" },
  "01534": { label: "Noise 14", color: "hsl(var(--chart-14))" },
  "01535": { label: "Noise 15", color: "hsl(var(--chart-15))" },
  "01509": { label: "Noise 16", color: "hsl(var(--chart-16))" },
  "01529": { label: "Noise 17", color: "hsl(var(--chart-17))" },
  "01530": { label: "Noise 18", color: "hsl(var(--chart-18))" },
  "01528": { label: "Noise 19", color: "hsl(var(--chart-19))" },
} as const;

const chartConfig = {
  // visitors: {
  //   label: "Visitors",
  // },
  // desktop: {
  //   label: "Desktop",
  //   color: "hsl(var(--chart-1))",
  // },
  // mobile: {
  //   label: "Mobile",
  //   color: "hsl(var(--chart-2))",
  // },
  ...monitorColorConfig,
  ...indicatorConfig,
} satisfies ChartConfig;

export function AreaChartInteractive() {
  const [timeRange, setTimeRange] = useState<timeRange>("7d");
  const [indicator, setIndicator] = useState<indicator>("laeq");
  const [monitor, setMonitor] = useState<string[]>(["10.1.1.1"]);
  const [monitorToCache, setMonitorToCache] = useState<string>("10.1.1.1");

  const {
    data: chartDataRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chartDataRes", monitor],
    queryFn: () => fetchData({ monitor }),
    staleTime: 5 * 60 * 1000,
  });

  const filteredData = chartDataRes
    ?.filter((item) => {
      const datetime = new Date(item.datetime);
      const referenceDatetime = new Date(
        chartDataRes[chartDataRes.length - 1].datetime
      );

      let daysToSubtract = 7;
      if (timeRange === "3d") {
        daysToSubtract = 3;
      } else if (timeRange === "1d") {
        daysToSubtract = 1;
      }
      const startDatetime = new Date(referenceDatetime);
      startDatetime.setDate(startDatetime.getDate() - daysToSubtract);
      return datetime >= startDatetime;
    })
    .map((item) => ({
      monitor: item.monitor,
      datetime: dayjs(item.datetime).format("YYYY-MM-DD HH:mm:ss"),
      [indicator]: item[indicator],
    }));

  const mergeData = (
    data: typeof filteredData,
    monitors: string[],
    indicator: indicator
  ) => {
    const mergedMap = new Map();

    data &&
      data.forEach((item) => {
        const { datetime, monitor, ...rest } = item;
        const existingEntry = mergedMap.get(datetime) || { datetime };

        mergedMap.set(datetime, {
          ...existingEntry,
          [monitor]: rest[indicator],
        });
      });

    const result = Array.from(mergedMap.values())
      .map((entry) => {
        monitors.forEach((monitor) => {
          if (!(monitor in entry)) {
            entry[monitor] = null;
          }
        });
        return entry;
      })
      .sort((a, b) => a.datetime - b.datetime);

    return result;
  };

  console.log(
    "==========mergeData: =========",
    mergeData(filteredData, monitor, indicator)
  );

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Noise Data</CardTitle>
          <CardDescription>
            Showing noise data collected by Dublin city noise monitors
          </CardDescription>
        </div>
        <section className="flex gap-x-4">
          <MultiSelect
            options={monitors.map((monitor) => ({
              label: `${monitor.label} (${monitor.serial_number})`,
              value: monitor.serial_number,
            }))}
            defaultValue={monitor}
            placeholder="Select monitors"
            onValueChange={(value: string[]) => {
              setMonitor(value);
              const newSelected = findNewElement(monitor, value);
              newSelected && setMonitorToCache(newSelected);
            }}
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select monitors"
          />
          <Select
            value={indicator}
            onValueChange={(value) => setIndicator(value as indicator)}
          >
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select an indicator"
            >
              <SelectValue placeholder="LAEQ" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {indicators.map((indicator) => (
                <SelectItem
                  key={uuidv4()}
                  value={indicator}
                  className="rounded-lg"
                >
                  {indicator.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as timeRange)}
          >
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
              <SelectItem value="3d" className="rounded-lg">
                Last 3 days
              </SelectItem>
              <SelectItem value="1d" className="rounded-lg">
                Last 1 day
              </SelectItem>
            </SelectContent>
          </Select>
        </section>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {error && "Failed to fetch"}
        {isLoading && <Loader2 className="animate-spin" />}
        {chartDataRes && (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <ComposedChart
              accessibilityLayer
              data={mergeData(filteredData, monitor, indicator)}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="datetime"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      const date = dayjs(value);
                      return date.format("YYYY MMM DD (ddd) HH:mm:ss");
                    }}
                    indicator="dot"
                  />
                }
              />
              {(
                Object.keys(monitorColorConfig) as Array<
                  keyof typeof monitorColorConfig
                >
              ).map((key) => (
                <Line
                  key={uuidv4()}
                  dataKey={key}
                  type="natural"
                  stroke={chartConfig[key].color}
                  strokeWidth={1}
                  dot={false}
                />
              ))}
              {/* <Line
                dataKey="10.1.1.1"
                type="natural"
                stroke={chartConfig["10.1.1.1"].color}
                strokeWidth={1}
                dot={false}
              />
              <Line
                dataKey="01749"
                type="natural"
                stroke={`var(--color-desktop)`}
                strokeWidth={1}
                dot={false}
              /> */}
            </ComposedChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

const fetchData = async ({ monitor }: { monitor: string[] }) => {
  const endTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const startTime = dayjs(endTime)
    .subtract(7, "day")
    .format("YYYY-MM-DD HH:mm:ss");
  const promises = monitor.map((id) =>
    getOpenDataFromDb(id, startTime, endTime).then((res) => res?.body.json())
  );
  const results = await Promise.all(promises);
  return results.flat() as unknown as OpenDataRecord[];
};

const findNewElement = (oldArr: string[], newArr: string[]): string | null => {
  const monitorSet = new Set(oldArr);
  for (const item of newArr) {
    if (!monitorSet.has(item)) {
      return item;
    }
  }
  return null;
};
