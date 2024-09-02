import { createOrderAbility } from "@/entities/order/server";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { OrderUpdateService } from "../_service/orderUpdate.service";

@injectable()
export class OrderUpdateController extends Controller {
  constructor(private readonly updateOrderService: OrderUpdateService) {
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
          const result = await this.updateOrderService.execute(input);

          return orderSchema.parse(result);
        }),
    },
    // orderCreateRow: {
    //   create: checkAbilityProcedure({
    //     create: createOrderAbility,
    //     check: (ability) => ability.canAddToOrder(),
    //   })
    //     .input(createRowInputSchema)
    //     .mutation(async ({ input }) => {
    //       const result = await this.createOrderRowService.execute(input);
    //       return orderSchema.parse(result);
    //     }),
    // },
  });
}
