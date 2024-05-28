import { Profile, ProfileUpdateDTO } from "@/entities/user/profile";

export type ProfileUpdateTxPayload = Partial<Profile>;

export type ProfileUpdateTxDTO = {
  profileData: ProfileUpdateDTO;
};
