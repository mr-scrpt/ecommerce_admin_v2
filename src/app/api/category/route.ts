import { categorySchema } from "@/entities/category";
import {
  getCategoryListAction,
  getCategoryListApi,
} from "@/entities/category/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const resultSchema = z.object({
  data: z.array(categorySchema),
});

export const GET = async (): Promise<NextResponse<any>> => {
  try {
    // const categoryList = await getCategoryListApi();
    const { categoryList } = await getCategoryListAction();
    const result = resultSchema.parse({ data: categoryList });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
};
