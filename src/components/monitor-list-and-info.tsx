import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Monitor } from "@/lib/types";
import MonitorInfo from "./monitor-list-info";
import { Separator } from "./ui/separator";

interface MonitorListAndInfoProps {
  monitor: Monitor | null;
}

export default function MonitorListAndInfo({
  monitor,
}: MonitorListAndInfoProps) {
  return (
    <Card className="w-full md:w-[40vw]">
      <CardHeader>
        <CardTitle className="mb-3">{monitor ? `${monitor.label}` : "Monitor List"}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        {monitor ? <MonitorInfo monitor={monitor} /> : ""}
      </CardContent>
      <CardFooter className="h-0" />
    </Card>
  );
}
