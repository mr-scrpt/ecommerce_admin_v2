"use server";
import { CategoryEntity } from "@/entities/category/_domain/types";
import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { categorySchema } from "@/entities/category";
import { z } from "zod";
import { updateCategoryUseCase } from "@/entities/category/server";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { categoryUpdateSchema } from "@/entities/category/_domain/category.schema";

const propsSchema = z.object({
  categoryId: z.string(),
  data: categoryUpdateSchema,
});

const resultSchema = z.object({
  category: categorySchema,
});

export const updateCategoryAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<{ category: CategoryEntity }> => {
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
