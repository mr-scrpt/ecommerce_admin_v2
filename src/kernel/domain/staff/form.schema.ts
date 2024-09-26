import { z } from "zod";
import { Staff } from "./staff.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Staff Option
export const staffDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  active: z.boolean().optional(),
});

export type StaffDefaultSelectOption = z.infer<
  typeof staffDefaultSelectOptionSchema
>;

// NOTE: Build Staff Option
export const buildStaffOption = (
  staff?: Staff | null,
): StaffDefaultSelectOption | null =>
  staff
    ? {
        value: staff.id,
        label: staff.name ?? "Name not filled",
        name: staff.name ?? "Name not filled",
        lastName: staff.lastName ?? "Last name not filled",
        phone: staff.phone,
      }
    : null;

export const buildStaffOptionsArray = (
  postOffice?: Array<Staff | null | undefined> | null,
): Array<StaffDefaultSelectOption> =>
  postOffice ? filterNullValues(postOffice.map(buildStaffOption)) : [];
