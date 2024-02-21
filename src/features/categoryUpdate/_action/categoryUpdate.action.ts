"use server";
import { z } from "zod";

import {
  Category,
  categorySchema,
  categoryUpdateSchema,
} from "@/entities/category";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { slugGenerator } from "@/shared/lib/slugGenerator";

const propsSchema = z.object({
  categoryId: z.string(),
  data: categoryUpdateSchema,
});

const resultSchema = z.object({
  category: categorySchema,
});

type ResultT = { category: Category };

export const updateCategoryAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { categoryId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();
  const slug = slugGenerator(data.name);

  const category = await updateCategoryUseCase.exec({
    session,
    categoryData: { ...data, slug },
    categoryId,
  });

  return resultSchema.parseAsync({
    category,
  });
};
