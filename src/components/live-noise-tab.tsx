"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./live-noise-tab-form";
import NoiseDisplayer from "./noise-displayer";
import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@/components/ui/button";

interface LiveNoiseTabProps {
  children: React.ReactNode;
}
export default function LiveNoiseTab({ children }: LiveNoiseTabProps) {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const { user } = useAuthenticator((context) => [context.user]);
  const userId = user.signInDetails?.loginId;

  if (!userId) return "Unauthorized user";

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
        <NoiseDisplayer isMonitoring={isMonitoring} userId={userId} />
      </CardContent>
      <CardFooter>
        {/* <Form /> */}
        <Button onClick={() => setIsMonitoring((prev) => !prev)}>
          {isMonitoring ? "End monitoring" : "Start monitoring"}
        </Button>
      </CardFooter>
    </Card>
  );
}
