"use server";
import { z } from "zod";
import { productSchema } from "../_domain/product.schema";
import { Product } from "../_domain/types";
import { getProductListByIdUseCase } from "../_usecase/instans.usecase";
import { SessionContainer } from "@/shared/session/instans";

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
  const session = await SessionContainer.getStrict();

  const productList = await getProductListByIdUseCase.exec({
    productListId,
    session,
  });

  return resultSchema.parseAsync({
    productList: productList,
  });
};
