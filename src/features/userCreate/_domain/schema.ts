import { userBaseSchema } from "@/kernel/domain/user/user.schema";

export const userRegistrationSchema = userBaseSchema.pick({
  name: true,
  email: true,
  phone: true,
});
