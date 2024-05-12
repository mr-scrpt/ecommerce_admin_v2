"use server";

import { Cart } from "@/entities/cart";
import { cartRelationSchema } from "@/entities/cart/server";
import { z } from "zod";
import { cartRowRemoveSchema } from "../_domain/schema";
import { SessionContainer } from "@/shared/session/instans";
import { removeCartRowUseCase } from "../_usecase/instans.usecase";

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

  const session = await SessionContainer.getStrict();

  const cart = await removeCartRowUseCase.exec({
    dataToRemoveProduct: data,
    session,
  });

  return resultSchema.parseAsync({ cart });
};
