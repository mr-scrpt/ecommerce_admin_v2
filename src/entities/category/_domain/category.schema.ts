import { PropertyDataTypeEnum } from "@/kernel/domain/property.type";
import { z } from "zod";

// NOTE: Side
const productItemSchema = z.object({
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

  productList: z.array(productItemSchema),
  propertyList: z.array(propertyListItemSchema),
});
