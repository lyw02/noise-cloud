"use client";

import { FormEvent, useState } from "react";
import Button from "./live-noise-tab-btn";

export default function Form() {
  const [monitoring, setMonitoring] = useState<boolean>(false);
  const handleMonitor = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMonitoring((prev) => !prev);
  };
  return (
    <form onSubmit={handleMonitor}>
      <Button monitoring={monitoring} />
    </form>
  );
}
