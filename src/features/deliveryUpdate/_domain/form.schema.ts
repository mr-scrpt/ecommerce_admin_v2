import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { addressDefaultSelectOptionSchema } from "@/kernel/domain/address/form.schema";
import { postOfficeDefaultSelectOptionSchema } from "@/kernel/domain/post/form.schema";
import { settlementDefaultSelectOptionSchema } from "@/kernel/domain/settlement/form.schema";
import { storeDefaultSelectOptionSchema } from "@/kernel/domain/store/form.schema";
import { z } from "zod";

export const deliveryUpdateFormSchema = deliveryFormDefaultSchema.extend({
  settlement: settlementDefaultSelectOptionSchema.nullable(),
  postOfficeList: z.array(postOfficeDefaultSelectOptionSchema),
  addressList: z.array(addressDefaultSelectOptionSchema),
  storeList: z.array(storeDefaultSelectOptionSchema),
});

export type DeliveryUpdateFormValues = z.infer<typeof deliveryUpdateFormSchema>;

// TODO: Default Form Values
export const deliveryUpdateFieldsValues: DeliveryUpdateFormValues = {
  deliveryType: null,

  settlement: null,
  postOfficeList: [],
  addressList: [],
  storeList: [],
};
