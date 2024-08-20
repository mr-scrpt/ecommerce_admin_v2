import { categoryFormDefaultSchema } from "@/entities/category";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

export const categoryCreateFormSchema = categoryFormDefaultSchema.extend({
  propertyList: z.array(selectItemSchema(z.string())),
});

export type CategoryCreateFormValues = z.infer<typeof categoryCreateFormSchema>;
