import { cartRelationSchema } from "@/entities/cart/server";
import {
  Controller,
  authorizedProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { CartRowCreateService } from "../_service/cartRowCreate.service";

@injectable()
export class CartRowCreateController extends Controller {
  constructor(private readonly createCartRowService: CartRowCreateService) {
    super();
  }

  public router = router({
    cartRowCreate: {
      create: authorizedProcedure
        .input(createInputSchema)
        .mutation(async ({ input, ctx }) => {
          const { cartRowData } = input;
          const { session } = ctx;

          const cartId = session.user.cartId;
          const result = await this.createCartRowService.execute({
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
