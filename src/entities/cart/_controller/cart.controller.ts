import { Controller } from "@/kernel/lib/trpc/_controller";
import { publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { cartRelationSchema } from "../_domain/cart.schema";
import { CartGetService } from "../_service/CartGet.service";

@injectable()
export class CartController extends Controller {
  constructor(private readonly getCartService: CartGetService) {
    super();
  }

  public router = router({
    cart: {
      getWithRelation: publicProcedure
        .output(cartRelationSchema)
        .query(async ({ _, ctx }) => {
          const { session } = ctx;
          const cartId = session?.user.cartId;
          if (!cartId) {
            throw new Error("Cart not found");
          }
          return this.getCartService.execute({
            cartId,
          });
        }),
    },
  });
}
