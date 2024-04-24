import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { z } from "zod";

export const storeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),
});

export const storeRelationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),

  productList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      img: z.array(z.string()),
      createdAt: z.date(),
    }),
  ),
  propertyList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      datatype: z.nativeEnum(PropertyDataTypeEnum),
    }),
  ),
});
