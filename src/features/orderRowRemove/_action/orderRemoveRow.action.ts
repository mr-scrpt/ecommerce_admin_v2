"use server";
import { z } from "zod";

import { Order, orderSchema } from "@/entities/order";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { removeOrderRowComplexibleUseCase } from "../_usecase/orderRemoveRowComplexible.usecase";

const propsSchema = z.object({
  orderRowId: z.string(),
});

const resultSchema = z.object({
  order: orderSchema,
});

type ResultT = { order: Order };

export const removeOrderRowAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { orderRowId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const order = await removeOrderRowComplexibleUseCase.exec({
    session,
    dataToRemove: {
      orderRowId,
    },
  });

  return resultSchema.parseAsync({
    order,
  });
};
