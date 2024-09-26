import { z } from "zod";
import { User } from "./user.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select User Option
export const userDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  active: z.boolean().optional(),
});

export type UserDefaultSelectOption = z.infer<
  typeof userDefaultSelectOptionSchema
>;

// NOTE: Build User Option
export const buildUserOption = (
  user?: User | null,
): UserDefaultSelectOption | null =>
  user
    ? {
        value: user.id,
        label: user.name ?? "Name not filled",
        name: user.name ?? "Name not filled",
        lastName: user.lastName ?? "Last name not filled",
        phone: user.phone,
      }
    : null;

export const buildUserOptionsArray = (
  postOffice?: Array<User | null | undefined> | null,
): Array<UserDefaultSelectOption> =>
  postOffice ? filterNullValues(postOffice.map(buildUserOption)) : [];
