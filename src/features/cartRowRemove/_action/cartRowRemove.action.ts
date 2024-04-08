"use server";

import { Cart } from "@/entities/cart";
import { cartRelationSchema } from "@/entities/cart/server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { cartRowRemoveSchema } from "../_domain/schema";
import { removeCartProductUseCase } from "../_usecase/cartRowRemove.usecase";

const propsSchema = z.object({
  data: cartRowRemoveSchema,
});

const resultSchema = z.object({
  cart: cartRelationSchema,
});

type ResultT = { cart: Cart };

export const cartRowRemoveAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const cart = await removeCartProductUseCase.exec({
    dataToRemoveProduct: data,
    session,
  });

  return resultSchema.parseAsync({ cart });
};
