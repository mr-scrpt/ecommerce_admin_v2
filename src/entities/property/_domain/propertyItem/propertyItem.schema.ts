import { z } from "zod";

// NOTE: Base
export const propertyItemBaseSchema = z.object({
  name: z.string(),
  value: z.string(),
  createdAt: z.date(),
});

// NOTE: Main
export const propertyItemSchema = z.object({
  id: z.string(),
  ...propertyItemBaseSchema.shape,
});

// export const propertyItemCreateSchema = z.object({
//   name: z.string(),
//   value: z.string(),
// });

export const propertyItemCreateSchema = propertyItemBaseSchema.omit({
  createdAt: true,
});

// export const propertyItemUpdateSchema = z.object({
//   id: z.string().optional(),
//   name: z.string(),
//   value: z.string(),
// });

export const propertyItemUpdateSchema = propertyItemBaseSchema
  .omit({
    createdAt: true,
  })
  .extend({
    id: z.string().optional(),
  });
