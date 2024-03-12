"use server";
import { z } from "zod";

import {
  ProductEntity,
  productSchema,
  productUpdateSchema,
} from "@/entities/product";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { updateProductComplexibleUseCase } from "../_usecase/updateProductComplexible.usecase";

const propsSchema = z.object({
  productId: z.string(),
  data: productUpdateSchema,
});

const resultSchema = z.object({
  product: productSchema,
});

export const updateProductAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ product: ProductEntity }> => {
  const { productId, data } = propsSchema.parse(props);
  const { propertyItemListSelected, categoryList, ...productData } = data;

  const session = await getAppSessionStrictServer();
  console.log("output_log:  =>>>", session.user);
  const slug = slugGenerator(data.name);

  const product = await updateProductComplexibleUseCase.exec({
    session,
    dataToUpdate: {
      productId,
      productData: { ...productData, slug },
      propertyItemListSelected,
      categoryListId: categoryList,
    },
  });

  return resultSchema.parseAsync({
    product,
  });
};
