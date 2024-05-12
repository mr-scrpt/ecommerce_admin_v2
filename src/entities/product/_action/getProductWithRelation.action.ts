"use server";
import { z } from "zod";
import { productRelationSchema } from "../_domain/product.schema";
import { ProductRelation } from "../_domain/types";
import { getProductWithRelationUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

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

  const session = await SessionContainer.getStrict();

  const product = await getProductWithRelationUseCase.exec({
    session,
    productId,
  });

  return resultSchema.parseAsync({
    product: product,
  });
};
