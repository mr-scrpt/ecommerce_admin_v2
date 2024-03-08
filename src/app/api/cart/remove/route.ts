import { cartRelationSchema } from "@/entities/cart/_domain/cart.schema";
import { cartRemoveProductAction } from "@/features/cartRemove/server";
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

    const { cart } = await cartRemoveProductAction({
      data: {
        productId,
        quantity: 1,
      },
    });

    console.log("output_log:  =>>>", cart);

    return NextResponse.json(resultSchema.parse({ data: cart }));
  } catch (e) {
    return NextResponse.json(e);
  }
};
