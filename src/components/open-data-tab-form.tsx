"use client";

import { useState } from "react";
import Button from "@/components/open-data-tab-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Form() {
  const [monitor, setMonitor] = useState<string>("10.1.1.1");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchOpenData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // fetch
    setIsLoading(false);
  };

  return (
    <form onSubmit={fetchOpenData} className="flex flex-col gap-y-4">
      <span className="flex justify-between items-center">
        <Label htmlFor="monitor" className="w-1/6">
          Monitor serial number
        </Label>
        <Input
          id="monitor"
          name="monitor"
          value={monitor}
          onChange={(e) => setMonitor(e.target.value)}
        />
      </span>
      <span className="flex justify-between items-center">
        <Label htmlFor="start" className="w-1/6">
          Start timestamp (s)
        </Label>
        <Input
          id="start"
          name="start"
          defaultValue={Math.floor(Date.now() / 1000) - 86400}
        />
      </span>
      <span className="flex justify-between items-center">
        <Label htmlFor="end" className="w-1/6">
          End timestamp (s)
        </Label>
        <Input
          id="end"
          name="end"
          defaultValue={Math.floor(Date.now() / 1000)}
          // className="flex-grow flex-shrink"
        />
      </span>
      <br />
      <Button />
    </form>
  );
}
