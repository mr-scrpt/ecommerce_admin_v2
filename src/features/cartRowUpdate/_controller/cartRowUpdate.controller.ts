import { cartRelationSchema } from "@/entities/cart/server";
import {
  Controller,
  authorizedProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/input.schema";
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
          const { cartRowData } = input;
          const { session } = ctx;

          const cartId = session.user.cartId;

          const result = await this.updateCartRowService.execute({
            cartRowData: {
              ...cartRowData,
              cartId,
            },
          });

          return cartRelationSchema.parse(result);
        }),
    },
  });
}
