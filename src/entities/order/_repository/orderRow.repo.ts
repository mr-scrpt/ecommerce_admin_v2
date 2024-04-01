import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  OrderRowChangeQuantity,
  OrderRowEntity,
  OrderRowToAdd,
} from "../_domain/orderRow.types";

export class OrderRowRepository {
  constructor(readonly db: DbClient) {}

  async getOrerRowList(
    orderId: string,
    db: Tx = this.db,
  ): Promise<OrderRowEntity[]> {
    const result = await db.orderRow.findMany({ where: { orderId } });
    return result;
  }
  async createOrderRow(
    data: OrderRowToAdd,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const result = await db.orderRow.create({ data });
    return result;
  }

  async removeOrderRow(id: string, db: Tx = this.db): Promise<OrderRowEntity> {
    const result = await db.orderRow.delete({ where: { id } });
    return result;
  }

  async updateQuantityRow(
    data: OrderRowChangeQuantity,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const result = await db.orderRow.update({
      where: { id: data.orderRowId },
      data: { quantity: data.quantity },
    });
    return result;
  }

  async getOrderRow(id: string, db: Tx = this.db): Promise<OrderRowEntity> {
    const result = await db.orderRow.findUniqueOrThrow({ where: { id } });
    return result;
  }
}

export const orderRowRepository = new OrderRowRepository(dbClient);
