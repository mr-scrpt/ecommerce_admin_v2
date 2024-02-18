"use server";

import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { productCreateSchema, productSchema } from "@/entities/product";
import { createProductUseCase } from "@/entities/product/server";
import { slugGenerator } from "@/shared/lib/slugGenerator";

const propsSchema = z.object({
  data: productCreateSchema,
});

const resultSchema = z.object({
  product: productSchema,
});

export const productCreateAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { data } = propsSchema.parse(props);
  console.log("output_log: productCreate  data =>>>", data);

  const session = await getAppSessionStrictServer();

  const slug = slugGenerator(data.name);

  const product = await createProductUseCase.exec({
    session,
    productData: { ...data, slug },
  });

  console.log("output_log: productCreate  product =>>>", product);

  return resultSchema.parseAsync({
    product,
  });
};
