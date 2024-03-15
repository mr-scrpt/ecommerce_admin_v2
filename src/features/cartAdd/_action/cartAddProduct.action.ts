"use server";

import { Cart } from "@/entities/cart";
import {
  cartAddProductSchema,
  cartRelationSchema,
} from "@/entities/cart/server";
import { z } from "zod";
import { addCartProductUseCase } from "../_usecase/cartAddProduct.usecase";
import { getAppSessionStrictServer } from "@/shared/session/server";

const propsSchema = z.object({
  data: cartAddProductSchema,
});

const resultSchema = z.object({
  cart: cartRelationSchema,
});

type ResultT = { cart: Cart };

export const cartAddProductAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const cart = await addCartProductUseCase.exec({
    dataToAddProduct: data,
    session,
  });

  return resultSchema.parseAsync({ cart });
};
