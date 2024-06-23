import { orderSchema } from "@/entities/order";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
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
      create: publicProcedure
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createOrederRowService.execute(input);
          return orderSchema.parse(result);
        }),
    },
  });
}
