"use server";
import { z } from "zod";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";
import { orderOwnerDataSchema } from "../_domain/schema";
import { OrderOwnerData } from "../_domain/types";
import { getOwnerWithOrderListComplexibleUseCase } from "../_useCase/getOwnerWithOrderListComplexible.usecase";

const propsSchema = z.object({
  orderId: z.string(),
});

const resultSchema = z.object({
  data: orderOwnerDataSchema,
});

type ResultT = { data: OrderOwnerData };

export const getOwnerWithOrderListAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { orderId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const data = await getOwnerWithOrderListComplexibleUseCase.exec({
    orderId,
    session,
  });

  return resultSchema.parseAsync({
    data,
  });
};
