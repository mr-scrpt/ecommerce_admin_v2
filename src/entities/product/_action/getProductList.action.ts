"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { productSchema } from "../_domain/product.schema";
import { ProductEntity } from "../_domain/types";
import { getProductListUseCase } from "../_usecase/getProductList.usecase";

const resultSchema = z.object({
  productList: z.array(productSchema),
});

type ResultT = { productList: ProductEntity[] };

export const getProductListAction = async (): Promise<ResultT> => {
  const session = await getAppSessionStrictServer();

  const productList = await getProductListUseCase.exec({
    session,
  });

  return resultSchema.parseAsync({
    productList: productList,
  });
};
