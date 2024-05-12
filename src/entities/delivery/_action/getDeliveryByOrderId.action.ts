"use server";
import { z } from "zod";
import { deliverySchema } from "../_domain/delivery.schema";
import { Delivery } from "../_domain/delivery.types";
import { getDeliveryByOrderIdUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  orderId: z.string(),
});

const resultSchema = z.object({
  delivery: deliverySchema,
});

type ResultT = { delivery: Delivery };

export const getDeliveryByOrderIdAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { orderId } = propsSchema.parse(props);
  const session = await SessionContainer.getStrict();

  const delivery = await getDeliveryByOrderIdUseCase.exec({
    orderId,
    session,
  });

  return resultSchema.parseAsync({
    delivery,
  });
};
