import { UserToUpdate } from "@/entities/user/user.server";

export type UserUpdateComplexible = {
  userId: string;
  userData: UserToUpdate;
};
