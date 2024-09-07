import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { deliveryTypeDefaultOption } from "@/kernel/domain/delivery/deliveryType.schema";
import { postTypeDefaultOption } from "@/kernel/domain/post/post.schema";
import {
  settlementDefaultOption,
  selectSettlementItemSchema,
} from "@/kernel/domain/settlement/settlement.schema";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

export const deliveryUpdateFormDefaultSchema = deliveryFormDefaultSchema.extend(
  {
    settlement: selectSettlementItemSchema,
    postOfficeList: z.array(selectItemSchema(z.string())),
  },
);

export type DeliveryUpdateFormDefaultValues = z.infer<
  typeof deliveryUpdateFormDefaultSchema
>;

// TODO: DefaultValues
export const defaultFieldsValues: DeliveryUpdateFormDefaultValues = {
  deliveryType: deliveryTypeDefaultOption,
  settlement: settlementDefaultOption,
  postOfficeList: [postTypeDefaultOption],
};
