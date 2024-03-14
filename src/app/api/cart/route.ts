import {
  cartRelationSchema,
  getCartWithRelationAction,
} from "@/entities/cart/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const resultSchema = z.object({
  data: cartRelationSchema.nullable(),
  error: z.string().optional(),
});

export const GET = async (): Promise<NextResponse<any>> => {
  try {
    const { cart } = await getCartWithRelationAction();

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
