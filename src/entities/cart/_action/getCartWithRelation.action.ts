"use server";
import { getAppSessionStrictServer } from "@/entities/user/user.server";
import { z } from "zod";
import { cartRelationSchema } from "../_domain/cart.schema";
import { getCartWithRelationUseCase } from "../_usecase/getCartWithRelation.usecase";

const resultSchema = z.object({
  cart: cartRelationSchema,
});

// type ResultT = { cart: CartRelation };

export const getCartWithRelationAction = async (): Promise<any> => {
  const session = await getAppSessionStrictServer();

  const cart = await getCartWithRelationUseCase.exec({
    cartId: session.user.cartId,
    session,
  });

  return resultSchema.parseAsync({
    cart,
  });
};
