"use server";
import { getAppSessionStrictServer } from "@/kernel/lib/nextauth/server";
import { z } from "zod";
import { deliverySchema } from "../_domain/delivery.schema";
import { Delivery } from "../_domain/delivery.types";
import { getDeliveryListUseCase } from "../_usecase/instans.usecase";

const resultSchema = z.object({
  deliveryList: deliverySchema.array(),
});

type ResultT = { deliveryList: Delivery[] };

export const getDeliveryListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const deliveryList = await getDeliveryListUseCase.exec({
    session,
  });

  return resultSchema.parseAsync({
    deliveryList,
  });
};
