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
  optionList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
    }),
  ),
});

export const categoryCreateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
  // productList: z.array(
  //   z.object({
  //     id: z.string(),
  //   }),
  // ),
  optionList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export const categoryUpdateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
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
  optionList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
