import { categoryFormSchema } from "@/entities/category";
import { z } from "zod";

export const categoryCreateFormSchema = categoryFormSchema;

export type CategoryCreateFormValues = z.infer<typeof categoryCreateFormSchema>;
