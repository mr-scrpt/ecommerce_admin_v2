import { z } from "zod";
import { propertyRelationSchema } from "./property.schema";
import { propertySchema } from "@/kernel/domain/property/property.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByCategoryInputSchema = z.object({
  categoryId: z.string(),
});

export const getByCategoryListInputSchema = z.object({
  categoryIdList: z.array(z.object({ categoryId: z.string() })),
});

export const getListOutputSchema = z.array(propertySchema);
export const getListRelationOutputSchema = z.array(propertyRelationSchema);
