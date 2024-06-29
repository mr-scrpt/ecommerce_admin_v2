import { categoryFormDefaultSchema } from "@/entities/category";
import { z } from "zod";

export const categoryCreateFormSchema = categoryFormDefaultSchema;

export type CategoryCreateFormValues = z.infer<typeof categoryCreateFormSchema>;
