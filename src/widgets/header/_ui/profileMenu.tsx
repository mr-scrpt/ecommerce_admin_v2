"use client";
import { ProfilePresentation } from "@/entities/profile";
import { AuthPresentation } from "@/features/Auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { FC, HTMLAttributes } from "react";

interface ProfileProps extends HTMLAttributes<HTMLDivElement> {}

export const ProfileMenu: FC<ProfileProps> = () => {
  return (
    <ProfilePresentation.DataSession>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <ProfilePresentation.Avatar className="h-8 w-8" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 w-56 ">
          <DropdownMenuLabel>
            <span>My account</span>
            <span className="overflow-hidden text-ellipsis text-xs text-muted-foreground">
              <ProfilePresentation.UserName />
            </span>
          </DropdownMenuLabel>
          <DropdownMenuGroup></DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <ProfilePresentation.LinkToProfile textAnchor="Profile" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AuthPresentation.ButtonLogOut />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ProfilePresentation.DataSession>
  );
};
