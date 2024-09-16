import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getByOwnerInputSchema,
  getInputSchema,
  getListOutputSchema,
  getStatusAvailableOutputSchema,
  getStatusPaymentListSchema,
  getStatusStateListSchema,
} from "../_domain/order/validator.schema";
import { orderRelationSchema } from "../_domain/order/order.schema";
import { OrderGetService } from "../_service/order/orderGet.service";
import { OrderRelationGetService } from "../_service/order/orderRelationGet.service";
import { OrderListGetService } from "../_service/order/orderListGet.service";
import { OrderListGetByOwnerService } from "../_service/order/orderListGetByOwner.service";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import { OrderStatusAvailableGetService } from "../_service/orderStatus/orderStatusAvailableGet.service";
import { OrderStatusStateListGetService } from "../_service/orderStatus/orderStatusStateListGet.service";
import { OrderStatusPaymentListGetService } from "../_service/orderStatus/orderStatusPaymentListGet.service";

@injectable()
export class OrderController extends Controller {
  constructor(
    private readonly getOrderService: OrderGetService,
    private readonly getOrderRelationService: OrderRelationGetService,
    private readonly getOrderListService: OrderListGetService,
    private readonly getOrderByOwnerListService: OrderListGetByOwnerService,
    private readonly getOrderStatusAvailableService: OrderStatusAvailableGetService,
    private readonly getOrderStatusStateListService: OrderStatusStateListGetService,
    private readonly getOrderStatusPaymentListService: OrderStatusPaymentListGetService,
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

      getStatusAvailable: publicProcedure.query(async () => {
        const result = await this.getOrderStatusAvailableService.execute();
        return getStatusAvailableOutputSchema.parse(result);
      }),

      getStatusStateList: publicProcedure.query(async () => {
        const result = await this.getOrderStatusStateListService.execute();
        return getStatusStateListSchema.parse(result);
      }),

      getStatusPaymentList: publicProcedure.query(async () => {
        const result = await this.getOrderStatusPaymentListService.execute();
        return getStatusPaymentListSchema.parse(result);
      }),
    },
  });
}
