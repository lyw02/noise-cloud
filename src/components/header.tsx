"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

const routes = [
  {
    name: "Data",
    path: "/",
  },
  {
    name: "Collect",
    path: "/collect",
  },
];

export default function Header() {
  const activePathname = usePathname();
  return (
    <header className="flex flex-col h-20 py-4 mx-8 w-auto">
      <div className="flex justify-between items-center">
        <span>Noise Cloud</span>
        <nav className="h-full">
          <ul className="flex h-full items-center justify-end gap-x-4">
            {routes.map((route, index) => (
              <li
                key={route.path}
                className={cn("flex h-5 items-center space-x-4 hover:text-black transition", {
                  "text-black": activePathname === route.path,
                  "text-black/50": activePathname !== route.path,
                })}
              >
                <Link href={route.path}>{route.name}</Link>
                {index < routes.length - 1 && <Separator orientation="vertical" />}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
