import { z } from "zod";
import { DELIVERY_TYPE } from "./delivery.type";

// NOTE: Base Schema
export const deliveryTypeBaseSchema = z.object({
  type: z.nativeEnum(DELIVERY_TYPE),
});

// NOTE: Projections
export const deliveryTypeSchema = z.object({
  id: z.string(),
  ...deliveryTypeBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
// NOTE: UI
// NOTE: Select Settlement Option

export const selectDeliveryItemSchema = <T extends z.ZodTypeAny = z.ZodString>(
  valueSchema: T = z.string() as unknown as T,
) =>
  z.object({
    value: valueSchema,
    label: z.string(),
    active: z.boolean().optional(),
  });

const defaultDeliveryStringSchema = selectDeliveryItemSchema(
  z.nativeEnum(DELIVERY_TYPE),
);

export type SelectDeliveryOptionItem = z.infer<
  typeof defaultDeliveryStringSchema
>;

// NOTE: Default Option
export const deliveryTypeDefaultOption: SelectDeliveryOptionItem = {
  label: DELIVERY_TYPE.POST,
  value: DELIVERY_TYPE.POST,
};
