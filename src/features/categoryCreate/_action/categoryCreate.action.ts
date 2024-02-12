"use server";

import { getAppSessionStrictServer } from "@/entities/user/getAppSessionServer";
import { z } from "zod";
import {
  categoryCreateSchema,
  categorySchema,
} from "@/entities/category/_domain/category.schema";
import { createCategoryUseCase } from "@/entities/category/server";
import { slugGenerator } from "@/shared/lib/slugGenerator";

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

  const session = await getAppSessionStrictServer();
  const slug = slugGenerator(data.name);

  const category = await createCategoryUseCase.exec({
    session,
    categoryData: { ...data, slug },
  });

  return resultSchema.parseAsync({
    category,
  });
};
