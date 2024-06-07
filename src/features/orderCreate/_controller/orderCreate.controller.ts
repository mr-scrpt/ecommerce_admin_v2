import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createEmptyInputSchema } from "../_domain/validator.schema";
import { OrderEmptyCreateService } from "../_service/orderCreateEmpty.service";
import { orderSchema } from "@/entities/order";

@injectable()
export class OrderCreateController extends Controller {
  constructor(
    private readonly createOrderEmptyService: OrderEmptyCreateService,
  ) {
    super();
  }

  public router = router({
    orderCreate: {
      createEmpty: publicProcedure
        .input(createEmptyInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createOrderEmptyService.execute(input);
          return orderSchema.parse(result);
        }),
    },
  });
}
