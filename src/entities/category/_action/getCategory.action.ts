"use server";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import { categorySchema } from "../_domain/category.schema";
import { CategoryEntity } from "../_domain/types";
import { getCategoryUseCase } from "../_usecase/getCategory.usecase";
import { getCategoryBySlugUseCase } from "../_usecase/getCategoryBySlug.usecase";

const getByIdSchema = z.object({
  categoryId: z.string(),
});

const resultSchema = z.object({
  category: categorySchema,
});

type ResultT = { category: CategoryEntity };

export const getCategoryAction = async (
  props: z.infer<typeof getByIdSchema>,
): Promise<ResultT> => {
  const { categoryId } = getByIdSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const category = await getCategoryUseCase.exec({
    session,
    categoryId,
  });

  return resultSchema.parseAsync({
    category: category,
  });
};

const getBySlugSchema = z.object({
  categorySlug: z.string(),
});

export const getCategoryBySlugAction = async (
  props: z.infer<typeof getBySlugSchema>,
): Promise<ResultT> => {
  const { categorySlug } = getBySlugSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const category = await getCategoryBySlugUseCase.exec({
    session,
    categorySlug,
  });

  return resultSchema.parseAsync({
    category: category,
  });
};
