import { z } from "zod";
import { DELIVERY_TYPE } from "./delivery.type";
import { DeliveryType } from "./deliveryType.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Delivery Type Option
export const deliveryTypeDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  type: z.nativeEnum(DELIVERY_TYPE),
  active: z.boolean().optional(),
});

export type DeliveryTypeDefaultSelectOption = z.infer<
  typeof deliveryTypeDefaultSelectOptionSchema
>;

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

export const buildDeliveryTypeOptionsArray = (
  deliveryList?: Array<DeliveryType | null | undefined> | null,
): DeliveryTypeDefaultSelectOption[] =>
  deliveryList
    ? filterNullValues(deliveryList.map(buildDeliveryTypeOption))
    : [];
