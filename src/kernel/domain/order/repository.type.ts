import { Tx } from "@/shared/lib/db/db";
import {
  OrderCreateEmptyDTO,
  OrderGetByConsumerDTO,
  OrderGetDTO,
  OrderUpdateDTO,
} from "./order.dto";
import {
  OrderRowCreateDTO,
  OrderRowGetByOrderProductDTO,
  OrderRowGetDTO,
  OrderRowListGetByOrderDTO,
  OrderRowRemoveDTO,
  OrderRowUpdateDTO,
} from "./orderRow.dto";
import { OrderEntity } from "./order.type";
import { OrderRowEntity } from "./orderRow.type";

export abstract class IOrderRepository {
  abstract get(dto: OrderGetDTO, db?: Tx): Promise<OrderEntity>;

  abstract getWithRelation<T>(dto: OrderGetDTO, db?: Tx): Promise<T>;

  abstract getListByConsumer(
    dto: OrderGetByConsumerDTO,
    db?: Tx,
  ): Promise<OrderEntity[]>;

  abstract getList(db?: Tx): Promise<OrderEntity[]>;

  abstract createEmpty(dto: OrderCreateEmptyDTO, db?: Tx): Promise<OrderEntity>;

  abstract update(dto: OrderUpdateDTO, db?: Tx): Promise<OrderEntity>;
}

export abstract class IOrderRowRepository {
  abstract get(dto: OrderRowGetDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract getByOrderProduct(
    dto: OrderRowGetByOrderProductDTO,
    db?: Tx,
  ): Promise<OrderRowEntity | null>;

  abstract getListByOrder(
    dto: OrderRowListGetByOrderDTO,
    db?: Tx,
  ): Promise<OrderRowEntity[]>;

  abstract create(dto: OrderRowCreateDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract update(dto: OrderRowUpdateDTO, db?: Tx): Promise<OrderRowEntity>;

  abstract remove(dto: OrderRowRemoveDTO, db?: Tx): Promise<OrderRowEntity>;
}
