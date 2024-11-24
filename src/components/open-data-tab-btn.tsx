"use client";

import { Button as SnButton } from "./ui/button";
import {Loader2} from "lucide-react"

export default function Button({ isLoading }: { isLoading: boolean }) {
  return (
    <SnButton type="submit">
      {isLoading ? <Loader2 className="animate-spin" /> : "Search data"}
    </SnButton>
  );
}
