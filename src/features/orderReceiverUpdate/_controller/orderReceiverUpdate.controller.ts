import { createOrderAbility } from "@/entities/order/server";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { OrderReceiverUpdateService } from "../_service/orderReceiverUpdate.service";

@injectable()
export class OrderReceiverUpdateController extends Controller {
  constructor(
    private readonly updateOrderReceiverService: OrderReceiverUpdateService,
  ) {
    super();
  }

  public router = router({
    orderReceiverUpdate: {
      update: checkAbilityProcedure({
        create: createOrderAbility,
        check: (ability) => ability.canUpdateOrder(),
      })
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateOrderReceiverService.execute(input);

          return orderSchema.parse(result);
        }),
    },
  });
}
