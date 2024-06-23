// export const profileBaseQueryKey = "profile";

import { UserEntity } from "@/kernel/domain/user/user.type";

export type ProfileEntity = UserEntity;

// NOTE: Projetions
export type Profile = {
  id: string;
  email: string;
  phone: string;
  name: string;
  image?: string | null;
  createdAt: Date;
};

// NOTE: Payload
export type ProfileUpdatePayload = Partial<Profile>;
