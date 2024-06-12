import { Tx } from "@/shared/lib/db/db";
import {
  OrderCreateEmptyDTO,
  OrderGetByOwnerDTO,
  OrderGetDTO,
} from "./order.dto";
import { OrderEntity, OrderRelationEntity } from "./order.types";
import { OrderRowEntity } from "./orderRow.types";

export abstract class IOrderRepository {
  abstract get(dto: OrderGetDTO, db?: Tx): Promise<OrderEntity>;

  abstract getWithRelation(
    dto: OrderGetDTO,
    db?: Tx,
  ): Promise<OrderRelationEntity>;

  abstract getListByOwner(
    dto: OrderGetByOwnerDTO,
    db?: Tx,
  ): Promise<OrderEntity[]>;

  abstract getList(db?: Tx): Promise<OrderEntity[]>;

  abstract createEmpty(dto: OrderCreateEmptyDTO, db?: Tx): Promise<OrderEntity>;

  abstract updateStatus(
    orderId: number, // Replace OrderId with number if OrderId is a type alias for number
    data: Partial<{ status: string }>, // Replace OrderToUpdateStatus with { status: string } if it's a type alias
    db?: Tx,
  ): Promise<OrderEntity>;

  abstract updateTotalPrice(
    orderId: number, // Replace OrderId with number if OrderId is a type alias for number
    totalPrice: number,
    db?: Tx,
  ): Promise<OrderEntity>;
}

export abstract class IOrderRowRepository {
  abstract getOrderRowList(orderId: string, db?: Tx): Promise<OrderRowEntity[]>;

  abstract create(data: OrderRowToAdd, db?: Tx): Promise<OrderRowEntity>;

  abstract removeOrderRow(id: string, db?: Tx): Promise<OrderRowEntity>;

  abstract updateQuantity(
    data: OrderRowChangeQuantity,
    db?: Tx,
  ): Promise<OrderRowEntity>;

  abstract get(id: string, db?: Tx): Promise<OrderRowEntity>;
}
