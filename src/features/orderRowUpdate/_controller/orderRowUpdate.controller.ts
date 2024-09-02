import { createOrderAbility } from "@/entities/order/server";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { OrderRowUpdateService } from "../_service/orderRowUpdate.service";

@injectable()
export class OrderRowUpdateController extends Controller {
  constructor(private readonly updateOrderRowService: OrderRowUpdateService) {
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
          const result = await this.updateOrderRowService.execute(input);

          return orderSchema.parse(result);
        }),
    },
  });
}
