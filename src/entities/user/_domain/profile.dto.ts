import { Profile } from "./profile.types";

// NOTE: Queries
export type ProfileGetDTO = {
  profileId: string;
};

// NOTE: Mutations
export type ProfileUpdateDTO = Partial<Profile>;
