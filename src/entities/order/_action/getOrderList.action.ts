"use server";
import { getAppSessionStrictServer } from "@/shared/session/server";
import { z } from "zod";
import { orderSchema } from "../_domain/order.schema";
import { Order } from "../_domain/order.types";
import { getOrderListUseCase } from "../_usecase/getOrderList.usecase";

const resultSchema = z.object({
  orderList: orderSchema.array(),
});

type ResultT = { orderList: Order[] };

export const getOrderListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const orderList = await getOrderListUseCase.exec({
    session,
  });
  console.log("output_log:  list=>>>", orderList);

  return resultSchema.parseAsync({
    orderList,
  });
};
