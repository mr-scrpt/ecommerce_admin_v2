import {
  Controller,
  authorizedProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { cartRelationSchema } from "../_domain/cart.schema";
import { CartRelationGetService } from "../_service/cartGet.service";

@injectable()
export class CartController extends Controller {
  constructor(private readonly getCartService: CartRelationGetService) {
    super();
  }

  public router = router({
    cart: {
      getRelation: authorizedProcedure.query(async ({ ctx }) => {
        const { session } = ctx;
        const cartId = session.user.cartId;

        const result = await this.getCartService.execute({
          id: cartId,
        });

        return cartRelationSchema.parse(result);
      }),
    },
  });
}
