import { Profile } from "@/kernel/domain/profile/profile.type";

// NOTE: Queries
export type ProfileGetDTO = {
  id: string;
};

// NOTE: Mutations
export type ProfileUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<Profile>;
};
