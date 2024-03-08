import { categorySchema } from "@/entities/category";
import { getCategoryListAction } from "@/entities/category/server";
import { getAppSessionStrictServer } from "@/entities/user/user.server";
import { cartAddProductAction } from "@/features/cartAdd/_action/cartAddProduct.action";
import { addProductCartUseCase } from "@/features/cartAdd/server";
import { NextResponse } from "next/server";
import { z } from "zod";

// interface IMetaCart {
//   params: {
//     userId: string;
//   };
// }

interface IBodyCart {
  productId: string;
}

const metaSchema = z.object({
  userId: z.string(),
});

const reqSchema = z.object({
  productId: z.string(),
});

const resultSchema = z.object({
  data: z.array(categorySchema),
});

export const PUT = async (
  req: Request,
  // meta: IMetaCart,
): Promise<NextResponse<any>> => {
  try {
    const { productId } = reqSchema.parse(await req.json());

    const cart = await cartAddProductAction({
      data: {
        productId,
        quantity: 1,
      },
    });
    console.log("output_log: cart in api =>>>", cart);

    // const cart = await addProductCartUseCase.exec({
    //   dataToAddProduct: {
    //     productId,
    //     quantity: 1,
    //   },
    //   session,
    // });

    return NextResponse.json(cart);
  } catch (e) {
    return NextResponse.json(e);
  }
};
