"use server";
import { z } from "zod";

import { Order, orderSchema, orderUpdateSchema } from "@/entities/order";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { updateOrderComplexibleUseCase } from "../_usecase/orderUpdateComplexible.usecase";

const propsSchema = z.object({
  orderId: z.string(),
  data: orderUpdateSchema,
});

const resultSchema = z.object({
  order: orderSchema,
});

type ResultT = { order: Order };

export const updateOrderAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { orderId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const order = await updateOrderComplexibleUseCase.exec({
    session,
    dataToUpdate: {
      orderId,
      orderData: data,
    },
  });

  return resultSchema.parseAsync({
    order,
  });
};
