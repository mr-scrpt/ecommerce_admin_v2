"use server";
import { z } from "zod";

import { OrderRow } from "@/entities/order";
import { orderRowSchema } from "@/entities/order/server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { changeOrderRowQuantityComplexibleUseCase } from "../_usecase/orderRowChangeQuantityComplexible.usecase";

const propsSchema = z.object({
  productId: z.string(),
  orderRowId: z.string(),
  quantity: z.number(),
});

const resultSchema = z.object({
  orderRow: orderRowSchema,
});

type ResultT = { orderRow: OrderRow };

export const changeOrdewRowQuantityAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { quantity, orderRowId, productId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const orderRow = await changeOrderRowQuantityComplexibleUseCase.exec({
    session,
    dataToUpdate: {
      productId,
      orderRowId,
      quantity,
    },
  });

  return resultSchema.parseAsync({
    orderRow,
  });
};
