"use server";

import {
  Category,
  categoryCreateSchema,
  categorySchema,
} from "@/entities/category";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { z } from "zod";
import { createCategoryComplexibleUseCase } from "../_usecase/categoryCreateComplexible.usecase";

const propsSchema = z.object({
  data: categoryCreateSchema,
});

const resultSchema = z.object({
  category: categorySchema,
});

type ResultT = { category: Category };

export const categoryCreateAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { data } = propsSchema.parse(props);
  const { optionList, ...categoryData } = data;

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
    },
  });

  return resultSchema.parseAsync({
    category,
  });
};
