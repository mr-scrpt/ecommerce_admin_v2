import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  OrderRowChangeQuantity,
  OrderRowEntity,
  OrderRowToAdd,
} from "../_domain/orderRow.types";

export class OrderRowRepository {
  constructor(readonly db: DbClient) {}

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

  async changeQuantity(
    data: OrderRowChangeQuantity,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const result = await db.orderRow.update({ where: { id: data.id }, data });
    return result;
  }
}

export const orderRowRepository = new OrderRowRepository(dbClient);
