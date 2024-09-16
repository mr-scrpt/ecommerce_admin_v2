import { deliveryFormDefaultSchema } from "@/entities/delivery";
import {
  // postOfficeDefaultSelectOption,
  postOfficeDefaultSelectOptionSchema,
} from "@/kernel/domain/post/form.schema";
import {
  // receiverDefaultSelectOption,
  receiverDefaultSelectOptionSchema,
} from "@/kernel/domain/receiver/form.schema";
import {
  // settlementDefaultSelectOption,
  settlementDefaultSelectOptionSchema,
} from "@/kernel/domain/settlement/form.schema";
import { z } from "zod";

export const deliveryUpdateFormDefaultSchema = deliveryFormDefaultSchema.extend(
  {
    settlement: settlementDefaultSelectOptionSchema.nullable(),
    postOfficeList: z.array(postOfficeDefaultSelectOptionSchema).nullable(),
    receiverList: z.array(receiverDefaultSelectOptionSchema).nullable(),
  },
);

export type DeliveryUpdateFormDefaultValues = z.infer<
  typeof deliveryUpdateFormDefaultSchema
>;

// TODO: Default Form Values
export const deliveryUpdateDefaultFieldsValues: DeliveryUpdateFormDefaultValues =
  {
    deliveryType: null,

    settlement: null,
    postOfficeList: [],
    receiverList: [],
  };
