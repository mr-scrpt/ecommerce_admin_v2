import { z } from "zod";
import { Profile } from "./profile.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Profile Option
export const profileDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  active: z.boolean().optional(),
});

export type ProfileDefaultSelectOption = z.infer<
  typeof profileDefaultSelectOptionSchema
>;

// NOTE: Build Profile Option
export const buildProfileOption = (
  profile?: Profile | null,
): ProfileDefaultSelectOption | null =>
  profile
    ? {
        value: profile.id,
        label: profile.name ?? "Name not filled",
        name: profile.name ?? "Name not filled",
        lastName: profile.lastName ?? "Last name not filled",
        phone: profile.phone,
      }
    : null;

export const buildProfileOptionsArray = (
  postOffice?: Array<Profile | null | undefined> | null,
): Array<ProfileDefaultSelectOption> =>
  postOffice ? filterNullValues(postOffice.map(buildProfileOption)) : [];
