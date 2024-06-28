import { z } from "zod";
import { userRegistrationSchema } from "./schema";

export const registrationInputSchema = z.object({
  userData: userRegistrationSchema,
});
