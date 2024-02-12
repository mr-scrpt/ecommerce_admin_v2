"use server";
import { CategoryEntity } from "@/entities/category/_domain/types";
import { categorySchema } from "@/entities/category";
import { z } from "zod";
import { removeCategoryComplexibleUseCase } from "../_useCase/removeCategoryComplexible.usecase";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";

const propsSchema = z.object({
  categoryId: z.string(),
});

const resultSchema = z.object({
  category: categorySchema,
});

export const removeCategoryComplexibleAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ category: CategoryEntity }> => {
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
