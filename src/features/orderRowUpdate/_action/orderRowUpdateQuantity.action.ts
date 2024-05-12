"use server";
import { z } from "zod";

import { OrderRow } from "@/entities/order";
import { orderRowSchema } from "@/entities/order/server";
import { updateOrderRowQuantityComplexibleUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  productId: z.string(),
  orderRowId: z.string(),
  quantity: z.number(),
});

const resultSchema = z.object({
  orderRow: orderRowSchema,
});

type ResultT = { orderRow: OrderRow };

export const updateOrdewRowQuantityAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { quantity, orderRowId, productId } = propsSchema.parse(props);

  const session = await SessionContainer.getStrict();

  const orderRow = await updateOrderRowQuantityComplexibleUseCase.exec({
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
