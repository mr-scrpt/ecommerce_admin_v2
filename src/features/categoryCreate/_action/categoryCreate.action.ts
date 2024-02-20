"use server";

import { categoryCreateSchema, categorySchema } from "@/entities/category";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { z } from "zod";
import { createCategoryComplexibleUseCase } from "../_usecase/optionCreateComplexible.usecase";

const propsSchema = z.object({
  data: categoryCreateSchema,
});

const resultSchema = z.object({
  category: categorySchema,
});

export const categoryCreateAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { data } = propsSchema.parse(props);
  const { optionList, productList, ...categoryData } = data;

  const session = await getAppSessionStrictServer();
  const slug = slugGenerator(data.name);

  const category = await createCategoryComplexibleUseCase.exec({
    session,
    dataToCreate: {
      categoryData: {
        ...categoryData,
        slug,
      },

      optionListData: optionList,
      productListData: productList,
    },
  });

  return resultSchema.parseAsync({
    category,
  });
};
