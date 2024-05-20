"use server";
import { z } from "zod";
import { cartRelationSchema } from "../_domain/cart.schema";
import { CartRelation } from "../_domain/types";
import { getAppSessionStrictServer } from "@/kernel/lib/nextauth/server";
import { getCartWithRelationUseCase } from "../_usecase/instans.usecase";

const resultSchema = z.object({
  cart: cartRelationSchema,
});

type ResultT = { cart: CartRelation };

export const getCartWithRelationAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const cart = await getCartWithRelationUseCase.exec({
    cartId: session.user.cartId,
    session,
  });

  return resultSchema.parseAsync({
    cart,
  });
};
