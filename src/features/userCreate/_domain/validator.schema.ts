import { z } from "zod";
import { userCreateSchema, userRegistrationSchema } from "./schema";

export const registrationInputSchema = z.object({
  userData: userRegistrationSchema,
});

export const createInputSchema = z.object({
  userData: userCreateSchema,
});
