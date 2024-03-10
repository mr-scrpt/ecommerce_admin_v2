"use server";

import { Cart } from "@/entities/cart";
import { cartChangeCountProductSchema } from "@/entities/cart/_domain/cart.schema";
import { cartRelationSchema } from "@/entities/cart/server";
import { getAppSessionStrictServer } from "@/entities/user/user.server";
import { z } from "zod";
import { changeCountCartProductUseCase } from "../_usecase/cartChangeCountProduct.usecase";

const propsSchema = z.object({
  data: cartChangeCountProductSchema,
});

const resultSchema = z.object({
  cart: cartRelationSchema,
});

type ResultT = { cart: Cart };

export const cartChangeCountProductAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const cart = await changeCountCartProductUseCase.exec({
    dataToChangeCountProduct: data,
    session,
  });

  return resultSchema.parseAsync({ cart });
};
