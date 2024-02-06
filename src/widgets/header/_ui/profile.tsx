"use client";
import { ProfileAvatar, getProfileDisplayName } from "@/entities/user/profile";
import { useAppSession, useRole } from "@/entities/user/session";
import { SignInButton } from "@/features/Auth/SignInButton";
import { UseSignOut } from "@/features/Auth/vm/useSignOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Skeleton } from "@/shared/ui/skeleton";
import { LogOut as IconLogOut } from "lucide-react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface ProfileProps extends HTMLAttributes<HTMLDivElement> {}

export const Profile: FC<ProfileProps> = (props) => {
  const { data, status } = useAppSession();
  const { signOut, isPending: isLoadingSignOut } = UseSignOut();

  if (status === "loading") {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  if (status === "unauthenticated") {
    return <SignInButton />;
  }
  const user = data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8"
        >
          <ProfileAvatar profile={user} className="w-8 h-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>My account</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {user ? getProfileDisplayName(user) : undefined}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user?.id}`}>
              {/* <User className="mr-2 h-4 w-4" /> */}
              <span>Profile</span>
              {/* </Link> */}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoadingSignOut}
            onClick={() => signOut()}
          >
            <IconLogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};