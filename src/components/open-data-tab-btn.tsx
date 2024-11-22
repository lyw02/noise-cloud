"use client";

import { useFormStatus } from "react-dom";
import { Button as SnButton } from "./ui/button";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <SnButton type="submit">{pending ? "Loading..." : "Search data"}</SnButton>
  );
}
