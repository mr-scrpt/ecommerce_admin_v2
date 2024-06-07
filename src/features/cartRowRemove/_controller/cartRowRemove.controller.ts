import { cartRelationSchema } from "@/entities/cart/server";
import {
  Controller,
  authorizedProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { removeInputSchema } from "../_domain/validator.schema";
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
          const { selector } = input;
          const { productId } = selector;
          const { session } = ctx;

          const cartId = session.user.cartId;

          const result = await this.removeCartRowService.execute({
            selector: { cartId, productId },
          });

          return cartRelationSchema.parse(result);
        }),
    },
  });
}
