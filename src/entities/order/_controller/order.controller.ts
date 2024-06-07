import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { getInputSchema } from "../_domain/validator.schema";
import { orderRelationSchema, orderSchema } from "../_domain/order.schema";
import { OrderGetService } from "../_service/orderGet.service";
import { OrderRelationGetService } from "../_service/orderRelationGet.service";

@injectable()
export class OrderController extends Controller {
  constructor(
    private readonly getOrderService: OrderGetService,
    private readonly getOrderRelationService: OrderRelationGetService,
    // private readonly getOrderListService: OrderListGetService,
  ) {
    super();
  }

  public router = router({
    order: {
      get: publicProcedure.input(getInputSchema).query(async ({ input }) => {
        const result = await this.getOrderService.execute(input);
        return orderSchema.parse(result);
      }),
      getRelation: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result = await this.getOrderRelationService.execute(input);
          return orderRelationSchema.parse(result);
        }),
      // getByOrder: publicProcedure
      //   .input(getByOrderInputSchema)
      //   .query(async ({ input }) => {
      //     const result = await this.getOrderByOrderService.execute(input);
      //     return orderSchema.parse(result);
      //   }),
      // getList: publicProcedure.query(async () => {
      //   const result = await this.getOrderListService.execute();
      //   return orderSchema.array().parse(result);
      // }),
    },
  });
}
