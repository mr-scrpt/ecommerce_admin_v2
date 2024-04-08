"use server";
import { z } from "zod";

import { ProductEntity } from "@/entities/product";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { productSchema } from "@/entities/product/server";
import { updateProductComplexibleUseCase } from "../_usecase/instans.usecase";
import { productUpdateSchema } from "../_domain/schema";

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
  const { categoryList, propertyItemListSelected, ...productData } = data;

  const session = await getAppSessionStrictServer();
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
