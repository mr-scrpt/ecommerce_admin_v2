import { createOrderAbility } from "@/entities/order/server";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { OrderStatusUpdateService } from "../_service/orderStatusUpdate.service";
import { orderSchema } from "@/entities/order";
import { updateInputSchema } from "../_domain/validator.schema";

@injectable()
export class OrderUpdateController extends Controller {
  constructor(private readonly updateOrderService: OrderStatusUpdateService) {
    super();
  }

  public router = router({
    orderUpdate: {
      updateStatus: checkAbilityProcedure({
        create: createOrderAbility,
        check: (ability) => ability.canUpdateOrder(),
      })
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          input.orderStatusData;
          const result = await this.updateOrderService.execute(input);

          return orderSchema.parse(result);
        }),
    },
  });
}
