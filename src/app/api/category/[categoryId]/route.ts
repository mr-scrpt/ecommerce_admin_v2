import { categorySchema } from "@/entities/category";
import { getCategoryByIdAction } from "@/entities/category/server";
import { NextResponse } from "next/server";
import { z } from "zod";

interface IMetaCategory {
  params: {
    categoryId: string;
  };
}

const paramsSchema = z.object({
  categoryId: z.string(),
});
const resultSchema = z.object({
  data: categorySchema,
});

export const GET = async (
  _: Request,
  meta: IMetaCategory,
): Promise<NextResponse<any>> => {
  try {
    const { categoryId } = paramsSchema.parse(meta.params);
    const { category } = await getCategoryByIdAction({ categoryId });
    const result = resultSchema.parse({ data: category });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
};
