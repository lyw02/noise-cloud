"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <header className="flex justify-between items-center h-10 py-4 mx-8 w-auto">
      <span className="">Noise Cloud</span>
      <nav className="h-full">
        <ul className="flex h-full items-center justify-end gap-x-4">
          {routes.map((route) => (
            <li
              key={route.path}
              className={cn("hover:text-black transition", {
                "text-black": activePathname === route.path,
                "text-black/50": activePathname !== route.path,
              })}
            >
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
