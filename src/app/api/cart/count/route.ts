import { cartRelationSchema } from "@/entities/cart/server";
import { cartChangeCountProductAction } from "@/features/cartChange/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const reqSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

const resultSchema = z.object({
  data: cartRelationSchema.nullable(),
  error: z.string().optional(),
});

export const POST = async (req: Request): Promise<NextResponse<any>> => {
  try {
    const { productId, quantity } = reqSchema.parse(await req.json());

    const { cart } = await cartChangeCountProductAction({
      data: {
        productId,
        quantity,
      },
    });

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
