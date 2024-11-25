"use client";

import { useState } from "react";
import Button from "@/components/open-data-tab-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monitors } from "@/lib/utils";
import { Dayjs } from "dayjs";
const dayjsFn: (args: any) => Dayjs = require("dayjs");
import * as dayjs from "dayjs";
import { z } from "zod";
import { OpenDataRecord } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

const datetimeFormat = "YYYY-MM-DD HH:mm:ss";
const datetimeSchema = z.string().refine(
  (s) => {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!regex.test(s)) return false;
    const date = new Date(s.replace(" ", "T"));
    return !isNaN(date.getTime());
  },
  {
    message: "Invalid Datetime format",
  }
);

type datetimeString = z.infer<typeof datetimeSchema> | "Invalid datetime";

export default function Form({
  setOpenDataRecord,
}: {
  setOpenDataRecord: React.Dispatch<
    React.SetStateAction<OpenDataRecord[] | undefined>
  >;
}) {
  const [monitor, setMonitor] = useState<string>("10.1.1.1");
  const [startTime, setStartTime] = useState<datetimeString>(
    dayjs.unix(Math.floor(Date.now() / 1000) - 86400).format(datetimeFormat)
  );
  const [endTime, setEndTime] = useState<datetimeString>(
    dayjs.unix(Math.floor(Date.now() / 1000)).format(datetimeFormat)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const fetchOpenData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const start = datetimeSchema.safeParse(startTime);
    const end = datetimeSchema.safeParse(endTime);
    try {
      if (start.success && end.success) {
        const res = await fetch(
          `open-api/data?username=dublincityapi&password=Xpa5vAQ9ki&monitor=${monitor}&start=${dayjsFn(
            start.data
          ).unix()}&end=${dayjsFn(end.data).unix()}`,
          {
            method: "POST",
          }
        );
        const json = await res.json();
        setOpenDataRecord(json as unknown as OpenDataRecord[]);
      } else {
        toast({ description: "Invalid datetime" });
        throw Error("Invalid datetime");
      }
    } catch (err: any) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleDatetimeString = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = datetimeSchema.safeParse(e.target.value);
    if (result.success) {
      return result.data;
    } else {
      return "Invalid datetime";
    }
  };

  return (
    <form onSubmit={fetchOpenData} className="flex flex-col gap-y-4">
      <span className="flex justify-start items-center">
        <Label htmlFor="monitor" className="w-1/6">
          Monitor serial number
        </Label>
        <Select
          name="monitor"
          value={monitor}
          onValueChange={(e) => setMonitor(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select monitor" />
          </SelectTrigger>
          <SelectContent>
            {monitors.map((monitor) => (
              <SelectItem
                key={uuidv4()}
                value={monitor.serial_number}
              >
                {monitor.serial_number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </span>
      <span className="flex justify-start items-center">
        <Label htmlFor="start" className="w-1/6">
          Start timestamp (s)
        </Label>
        <Input
          id="start"
          name="start"
          defaultValue={startTime}
          onChange={(e) => setStartTime(handleDatetimeString(e))}
          className="w-[180px]"
        />
        <small className="text-black/50 text-sm italic ml-4">
          {dayjsFn(startTime).unix() || (
            <span className="text-red-400">Invalid datetime</span>
          )}
        </small>
      </span>
      <span className="flex justify-start items-center">
        <Label htmlFor="end" className="w-1/6">
          End timestamp (s)
        </Label>
        <Input
          id="end"
          name="end"
          defaultValue={endTime}
          onChange={(e) => setEndTime(handleDatetimeString(e))}
          className="w-[180px]"
        />
        <small className="text-black/50 text-sm italic ml-4">
          {dayjsFn(endTime).unix() || (
            <span className="text-red-400">Invalid datetime</span>
          )}
        </small>
      </span>
      <Button isLoading={isLoading} />
    </form>
  );
}
