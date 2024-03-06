"use client";
import { cn } from "@/shared/ui/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useMenu } from "../_model/useMenu";

interface NavProps extends HTMLAttributes<HTMLDivElement> {}

export const Nav: FC<NavProps> = (props) => {
  const pathname = usePathname();

  const menu = useMenu();
  return (
    <nav className="flex flex-col justify-center gap-6 text-sm font-medium md:flex-row md:items-center">
      {menu.map((item) => (
        <Link
          key={item.href}
          className={cn(
            "text-center text-foreground/60 transition-colors hover:text-foreground/80",
            item.href === pathname
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
