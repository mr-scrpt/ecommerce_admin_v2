import { DeliveryType } from "@/kernel/domain/delivery/deliveryType.type";
import {
  DeliveryTypeDefaultSelectOption,
  deliveryTypeDefaultSelectOptionSchema,
} from "@/kernel/domain/delivery/form.schema";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const deliveryFormDefaultSchema = z.object({
  deliveryType: deliveryTypeDefaultSelectOptionSchema.nullable(),
});

export type DeliveryFormDefaultValues<
  T extends z.ZodTypeAny = typeof deliveryFormDefaultSchema,
> = z.infer<T>;

// NOTE: DefaultValues
export const deliveryDefaultFieldsValues: DeliveryFormDefaultValues = {
  deliveryType: null,
};

// NOTE: Build Delivery Type Option
export const buildDeliveryTypeOption = (
  deliveryType?: DeliveryType | null,
): DeliveryTypeDefaultSelectOption | null =>
  deliveryType
    ? {
        value: deliveryType.id,
        label: deliveryType.type,
        type: deliveryType.type,
      }
    : null;
