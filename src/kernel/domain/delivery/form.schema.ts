import { z } from "zod";
import { DELIVERY_TYPE } from "./delivery.type";

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

// NOTE: Default Option
// export const deliveryTypeDefaultSelectOption: DeliveryTypeDefaultSelectOption =
//   {
//     value: "",
//     label: "Select Delivery type",
//     type: DELIVERY_TYPE.POST,
//   };
