import { categoryFormDefaultSchema } from "@/entities/category";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

export const categoryUpdateFormSchema = categoryFormDefaultSchema.extend({
  propertyList: z.array(selectItemSchema),
});

export type CategoryUpdateFormValues = z.infer<typeof categoryUpdateFormSchema>;
