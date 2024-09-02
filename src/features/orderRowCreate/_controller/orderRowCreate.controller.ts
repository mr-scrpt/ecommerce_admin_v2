import { createOrderAbility } from "@/entities/order/server";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { OrderRowCreateService } from "../_service/orderRowCreate.service";

@injectable()
export class OrderRowCreateController extends Controller {
  constructor(private readonly createOrederRowService: OrderRowCreateService) {
    super();
  }

  public router = router({
    orderRowCreate: {
      create: checkAbilityProcedure({
        create: createOrderAbility,
        check: (ability) => ability.canAddToOrder(),
      })
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          console.log("Order row create", input);
          const result = await this.createOrederRowService.execute(input);
          return orderSchema.parse(result);
        }),
    },
  });
}

// public router = router({
//   orderRowCreate: {
//     create: checkAbilityProcedure({
//       create: createOrderAbility,
//       check: (ability) => ability.canAddToOrder(),
//     })
//       .input(createInputSchema)
//       .mutation(async ({ input }) => {
//         const result = await this.createOrederRowService.execute(input);
//         return orderSchema.parse(result);
//       }),
//   },
// });
