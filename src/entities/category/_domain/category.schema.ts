import { PropertyDataTypeEnum } from "@/kernel/domain/property.enum";
import { z } from "zod";

// NOTE: Side
const productListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  img: z.array(z.string()),
  createdAt: z.date(),
});

const propertyListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
});

// NOTE: Base
export const categoryBaseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),
});

// NOTE: Main
export const categorySchema = z.object({
  id: z.string(),
  ...categoryBaseSchema.shape,
});

export const categoryRelationSchema = z.object({
  id: z.string(),
  ...categoryBaseSchema.shape,

  productList: z.array(productListItemSchema),
  propertyList: z.array(propertyListItemSchema),
});
