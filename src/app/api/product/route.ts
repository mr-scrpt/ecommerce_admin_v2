import { productSchema } from "@/entities/product";
import { getProductListAction } from "@/entities/product/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const resultSchema = z.object({
  data: z.array(productSchema),
});

export const GET = async (): Promise<NextResponse<any>> => {
  try {
    const { productList } = await getProductListAction();
    const result = resultSchema.parse({ data: productList });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
};
