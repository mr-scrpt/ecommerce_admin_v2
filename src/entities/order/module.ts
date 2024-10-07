import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderController } from "./_controller/order.controller";
import { OrderRepository } from "./_repository/order.repo";
import { OrderRowRepository } from "./_repository/orderRow.repo";
import { OrderGetService } from "./_service/order/orderGet.service";
import { OrderRelationGetService } from "./_service/order/orderRelationGet.service";
import { OrderListGetByConsumerService } from "./_service/order/orderListGetByOwner.service";
import { OrderListGetService } from "./_service/order/orderListGet.service";
import {
  IOrderRepository,
  IOrderRowRepository,
  IOrderStatusRepository,
} from "@/kernel/domain/order/repository.type";
import { OrderGenerateNumberService } from "./_service/generateOrderNumber";
import { IOrderGenerateNumberService } from "./_domain/order/service.type";
import { OrderRowListWithRelationGetByOrderService } from "./_service/orderRow/orderRowListWithRelationGetByOrder.service";
import { OrderRowController } from "./_controller/orderRow.controller";
import { OrderStatusRepository } from "./_repository/orderStatus.repo";
import { OrderStatusAvailableGetService } from "./_service/orderStatus/orderStatusAvailableGet.service";
import { OrderStatusPaymentListGetService } from "./_service/orderStatus/orderStatusPaymentListGet.service";
import { OrderStatusStateListGetService } from "./_service/orderStatus/orderStatusStateListGet.service";
import { OrderListWithRelationGetByConsumerService } from "./_service/order/orderListWithRelationGetByConsumer.service";
import { OrderListGetByOrderService } from "./_service/order/orderListGetByOrder.service";
import { OrderListWithRelationGetService } from "./_service/order/orderListWithRelationGet.service";

export const OrderModule = new ContainerModule((bind) => {
  bind(IOrderRepository).to(OrderRepository);
  bind(IOrderGenerateNumberService).to(OrderGenerateNumberService);

  bind(OrderGetService).toSelf();
  bind(OrderRelationGetService).toSelf();
  bind(OrderListWithRelationGetService).toSelf();
  bind(OrderListWithRelationGetByConsumerService).toSelf();
  bind(OrderListGetByOrderService).toSelf();
  bind(OrderListGetByConsumerService).toSelf();
  bind(OrderListGetService).toSelf();

  bind(Controller).to(OrderController);
});

export const OrderRowModule = new ContainerModule((bind) => {
  bind(IOrderRowRepository).to(OrderRowRepository);
  bind(OrderRowListWithRelationGetByOrderService).toSelf();

  bind(Controller).to(OrderRowController);
});

export const OrderStatusModule = new ContainerModule((bind) => {
  bind(IOrderStatusRepository).to(OrderStatusRepository);
  bind(OrderStatusAvailableGetService).toSelf();

  bind(OrderStatusStateListGetService).toSelf();
  bind(OrderStatusPaymentListGetService).toSelf();
});
