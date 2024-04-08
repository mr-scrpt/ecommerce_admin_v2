"use server";
import { z } from "zod";

import { Category } from "@/entities/category";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { removeCategoryComplexibleUseCase } from "../_useCase/instans.usecase";
import { categorySchema } from "@/entities/category/server";

const propsSchema = z.object({
  categoryId: z.string(),
});

const resultSchema = z.object({
  category: categorySchema,
});

type ResultT = { category: Category };

export const removeCategoryComplexibleAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { categoryId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const category = await removeCategoryComplexibleUseCase.exec({
    categoryId,
    session,
  });

  return resultSchema.parseAsync({
    category,
  });
};
