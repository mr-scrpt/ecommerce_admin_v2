"use server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { productRelationSchema } from "../_domain/product.schema";
import { ProductRelation } from "../_domain/types";
import { getProductWithRelationUseCase } from "../_usecase/getProductWithRelation.usecase";

const propsSchema = z.object({
  productId: z.string(),
});

const resultSchema = z.object({
  product: productRelationSchema,
});

type ResultT = { product: ProductRelation };

export const getProductWithRelationAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { productId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const product = await getProductWithRelationUseCase.exec({
    session,
    productId,
  });

  return resultSchema.parseAsync({
    product: product,
  });
};
