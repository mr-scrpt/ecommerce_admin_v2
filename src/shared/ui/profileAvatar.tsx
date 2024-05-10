import { FC, HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "./utils";
import { getProfileLetters } from "../lib/getProfileLetters";

interface ProfileAvatarProps extends HTMLAttributes<HTMLDivElement> {
  avatarName: string;
  avatarUrl?: string;
}

export const ProfileAvatar: FC<ProfileAvatarProps> = (props) => {
  const { avatarName, avatarUrl, className } = props;
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatarUrl ?? ""} className="object-cover" />
      <AvatarFallback>{getProfileLetters(avatarName)}</AvatarFallback>
    </Avatar>
  );
};
