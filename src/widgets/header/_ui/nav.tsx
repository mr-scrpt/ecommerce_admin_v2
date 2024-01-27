"use client";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface NavProps extends HTMLAttributes<HTMLDivElement> {}

export const Nav: FC<NavProps> = (props) => {
  return (
    <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
      <Link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/categories"
      >
        Categories
      </Link>
      <Link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/billboards"
      >
        Billboards
      </Link>
      <Link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/products"
      >
        Products
      </Link>
    </nav>
  );
};
