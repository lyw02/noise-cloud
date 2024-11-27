"use client";

import { cn, stringToColorHash } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { v4 as uuidv4 } from "uuid";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { Terminal } from "lucide-react"

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

  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const userId = user.signInDetails?.loginId;

  if (!userId) return "Unauthorized user";

  const handleClick = async () => {
    signOut();
  };

  return (
    <header className="flex flex-col h-20 py-4 mx-8 w-auto">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-x-2"><Terminal /><b>Noise Cloud</b></span>
        <nav className="flex justify-end gap-x-4 h-full">
          <ul className="flex justify-end gap-x-4 h-full items-center">
            {routes.map((route, index) => (
              <li
                key={uuidv4()}
                className={cn(
                  "flex h-5 items-center space-x-4 hover:text-black transition",
                  {
                    "text-black": activePathname === route.path,
                    "text-black/50": activePathname !== route.path,
                  }
                )}
              >
                <Link href={route.path}>{route.name}</Link>
                {index < routes.length - 1 && (
                  <Separator orientation="vertical" />
                )}
              </li>
            ))}
          </ul>
          <HoverCard openDelay={0}>
            <HoverCardTrigger>
              <Avatar>
                <AvatarFallback
                  style={{
                    backgroundColor: `#${stringToColorHash(
                      userId
                    ).bgColor.slice(5, -1)}`,
                    color:
                      stringToColorHash(userId).textColor === "text-black"
                        ? "#000"
                        : "#FFF",
                  }}
                  className="select-none cursor-pointer"
                >
                  L
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between items-center space-x-4">
                <h4 className="text-sm font-semibold">{userId}</h4>
                <p className="text-sm">
                  <Button variant="destructive" onClick={handleClick}>
                    Sign out
                  </Button>
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </nav>
      </div>
    </header>
  );
}
