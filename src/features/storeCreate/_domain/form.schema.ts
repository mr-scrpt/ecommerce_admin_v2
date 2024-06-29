import { storeFormDefaultSchema } from "@/entities/store";
import { z } from "zod";

export const storeCreateFormSchema = storeFormDefaultSchema;

export type StoreCreateFormValues = z.infer<typeof storeCreateFormSchema>;
