import { staffBaseSchema } from "@/kernel/domain/staff/staff.schema";
import { z } from "zod";

export const staffUpdateSchema = staffBaseSchema.pick({
  name: true,
  email: true,
  phone: true,
  image: true,
});

export const staffSelectorSchema = z.object({
  id: z.string(),
});
