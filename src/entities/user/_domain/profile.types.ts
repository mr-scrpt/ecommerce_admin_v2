export const profileBaseQueryKey = "profile";
import { UserEntity } from "./user.types";

export type ProfileEntity = UserEntity;

// Projetions

export type Profile = {
  email: string;
  name?: string | null;
  image?: string | null;
};
