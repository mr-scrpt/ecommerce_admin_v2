import { categoryBaseSchema } from "@/kernel/domain/category/category.schema";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

export const categoryCreateSchema = categoryBaseSchema.pick({
  name: true,
  board: true,
});
// .extend({
//   propertyList: z.array(selectItemSchema),
// });

export const categoryPropertySchema = z.object({
  propertyId: z.string(),
});
