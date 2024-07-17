import { staffFormDefaultSchema } from "@/entities/staff";
import { z } from "zod";

export const staffUpdateFormSchema = z.object({
  ...staffFormDefaultSchema.shape,
});

export type StaffUpdateFormValues = z.infer<typeof staffUpdateFormSchema>;
