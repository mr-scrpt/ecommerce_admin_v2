import { createOrderAbility } from "@/entities/order/server";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { OrderRowUpdateService } from "../_service/orderUpdate.service";
import { orderSchema } from "@/entities/order";
import { updateInputSchema } from "../_domain/validator.schema";

@injectable()
export class OrderRowUpdateController extends Controller {
  constructor(private readonly updateOrderService: OrderRowUpdateService) {
    super();
  }

  public router = router({
    orderRowUpdate: {
      update: checkAbilityProcedure({
        create: createOrderAbility,
        check: (ability) => ability.canUpdateOrder(),
      })
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateOrderService.execute(input);

          return orderSchema.parse(result);
        }),
    },
  });
}
