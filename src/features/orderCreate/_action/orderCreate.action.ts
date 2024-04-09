"use server";
import { z } from "zod";

import { Order } from "@/entities/order";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { orderCreateSchema } from "../_domain/schema";
import { createOrderComplexibleUseCase } from "../_usecase/instans.usecase";
import { orderSchema } from "@/entities/order/server";

const propsSchema = z.object({
  userId: z.string(),
  data: orderCreateSchema,
});

const resultSchema = z.object({
  order: orderSchema,
});

type ResultT = { order: Order };

export const createOrderAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { userId, data } = propsSchema.parse(props);
  const { orderStatus, paymentStatus, orderRowData } = data;

  const session = await getAppSessionStrictServer();

  const order = await createOrderComplexibleUseCase.exec({
    session,
    dataToCreate: {
      userId,
      orderStatus,
      paymentStatus,
      orderRowData,
    },
  });

  return resultSchema.parseAsync({
    order,
  });
};
