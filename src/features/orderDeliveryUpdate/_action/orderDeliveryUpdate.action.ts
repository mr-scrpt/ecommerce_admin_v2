"use server";

import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { orderDeliveryUpdateSchema } from "../_domain/schema";
import { updateOrderDeliveryUseCase } from "../_useCase/instans.usecase";
import { deliverySchema } from "@/entities/delivery/server";
import { Delivery } from "@/entities/delivery";

const propsSchema = z.object({
  deliveryId: z.string(),
  data: orderDeliveryUpdateSchema,
});

const resultSchema = z.object({
  delivery: deliverySchema,
});

export const updateOrderDeliveryAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ delivery: Delivery }> => {
  const { deliveryId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const delivery = await updateOrderDeliveryUseCase.exec({
    session,
    deliveryData: data,
    deliveryId,
  });

  return resultSchema.parseAsync({
    delivery,
  });
};
