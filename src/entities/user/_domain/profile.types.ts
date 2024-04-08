export const profileBaseQueryKey = "profile";
import { UserEntity } from "./user.types";

export type ProfileEntity = UserEntity;

// Projetions

export type Profile = {
  id: string;
  email: string;
  phone: string;
  name: string;
  image?: string | null;
};

export type ProfileToUpdate = Partial<Profile>;
