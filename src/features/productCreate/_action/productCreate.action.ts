"use server";

import { Product } from "@/entities/product";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { z } from "zod";
import { productSchema } from "@/entities/product/server";
import { createProductComplexibleUseCase } from "../_usecase/instans.usecase";
import { productCreateSchema } from "../_domain/schema";
import { SessionContainer } from "@/shared/session/instans";

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

  const session = await SessionContainer.getStrict();

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
