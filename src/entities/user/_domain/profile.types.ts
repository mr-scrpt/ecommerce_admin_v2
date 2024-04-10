export const profileBaseQueryKey = "profile";
import { UserDummyEntity, UserEntity } from "./user.types";

export type ProfileEntity = UserEntity;
export type ProfileDummyEntity = UserDummyEntity;

// Projetions

export type Profile = {
  id: string;
  email: string;
  phone: string;
  name: string;
  image?: string | null;
};

export type ProfileDummy = {
  id: string;
  email: string;
  phone: string | null;
  name: string | null;
  image?: string | null;
};

export type ProfileToUpdate = Partial<Profile>;
