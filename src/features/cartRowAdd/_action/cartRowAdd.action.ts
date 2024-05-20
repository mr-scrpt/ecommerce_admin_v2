"use server";

import { Cart } from "@/entities/cart";
import { cartRelationSchema } from "@/entities/cart/server";
import { z } from "zod";
import { getAppSessionStrictServer } from "@/kernel/lib/nextauth/server";
import { addCartRowUseCase } from "../_usecase/instans.usecase";
import { cartRowAddSchema } from "../_domain/schema";

const propsSchema = z.object({
  data: cartRowAddSchema,
});

const resultSchema = z.object({
  cart: cartRelationSchema,
});

type ResultT = { cart: Cart };

export const cartRowAddAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const cart = await addCartRowUseCase.exec({
    dataToAddProduct: data,
    session,
  });

  return resultSchema.parseAsync({ cart });
};
