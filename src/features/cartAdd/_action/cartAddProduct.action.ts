"use server";

import { Cart, cartSchema } from "@/entities/cart";
import { cartAddProductSchema } from "@/entities/cart/_domain/cart.schema";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { addProductCartUseCase } from "../_usecase/cartAddProduct.usecase";

const propsSchema = z.object({
  data: cartAddProductSchema,
});

const resultSchema = z.object({
  cart: cartSchema,
});

type ResultT = { cart: Cart };

export const cartAddProductAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);

  // TODO: What Session?
  const session = await getAppSessionStrictServer();

  const cart = await addProductCartUseCase.exec({
    session,
    dataToAddProduct: data,
  });

  return resultSchema.parseAsync({
    cart,
  });
};
