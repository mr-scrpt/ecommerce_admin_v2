"use server";
import { z } from "zod";

import { Category, categorySchema } from "@/entities/category";
import { getAppSessionStrictServer } from "@/shared/session/getAppSessionServer";
import { removeCategoryComplexibleUseCase } from "../_useCase/categoryRemoveComplexible.usecase";

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
  console.log("output_log: removeCategoryComplexibleAction  =>>>", categoryId);

  const session = await getAppSessionStrictServer();

  const category = await removeCategoryComplexibleUseCase.exec({
    categoryId,
    session,
  });

  return resultSchema.parseAsync({
    category,
  });
};
