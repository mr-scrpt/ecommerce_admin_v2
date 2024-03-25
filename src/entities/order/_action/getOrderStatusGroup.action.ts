"use server";
import { getAppSessionStrictServer } from "@/shared/session/server";
import { z } from "zod";
import { orderStatusGroupSchema } from "../_domain/order.schema";
import { OrderStatusGroup } from "../_domain/order.types";
import { getOrderStatusGroupUseCase } from "../_usecase/getOrderStatusGroup.usecase";

const propsSchema = z.object({
  orderId: z.string(),
});

const resultSchema = z.object({
  orderStatusGroup: orderStatusGroupSchema,
});

type ResultT = { orderStatusGroup: OrderStatusGroup };

export const getOrderStatusGroupAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { orderId } = props;
  const session = await getAppSessionStrictServer();

  const orderStatusGroup = await getOrderStatusGroupUseCase.exec({
    orderId,
    session,
  });

  return resultSchema.parseAsync({
    orderStatusGroup,
  });
};
