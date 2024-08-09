// import { cartRelationSchema } from "@/entities/cart/server";
// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { appRouter } from "../../trpc/[trpc]/route";
// import { sharedRouter, t } from "@/kernel/lib/trpc/server";
//
// const reqSchema = z.object({
//   productId: z.string(),
// });
//
// const resultSchema = z.object({
//   data: cartRelationSchema.nullable(),
//   error: z.string().optional(),
// });
//
// const tRouter = t.mergeRouters(sharedRouter, ...appRouter);
// tRouter.createCaller(await createTRPCContext({} as any));
// export const POST = async (req: Request): Promise<NextResponse<any>> => {
//   try {
//     const { productId } = reqSchema.parse(await req.json());
//     //   productData: { id: productId },
//     // });
//     // const cart = cartRowAddAction({
//     //   productData: {
//     //     id: productId,
//     //   },
//     // });
//
//     // const { cart } = await cartRowAddAction({
//     //   data: {
//     //     productId,
//     //   },
//     // });
//
//     // const cart = await cartRowAdd({ productData: { id: productId } });
//
//     // return NextResponse.json({ data: cart });
//     return NextResponse.json({ data: {} });
//   } catch (e) {
//     if (e instanceof Error) {
//       return NextResponse.json(
//         resultSchema.parse({ data: null, error: e.message as string }),
//       );
//     }
//     return NextResponse.json(
//       resultSchema.parse({ data: null, error: "Something went wrong" }),
//     );
//   }
// };
