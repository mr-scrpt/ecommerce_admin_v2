import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getByOrderInputSchema,
  getListRelationOutputSchema,
} from "../_domain/orderRow/validator.schema";
import { OrderRowListWithRelationGetByOrderService } from "../_service/orderRow/orderRowListWithRelationGetByOrder.service";

@injectable()
export class OrderRowController extends Controller {
  constructor(
    private readonly getOrderRowListWithRelationByOrderService: OrderRowListWithRelationGetByOrderService,
  ) {
    super();
  }

  public router = router({
    orderRow: {
      getListByOrder: publicProcedure
        .input(getByOrderInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getOrderRowListWithRelationByOrderService.execute(input);
          return getListRelationOutputSchema.parse(result);
        }),
    },
  });
}
