"use client";
import { IconLogo } from "@/shared/ui/icons/logo";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="flex items-center space-x-2" href="/">
      <IconLogo className="h-6 w-6" />
      <span className="inline-block font-bold">Trade Mark</span>
    </Link>
  );
}
