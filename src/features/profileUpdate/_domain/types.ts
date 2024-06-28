import { ProfileUpdateDTO } from "@/kernel/domain/profile/profile.dto";
import { ProfileBase } from "@/kernel/domain/profile/profile.type";

type ProfileUpdatePayload = Partial<ProfileBase>;

export type ProfileUpdateTxPayload = {
  selector: ProfileUpdateSelector;
  profileData: ProfileUpdatePayload;
};

export type ProfileUpdateTxDTO = {
  selector: ProfileUpdateSelector;
  profileData: ProfileUpdateDTO["data"];
};

// NOTE: Selector
export type ProfileUpdateSelector = {
  id: string;
};
