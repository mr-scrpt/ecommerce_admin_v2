"use server";

import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { categorySchema } from "@/entities/category/_domain/category.schema";
import { createCategoryUseCase } from "@/entities/category/server";

const propsSchema = z.object({
  data: categorySchema,
});

const resultSchema = z.object({
  category: categorySchema,
});

export const categoryCreateAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const category = await createCategoryUseCase.exec({
    session,
    categoryData: data,
  });

  return resultSchema.parseAsync({
    category,
  });
};
