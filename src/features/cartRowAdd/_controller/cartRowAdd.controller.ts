import { cartRelationSchema } from "@/entities/cart/server";
import {
  Controller,
  authorizedProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { addInputSchema } from "../_domain/input.schema";
import { CartRowAddService } from "../_service/cartRowAdd.service";

@injectable()
export class CartRowAddController extends Controller {
  constructor(private readonly addCartRowService: CartRowAddService) {
    super();
  }

  public router = router({
    cartRowAdd: {
      add: authorizedProcedure
        .input(addInputSchema)
        .mutation(async ({ input, ctx }) => {
          const { selector: cartRowData } = input;
          const { session } = ctx;
          const cartId = session.user.cartId;
          const result = await this.addCartRowService.execute({
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
