import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { cartRelationSchema } from "../_domain/cart.schema";
import { CartGetService } from "../_service/cartGet.service";

@injectable()
export class CartController extends Controller {
  constructor(private readonly getCartService: CartGetService) {
    super();
  }

  public router = router({
    cart: {
      getWithRelation: publicProcedure.query(async ({ ctx }) => {
        const { session } = ctx;
        const cartId = session?.user.cartId;

        // TODO: Add error handling
        if (!cartId) {
          throw new Error("Cart not found");
        }

        const result = await this.getCartService.execute({
          cartId,
        });

        return cartRelationSchema.parse(result);
      }),
    },
  });
}
