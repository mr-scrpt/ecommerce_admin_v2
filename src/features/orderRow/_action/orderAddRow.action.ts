"use server";
import { z } from "zod";

import { Order, orderSchema } from "@/entities/order";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { orderRowAddSchema } from "../_domain/schema";
import { addOrderRowComplexibleUseCase } from "../_usecase/instans.usecase";

const propsSchema = z.object({
  orderId: z.string(),
  data: orderRowAddSchema,
});

const resultSchema = z.object({
  order: orderSchema,
});

type ResultT = { order: Order };

export const addOrderRowAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data, orderId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const order = await addOrderRowComplexibleUseCase.exec({
    session,
    dataToAdd: {
      orderId,
      productId: data.productId,
      quantity: data.quantity,
    },
  });

  return resultSchema.parseAsync({
    order,
  });
};
