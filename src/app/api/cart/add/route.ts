import { cartRelationSchema } from "@/entities/cart/_domain/cart.schema";
import { cartAddProductAction } from "@/features/cartAdd/_action/cartAddProduct.action";
import { NextResponse } from "next/server";
import { z } from "zod";

const reqSchema = z.object({
  productId: z.string(),
});

const resultSchema = z.object({
  data: cartRelationSchema,
});

export const PUT = async (req: Request): Promise<NextResponse<any>> => {
  try {
    const { productId } = reqSchema.parse(await req.json());

    const { cart } = await cartAddProductAction({
      data: {
        productId,
        quantity: 1,
      },
    });

    return NextResponse.json(resultSchema.parse({ data: cart }));
  } catch (e) {
    return NextResponse.json(e);
  }
};
