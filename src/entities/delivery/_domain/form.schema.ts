import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { deliveryTypeDefaultOption } from "@/kernel/domain/delivery/deliveryType.schema";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const deliveryFormDefaultSchema = z.object({
  deliveryType: selectItemSchema(z.nativeEnum(DELIVERY_TYPE)),
});

export type DeliveryFormDefaultValues = z.infer<
  typeof deliveryFormDefaultSchema
>;

// TODO: DefaultValues
export const defaultFieldsValues: DeliveryFormDefaultValues = {
  deliveryType: deliveryTypeDefaultOption,
};
