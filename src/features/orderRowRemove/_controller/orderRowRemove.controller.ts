import { createOrderAbility } from "@/entities/order/server";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { removeInputSchema } from "../_domain/validator.schema";
import { OrderRowRemoveService } from "../_service/orderRemove.service";
import { orderSchema } from "@/kernel/domain/order/order.schema";

@injectable()
export class OrderRowRemoveController extends Controller {
  constructor(private readonly removeOrderService: OrderRowRemoveService) {
    super();
  }

  public router = router({
    orderRowRemove: {
      remove: checkAbilityProcedure({
        create: createOrderAbility,
        check: (ability) => ability.canRemoveOrder(),
      })
        .input(removeInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.removeOrderService.execute(input);

          return orderSchema.parse(result);
        }),
    },
  });
}
