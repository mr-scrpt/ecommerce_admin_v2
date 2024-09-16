import { deliveryTypeDefaultSelectOptionSchema } from "@/kernel/domain/delivery/form.schema";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const deliveryFormDefaultSchema = z.object({
  deliveryType: deliveryTypeDefaultSelectOptionSchema.nullable(),
});

export type DeliveryFormDefaultValues<
  T extends z.ZodTypeAny = typeof deliveryFormDefaultSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const deliveryDefaultFieldsValues: DeliveryFormDefaultValues = {
  deliveryType: null,
};
