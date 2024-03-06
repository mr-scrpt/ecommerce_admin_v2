import { categorySchema } from "@/entities/category";
import { getCategoryListAction } from "@/entities/category/server";
import { NextResponse } from "next/server";
import { z } from "zod";

interface IMetaCart {
  params: {
    userId: string;
  };
}

interface IBodyCart {
  productId: string;
}

const reqSchema = z.object({
  productId: z.string(),
});

const metaSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  data: z.array(categorySchema),
});

export const PUT = async (
  req: Request,
  meta: IMetaCart,
): Promise<NextResponse<any>> => {
  try {
    const { userId } = metaSchema.parse(meta.params);
    const { productId } = reqSchema.parse(await req.json());
    // const {} = meta.params;
    // const { categoryList } = await getCategoryListAction();
    // const result = resultSchema.parse({ data: categoryList });

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json(e);
  }
};
