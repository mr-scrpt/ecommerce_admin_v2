"use server";
import { z } from "zod";

import { ProductEntity } from "@/entities/product";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { productSchema } from "@/entities/product/server";
import { removeProductComplexibleUseCase } from "../_useCase/instans.usecase";

const propsSchema = z.object({
  productId: z.string(),
});

const resultSchema = z.object({
  product: productSchema,
});

export const removeProductComplexibleAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ product: ProductEntity }> => {
  const { productId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const product = await removeProductComplexibleUseCase.exec({
    productId,
    session,
  });

  return resultSchema.parseAsync({
    product,
  });
};
