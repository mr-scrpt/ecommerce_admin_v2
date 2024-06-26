"use server";
import { z } from "zod";

import { Category } from "@/entities/category";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { updateCategoryComplexibleUseCase } from "../_usecase/instans.usecase";
import { categoryUpdateSchema } from "../_domain/schema";
import { categorySchema } from "@/entities/category/server";

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
  const { propertyList, ...categoryData } = data;

  const session = await getAppSessionStrictServer();
  const slug = slugGenerator(data.name);

  const category = await updateCategoryComplexibleUseCase.exec({
    session,
    dataToUpdate: {
      categoryId,
      categoryData: { ...categoryData, slug },
      propertyListData: propertyList,
    },
  });

  return resultSchema.parseAsync({
    category,
  });
};
