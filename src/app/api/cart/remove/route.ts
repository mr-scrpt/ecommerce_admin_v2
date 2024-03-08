import { cartRelationSchema } from "@/entities/cart/_domain/cart.schema";
import { cartRemoveProductAction } from "@/features/cartRemove/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const reqSchema = z.object({
  productId: z.string(),
});

const resultSchema = z.object({
  data: cartRelationSchema.nullable(),
  error: z.string().optional(),
});

export const PUT = async (req: Request): Promise<NextResponse<any>> => {
  try {
    const { productId } = reqSchema.parse(await req.json());

    const { cart } = await cartRemoveProductAction({
      data: {
        productId,
      },
    });

    console.log("output_log:  =>>>", cart);

    return NextResponse.json(resultSchema.parse({ data: cart }));
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        resultSchema.parse({ data: null, error: e.message as string }),
      );
    }
    return NextResponse.json(
      resultSchema.parse({ data: null, error: "Something went wrong" }),
    );
  }
};
