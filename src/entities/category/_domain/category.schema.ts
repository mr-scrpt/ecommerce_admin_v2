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

// NOTE: Main
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),
});

export const categoryRelationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),

  productList: z.array(productListItemSchema),
  propertyList: z.array(propertyListItemSchema),
});
