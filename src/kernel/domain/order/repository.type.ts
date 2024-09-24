import { Tx } from "@/shared/lib/db/db";
import {
  OrderCreateEmptyWithReceiverDTO,
  OrderGetByConsumerDTO,
  OrderGetDTO,
  OrderReceiverUpdateDTO,
  OrderUpdateDTO,
} from "./order.dto";
import { OrderEntity } from "./order.type";
import {
  OrderRowCreateDTO,
  OrderRowGetByOrderProductDTO,
  OrderRowGetDTO,
  OrderRowListGetByOrderDTO,
  OrderRowRemoveDTO,
  OrderRowUpdateDTO,
} from "./orderRow.dto";
import { OrderRowEntity } from "./orderRow.type";
import {
  OrderStatusPaymentEntity,
  OrderStatusStateEntity,
} from "./orderStatus.type";
import { OrderStatusGetDTO } from "./orderStatus.dto";

export abstract class IOrderRepository {
  abstract get(dto: OrderGetDTO, db?: Tx): Promise<OrderEntity>;

  abstract getWithRelation<T>(dto: OrderGetDTO, db?: Tx): Promise<T>;

  abstract getListByConsumer(
    dto: OrderGetByConsumerDTO,
    db?: Tx,
  ): Promise<OrderEntity[]>;

  abstract getList(db?: Tx): Promise<OrderEntity[]>;

  abstract createEmpty(
    dto: OrderCreateEmptyWithReceiverDTO,
    db?: Tx,
  ): Promise<OrderEntity>;

  abstract update(dto: OrderUpdateDTO, db?: Tx): Promise<OrderEntity>;
  abstract bindReceiver(
    dto: OrderReceiverUpdateDTO,
    db?: Tx,
  ): Promise<OrderEntity>;
}

export abstract class IOrderRowRepository {
  abstract get(dto: OrderRowGetDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract getWithRelation<T>(dto: OrderRowGetDTO, db?: Tx): Promise<T>;

  abstract getByOrderProduct(
    dto: OrderRowGetByOrderProductDTO,
    db?: Tx,
  ): Promise<OrderRowEntity | null>;

  abstract getListByOrder(
    dto: OrderRowListGetByOrderDTO,
    db?: Tx,
  ): Promise<OrderRowEntity[]>;

  abstract getListWithRelationByOrder<T>(
    dto: OrderRowListGetByOrderDTO,
    db?: Tx,
  ): Promise<T>;

  abstract create(dto: OrderRowCreateDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract update(dto: OrderRowUpdateDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract remove(dto: OrderRowRemoveDTO, db?: Tx): Promise<OrderRowEntity>;
}
export abstract class IOrderStatusRepository {
  abstract getStatusState(
    dto: OrderStatusGetDTO,
    db?: Tx,
  ): Promise<OrderStatusStateEntity>;

  abstract getStatusPayment(
    dto: OrderStatusGetDTO,
    db?: Tx,
  ): Promise<OrderStatusPaymentEntity>;

  abstract getStatusStateList(db?: Tx): Promise<Array<OrderStatusStateEntity>>;

  abstract getStatusPaymentList(
    db?: Tx,
  ): Promise<Array<OrderStatusPaymentEntity>>;
}
