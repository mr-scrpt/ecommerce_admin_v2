import { Tx } from "@/shared/lib/db/db";
import {
  OrderCreateEmptyDTO,
  OrderGetByConsumerDTO,
  OrderGetDTO,
  OrderUpdateDTO,
} from "./order.dto";
import { OrderEntity, OrderRelationEntity } from "./order.types";
import { OrderRowEntity } from "./orderRow.types";
import {
  OrderRowCreateDTO,
  OrderRowGetDTO,
  OrderRowListGetByOrderDTO,
  OrderRowRemoveDTO,
  OrderRowUpdateDTO,
} from "./orderRow.dto";

export abstract class IOrderRepository {
  abstract get(dto: OrderGetDTO, db?: Tx): Promise<OrderEntity>;

  abstract getWithRelation(
    dto: OrderGetDTO,
    db?: Tx,
  ): Promise<OrderRelationEntity>;

  abstract getListByConsumer(
    dto: OrderGetByConsumerDTO,
    db?: Tx,
  ): Promise<OrderEntity[]>;

  abstract getList(db?: Tx): Promise<OrderEntity[]>;

  abstract createEmpty(dto: OrderCreateEmptyDTO, db?: Tx): Promise<OrderEntity>;

  abstract updateStatus(
    orderId: number, // Replace OrderId with number if OrderId is a type alias for number
    data: Partial<{ status: string }>, // Replace OrderToUpdateStatus with { status: string } if it's a type alias
    db?: Tx,
  ): Promise<OrderEntity>;

  abstract update(dto: OrderUpdateDTO, db?: Tx): Promise<OrderEntity>;
}

export abstract class IOrderRowRepository {
  abstract get(dto: OrderRowGetDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract getListByOrder(
    dto: OrderRowListGetByOrderDTO,
    db?: Tx,
  ): Promise<OrderRowEntity[]>;

  abstract create(dto: OrderRowCreateDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract update(dto: OrderRowUpdateDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract remove(dto: OrderRowRemoveDTO, db?: Tx): Promise<OrderRowEntity>;
}
