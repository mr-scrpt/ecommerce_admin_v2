// export const profileBaseQueryKey = "profile";
import { UserEntity } from "./user.types";

export type ProfileEntity = UserEntity;

// NOTE: Projetions
export type Profile = {
  id: string;
  email: string;
  phone: string;
  name: string;
  image?: string | null;
};

// NOTE: Payload
export type ProfileUpdatePayload = Partial<Profile>;
