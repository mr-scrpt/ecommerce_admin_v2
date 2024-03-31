"use server";
import { getAppSessionStrictServer } from "@/shared/session/server";
import { z } from "zod";
import { getOrderOwnerUseCase } from "../_usecase/getOrderOwner.usecase";

const propsSchema = z.object({
  orderId: z.string(),
});

const resultSchema = z.object({
  ownerId: z.string(),
});

type ResultT = { ownerId: string };

export const getOrderOwnerAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { orderId } = props;
  console.log("output_log: orderId =>>>", orderId);
  const session = await getAppSessionStrictServer();

  const { ownerId } = await getOrderOwnerUseCase.exec({
    orderId,
    session,
  });
  console.log("output_log:  =>>>", ownerId);

  const result = resultSchema.parseAsync({
    ownerId,
  });

  return result;
};
