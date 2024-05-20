"use server";

import { Cart } from "@/entities/cart";
import { cartRelationSchema } from "@/entities/cart/server";
import { z } from "zod";
import { getAppSessionStrictServer } from "@/kernel/lib/nextauth/server";
import { changeQuantityCartRowUseCase } from "../_usecase/instans.usecase";
import { cartRowChangeQuantitySchema } from "../_domain/schema";

const propsSchema = z.object({
  data: cartRowChangeQuantitySchema,
});

const resultSchema = z.object({
  cart: cartRelationSchema,
});

type ResultT = { cart: Cart };

export const cartRowChangeQuantityAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const cart = await changeQuantityCartRowUseCase.exec({
    dataToChangeCountProduct: data,
    session,
  });

  return resultSchema.parseAsync({ cart });
};
