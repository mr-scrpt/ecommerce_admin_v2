import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { z } from "zod";

export const storeBaseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),
});

export const storeSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
});
