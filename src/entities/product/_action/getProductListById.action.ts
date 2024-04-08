"use server";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { z } from "zod";
import { productSchema } from "../_domain/product.schema";
import { Product } from "../_domain/types";
import { getProductListByIdUseCase } from "../_usecase/instans.usecase";

const propsSchema = z.object({
  productListId: z.array(z.string()),
});

const resultSchema = z.object({
  productList: z.array(productSchema),
});

type ResultT = { productList: Product[] };

export const getProductListByIdAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { productListId } = props;
  console.log("output_log:  3_ getProductListByIdAction =>>>", productListId);
  const session = await getAppSessionStrictServer();

  const productList = await getProductListByIdUseCase.exec({
    productListId,
    session,
  });

  return resultSchema.parseAsync({
    productList: productList,
  });
};
