import { FC, HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { cn } from "@/shared/ui/utils";
import { getProfileLetters } from "../_vm/getProfileLetters";
import { Profile } from "../_domain/profile.types";

interface ProfileAvatarProps extends HTMLAttributes<HTMLDivElement> {
  profile?: Profile;
}

export const ProfileAvatar: FC<ProfileAvatarProps> = (props) => {
  const { profile, className } = props;
  if (!profile) {
    return null;
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={profile.image ?? ""} className="object-cover" />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>
    </Avatar>
  );
};
