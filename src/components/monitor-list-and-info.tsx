import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Monitor } from "@/lib/types";
import MonitorInfo from "./monitor-list-info";
import { Separator } from "./ui/separator";
import MonitorList from "./monitor-list";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface MonitorListAndInfoProps {
  monitor: Monitor | null;
  setMonitor: React.Dispatch<React.SetStateAction<Monitor | null>>;
}

export default function MonitorListAndInfo({
  monitor,
  setMonitor,
}: MonitorListAndInfoProps) {
  return (
    <Card className="w-full md:w-[40vw] h-[50vh]">
      <CardHeader>
        <CardTitle className="h-5 mb-3">
          {monitor ? (
            <span className="flex items-center">
              <Button variant="ghost" onClick={() => setMonitor(null)} className={cn("h-0", "hover:bg-none")}>
                <ChevronLeft />
              </Button>
              {`${monitor.label}`}
            </span>
          ) : (
            <span className="flex items-center">Hourly Average Noise</span>
          )}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="h-full">
        {monitor ? <MonitorInfo monitor={monitor} /> : <MonitorList />}
      </CardContent>
      <CardFooter className="h-0" />
    </Card>
  );
}
