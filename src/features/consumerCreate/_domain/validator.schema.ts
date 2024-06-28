import { z } from "zod";
import { consumerCreateSchema, consumerRegistrationSchema } from "./schema";

export const registrationInputSchema = z.object({
  consumerData: consumerRegistrationSchema,
});

export const createInputSchema = z.object({
  consumerData: consumerCreateSchema,
});
