"use server";
import { z } from "zod";
import { orderSchema } from "../_domain/order.schema";
import { Order } from "../_domain/order.types";
import { getOrderListUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const resultSchema = z.object({
  orderList: orderSchema.array(),
});

type ResultT = { orderList: Order[] };

export const getOrderListAction = async (): Promise<ResultT> => {
  const session = await SessionContainer.getStrict();

  const orderList = await getOrderListUseCase.exec({
    session,
  });

  return resultSchema.parseAsync({
    orderList,
  });
};
