import { orderSchema } from "@/kernel/domain/order/order.schema";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { orderRelationSchema } from "../_domain/order/order.schema";
import {
  getByOwnerInputSchema,
  getInputSchema,
  getListOutputSchema,
  getListRelationOutputSchema,
  getStatusAvailableOutputSchema,
  getStatusPaymentListSchema,
  getStatusStateListSchema,
} from "../_domain/order/validator.schema";
import { OrderGetService } from "../_service/order/orderGet.service";
import { OrderListGetService } from "../_service/order/orderListGet.service";
import { OrderListGetByOrderService } from "../_service/order/orderListGetByOrder.service";
import { OrderListGetByConsumerService } from "../_service/order/orderListGetByOwner.service";
import { OrderRelationGetService } from "../_service/order/orderRelationGet.service";
import { OrderStatusAvailableGetService } from "../_service/orderStatus/orderStatusAvailableGet.service";
import { OrderStatusPaymentListGetService } from "../_service/orderStatus/orderStatusPaymentListGet.service";
import { OrderStatusStateListGetService } from "../_service/orderStatus/orderStatusStateListGet.service";

@injectable()
export class OrderController extends Controller {
  constructor(
    private readonly getOrderService: OrderGetService,
    private readonly getOrderRelationService: OrderRelationGetService,
    private readonly getOrderListService: OrderListGetService,
    // private readonly getOrderListWithRelationService: OrderListWithRelationGetByConsumerService,
    private readonly getOrderListByOrderService: OrderListGetByOrderService,
    private readonly getOrderByConsumerListService: OrderListGetByConsumerService,
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

      getListByConsumer: publicProcedure
        .input(getByOwnerInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getOrderByConsumerListService.execute(input);
          return getListRelationOutputSchema.parse(result);
        }),

      getListByOrder: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result = await this.getOrderListByOrderService.execute(input);
          return getListRelationOutputSchema.parse(result);
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
