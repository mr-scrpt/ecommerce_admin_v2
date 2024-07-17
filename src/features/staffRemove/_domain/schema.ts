import { staffSchema } from "@/kernel/domain/staff/staff.schema";
import { z } from "zod";

export const staffSelectorSchema = z.object({
  id: z.string(),
});

export const staffRemoveSchema = staffSchema.pick({
  id: true,
  name: true,
  email: true,
  phone: true,
});
