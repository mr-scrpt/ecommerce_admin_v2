"use client";
import { ProfileAvatar, getProfileDisplayName } from "@/entities/user/profile";
import { SignInButton } from "@/features/Auth/SignInButton";
import { UseSignOut } from "@/features/Auth/_vm/useSignOut";
import { useAppSession } from "@/shared/session";
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
    return <Skeleton className="h-8 w-8 rounded-full" />;
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
          className="h-8 w-8 self-center rounded-full p-px"
        >
          <ProfileAvatar profile={user} className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 w-56 ">
        <DropdownMenuLabel>
          <p>My account</p>
          <p className="overflow-hidden text-ellipsis text-xs text-muted-foreground">
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
