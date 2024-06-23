"use server";
import { z } from "zod";
import { orderStatusGroupSchema } from "../_domain/order.schema";
import { getOrderStatusGroupUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

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
  const session = await SessionContainer.getStrict();

  const orderStatusGroup = await getOrderStatusGroupUseCase.exec({
    orderId,
    session,
  });

  return resultSchema.parseAsync({
    orderStatusGroup,
  });
};
