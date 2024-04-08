"use server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { productSchema } from "../_domain/product.schema";
import { Product } from "../_domain/types";
import { getProductListSearchUseCase } from "../_usecase/instans.usecase";

const propsSchema = z.object({
  q: z.string(),
});

const resultSchema = z.object({
  productList: z.array(productSchema),
});

type ResultT = { productList: Product[] };

export const getProductListSearchAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { q } = props;
  const session = await getAppSessionStrictServer();

  const productList = await getProductListSearchUseCase.exec({
    q,
    session,
  });
  console.log("output_log:  =>>>", productList);

  return resultSchema.parseAsync({
    productList: productList,
  });
};
