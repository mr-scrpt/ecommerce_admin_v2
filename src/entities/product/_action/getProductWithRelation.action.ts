"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { productSchema } from "../_domain/product.schema";
import { ProductEntity } from "../_domain/types";
import { getProductWithRelationUseCase } from "../_usecase/getProductWithRelation.usecase";

const getByIdSchema = z.object({
  productId: z.string(),
});

const resultSchema = z.object({
  product: productSchema,
});

type ResultT = { product: ProductEntity };

export const getProductWithRelationAction = async (
  props: z.infer<typeof getByIdSchema>,
): Promise<ResultT> => {
  const { productId } = getByIdSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const product = await getProductWithRelationUseCase.exec({
    session,
    productId,
  });
  console.log("output_log: with relation =>>>", product);

  return resultSchema.parseAsync({
    product: product,
  });
};
