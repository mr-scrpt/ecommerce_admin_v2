"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { categorySchema } from "../_domain/category.schema";
import { CategoryEntity } from "../_domain/types";
import { getCategoryUseCase } from "../_usecase/getCategory.usecase";

const propsSchema = z.object({
  categoryId: z.string(),
});

const resultSchema = z.object({
  category: categorySchema,
});

type ResultT = { category: CategoryEntity };

export const getCategoryAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { categoryId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const category = await getCategoryUseCase.exec({
    session,
    categoryId,
  });

  return resultSchema.parseAsync({
    category: category,
  });
};
