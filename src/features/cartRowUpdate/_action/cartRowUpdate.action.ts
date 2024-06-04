"use server";

import { Cart } from "@/entities/cart";
import { cartRelationSchema } from "@/entities/cart/server";
import { z } from "zod";
import { updateQuantityCartRowUseCase } from "../_usecase/instans.usecase";
import { cartRowUpdateQuantitySchema } from "../_domain/schema";
import { SessionContainer } from "@/shared/session/instans";

const propsSchema = z.object({
  data: cartRowUpdateQuantitySchema,
});

const resultSchema = z.object({
  cart: cartRelationSchema,
});

type ResultT = { cart: Cart };

export const cartRowUpdateQuantityAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);

  const session = await SessionContainer.getStrict();

  const cart = await updateQuantityCartRowUseCase.exec({
    dataToUpdateCountProduct: data,
    session,
  });

  return resultSchema.parseAsync({ cart });
};
