import { ProfileToUpdate } from "@/entities/user/profile.server";

export type ProfileUpdateComplexible = {
  profileId: string;
  profileData: ProfileToUpdate;
};
