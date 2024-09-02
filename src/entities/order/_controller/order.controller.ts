import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getByOwnerInputSchema,
  getInputSchema,
  getListOutputSchema,
} from "../_domain/order/validator.schema";
import { orderRelationSchema } from "../_domain/order/order.schema";
import { OrderGetService } from "../_service/order/orderGet.service";
import { OrderRelationGetService } from "../_service/order/orderRelationGet.service";
import { OrderListGetService } from "../_service/order/orderListGet.service";
import { OrderListGetByOwnerService } from "../_service/order/orderListGetByOwner.service";
import { orderSchema } from "@/kernel/domain/order/order.schema";

@injectable()
export class OrderController extends Controller {
  constructor(
    private readonly getOrderService: OrderGetService,
    private readonly getOrderRelationService: OrderRelationGetService,
    private readonly getOrderListService: OrderListGetService,
    private readonly getOrderByOwnerListService: OrderListGetByOwnerService,
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

      getList: publicProcedure.query(async () => {
        const result = await this.getOrderListService.execute();
        return getListOutputSchema.parse(result);
      }),

      getListByOwner: publicProcedure
        .input(getByOwnerInputSchema)
        .query(async ({ input }) => {
          const result = await this.getOrderByOwnerListService.execute(input);
          return getListOutputSchema.parse(result);
        }),
    },
  });
}
