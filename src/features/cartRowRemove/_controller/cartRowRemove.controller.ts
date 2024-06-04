import { cartRelationSchema } from "@/entities/cart/server";
import {
  Controller,
  authorizedProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { removeInputSchema } from "../_domain/input.schema";
import { CartRowRemoveService } from "../_service/cartRowRemove.service";

@injectable()
export class CartRowRemoveController extends Controller {
  constructor(private readonly removeCartRowService: CartRowRemoveService) {
    super();
  }

  public router = router({
    cartRowRemove: {
      remove: authorizedProcedure
        .input(removeInputSchema)
        .mutation(async ({ input, ctx }) => {
          const { cartRowData } = input;
          const { session } = ctx;

          const cartId = session.user.cartId;

          const result = await this.removeCartRowService.execute({
            cartData: {
              cartId,
            },
            cartRowData,
          });

          return cartRelationSchema.parse(result);
        }),
    },
  });
}
