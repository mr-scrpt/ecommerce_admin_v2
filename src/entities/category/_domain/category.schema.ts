import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { z } from "zod";

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

export const categoryCreateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
  propertyList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export const categoryUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  board: z.array(z.string()),
  propertyList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  board: z.array(z.string()),
  propertyList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
