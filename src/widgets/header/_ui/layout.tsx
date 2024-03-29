"use client";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/shared/ui/sheet";

// import { setCookie } from "cookies-next";
import { Menu } from "lucide-react";
export const Layout = ({
  logo,
  nav,
  profile,
  actions,
}: {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  profile?: React.ReactNode;
  actions?: React.ReactNode;
}) => {
  // console.log("output_log: set =>>>");
  // setCookie("test", "test");
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className=" mb-5 border-b pb-5">{logo}</SheetHeader>
              {nav}
            </SheetContent>
          </Sheet>
        </div>

        <div className="mr-4 hidden md:flex">{logo}</div>
        <div className="flex flex-1 items-center">
          <div className="hidden w-full md:flex">{nav}</div>
          <div className="flex flex-1 items-center justify-end space-x-3 ">
            {actions}
            {profile}
          </div>
        </div>
      </div>
    </header>
  );
};
