import { addressFormDefaultSchema } from "@/entities/address";
import { z } from "zod";

export const addressCreateFormSchema = addressFormDefaultSchema;

export type AddressCreateFormValues = z.infer<typeof addressCreateFormSchema>;
