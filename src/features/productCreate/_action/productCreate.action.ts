"use server";

import {
  Product,
  productCreateSchema,
  productSchema,
} from "@/entities/product";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { z } from "zod";
import { createProductComplexibleUseCase } from "../_usecase/productCreateComplexible.usecase";

const propsSchema = z.object({
  data: productCreateSchema,
});

const resultSchema = z.object({
  product: productSchema,
});

type ResultT = { product: Product };

export const productCreateAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);
  const { categoryList, propertyItemListSelected, ...productData } = data;

  const session = await getAppSessionStrictServer();

  const slug = slugGenerator(data.name);

  const product = await createProductComplexibleUseCase.exec({
    session,
    dataToCreate: {
      productData: {
        ...productData,
        slug,
      },

      categoryListData: categoryList,
      propertyItemListSelected: propertyItemListSelected,
    },
  });

  return resultSchema.parseAsync({
    product,
  });
};
