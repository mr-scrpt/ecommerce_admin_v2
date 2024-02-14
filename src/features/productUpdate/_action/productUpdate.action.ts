"use server";
import { z } from "zod";

import {
  ProductEntity,
  productSchema,
  productUpdateSchema,
} from "@/entities/product";
import { updateProductUseCase } from "@/entities/product/server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { slugGenerator } from "@/shared/lib/slugGenerator";

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

  const session = await getAppSessionStrictServer();
  const slug = slugGenerator(data.name);

  const product = await updateProductUseCase.exec({
    session,
    productData: { ...data, slug },
    productId,
  });

  return resultSchema.parseAsync({
    product,
  });
};
