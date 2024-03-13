import { getCartWithRelationAction } from "@/entities/cart/server";
import { NextResponse } from "next/server";
import { z } from "zod";

// interface IMetaCart {
//   params: {
//     userId: string;
//   };
// }

const metaSchema = z.object({
  id: z.string(),
});

export const GET = async (): Promise<NextResponse<any>> => {
  try {
    const cart = await getCartWithRelationAction();
    // const cart = await getCartWithRelationByUserIdUseCase.exec({
    //   userId: id,
    //   session,
    // });
    // const { productId } = reqSchema.parse(await req.json());
    // const {} = meta.params;
    // const { categoryList } = await getCategoryListAction();
    // const result = resultSchema.parse({ data: categoryList });

    return NextResponse.json(cart);
  } catch (e) {
    return NextResponse.json(e);
  }
};
