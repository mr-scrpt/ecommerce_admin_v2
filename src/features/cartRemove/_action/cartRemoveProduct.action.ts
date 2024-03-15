"use server";

import { Cart } from "@/entities/cart";
import {
  cartRelationSchema,
  cartRemoveProductSchema,
} from "@/entities/cart/server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { removeCartProductUseCase } from "../_usecase/cartRemoveProduct.usecase";

const propsSchema = z.object({
  data: cartRemoveProductSchema,
});

const resultSchema = z.object({
  cart: cartRelationSchema,
});

type ResultT = { cart: Cart };

export const cartRemoveProductAction = async (
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
