import { cartRelationSchema } from "@/entities/cart/server";
import {
  Controller,
  authorizedProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { CartRowUpdateService } from "../_service/cartRowUpdate.service";

@injectable()
export class CartRowUpdateController extends Controller {
  constructor(private readonly updateCartRowService: CartRowUpdateService) {
    super();
  }

  public router = router({
    cartRowUpdate: {
      update: authorizedProcedure
        .input(updateInputSchema)
        .mutation(async ({ input, ctx }) => {
          const { selector, cartRowData } = input;
          const { productId } = selector;
          const { session } = ctx;

          const cartId = session.user.cartId;

          const result = await this.updateCartRowService.execute({
            selector: { cartId, productId },
            cartRowData,
          });

          return cartRelationSchema.parse(result);
        }),
    },
  });
}
