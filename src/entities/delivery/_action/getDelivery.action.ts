"use server";
import { z } from "zod";
import { deliverySchema } from "../_domain/delivery.schema";
import { Delivery } from "../_domain/delivery.types";
import { getDeliveryUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  deliveryId: z.string(),
});

const resultSchema = z.object({
  delivery: deliverySchema,
});

type ResultT = { delivery: Delivery };

export const getDeliveryAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { deliveryId } = propsSchema.parse(props);
  const session = await SessionContainer.getStrict();

  const delivery = await getDeliveryUseCase.exec({
    deliveryId,
    session,
  });

  return resultSchema.parseAsync({
    delivery,
  });
};
