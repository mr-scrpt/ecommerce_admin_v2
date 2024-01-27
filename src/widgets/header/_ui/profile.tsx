"use client";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
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
import { LogOut as IconLogOut } from "lucide-react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface ProfileProps extends HTMLAttributes<HTMLDivElement> {}

export const Profile: FC<ProfileProps> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8"
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            Paromov
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            {/* <Link href={`/profile/${session.data?.user.id}`}> */}
            {/* <User className="mr-2 h-4 w-4" /> */}
            <span>Профиль</span>
            {/* </Link> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => signOut.signOut()}> */}
          {/*   <IconLogOut className="mr-2 h-4 w-4" /> */}
          {/*   <span>Выход</span> */}
          {/* </DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
