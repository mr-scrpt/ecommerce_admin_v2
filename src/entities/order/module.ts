import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderController } from "./_controller/order.controller";
import { OrderRepository } from "./_repository/order.repo";
import { OrderRowRepository } from "./_repository/orderRow.repo";
import { OrderGetService } from "./_service/order/orderGet.service";
import { OrderRelationGetService } from "./_service/order/orderRelationGet.service";
import { OrderListGetByOwnerService } from "./_service/order/orderListGetByOwner.service";
import { OrderListGetService } from "./_service/order/orderListGet.service";
import {
  IOrderRepository,
  IOrderRowRepository,
} from "@/kernel/domain/order/repository.type";
import { OrderGenerateNumberService } from "./_service/generateOrderNumber";
import { IOrderGenerateNumberService } from "./_domain/order/service.type";
import { OrderRowListWithRelationGetByOrderService } from "./_service/orderRow/orderRowListWithRelationGetByOrder.service";
import { OrderRowController } from "./_controller/orderRow.controller";

export const OrderModule = new ContainerModule((bind) => {
  bind(IOrderRepository).to(OrderRepository);
  bind(IOrderGenerateNumberService).to(OrderGenerateNumberService);

  bind(OrderGetService).toSelf();
  bind(OrderRelationGetService).toSelf();
  bind(OrderListGetByOwnerService).toSelf();
  bind(OrderListGetService).toSelf();

  bind(Controller).to(OrderController);
});

export const OrderRowModule = new ContainerModule((bind) => {
  bind(IOrderRowRepository).to(OrderRowRepository);
  bind(OrderRowListWithRelationGetByOrderService).toSelf();

  bind(Controller).to(OrderRowController);
});
