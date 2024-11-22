import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./live-noise-tab-form";

interface LiveNoiseTabProps {
  children: React.ReactNode;
}
export default function LiveNoiseTab({ children }: LiveNoiseTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Noise</CardTitle>
        <CardDescription>
          Use monitor to collect noise data. Automatically upload to AWS in
          real-time.
        </CardDescription>
      </CardHeader>
      <CardContent className={`w-full mt-8 flex justify-center`}>
        {children}
      </CardContent>
      <CardFooter>
        <Form />
      </CardFooter>
    </Card>
  );
}
