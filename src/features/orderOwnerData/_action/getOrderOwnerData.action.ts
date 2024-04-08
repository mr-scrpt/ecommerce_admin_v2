"use server";
import { z } from "zod";
import { getAppSessionStrictServer } from "../../../shared/session/getAppSessionServer";
import { orderOwnerDataSchema } from "../_domain/schema";
import { OrderOwnerData } from "../_domain/types";
import { getOrderOwnerDataComplexibleUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  orderId: z.string(),
});

const resultSchema = z.object({
  data: orderOwnerDataSchema,
});

type ResultT = { data: OrderOwnerData };

export const getOrderOwnerDataAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { orderId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const data = await getOrderOwnerDataComplexibleUseCase.exec({
    orderId,
    session,
  });

  return resultSchema.parseAsync({
    data,
  });
};
