import { DBClient, Tx } from "@/shared/lib/db/db";
import { OrderRowEntity } from "../_domain/orderRow.types";
import { injectable } from "inversify";
import { IOrderRowRepository } from "../_domain/repository.type";

@injectable()
export class OrderRowRepository implements IOrderRowRepository {
  constructor(readonly db: DBClient) {}

  async get(id: string, db: Tx = this.db): Promise<OrderRowEntity> {
    const result = await db.orderRow.findUniqueOrThrow({ where: { id } });
    return result;
  }

  async getList(orderId: string, db: Tx = this.db): Promise<OrderRowEntity[]> {
    const result = await db.orderRow.findMany({ where: { orderId } });
    return result;
  }
  async create(data: OrderRowToAdd, db: Tx = this.db): Promise<OrderRowEntity> {
    const result = await db.orderRow.create({ data });
    return result;
  }

  async removeOrderRow(id: string, db: Tx = this.db): Promise<OrderRowEntity> {
    const result = await db.orderRow.delete({ where: { id } });
    return result;
  }

  async updateQuantity(
    data: OrderRowChangeQuantity,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const result = await db.orderRow.update({
      where: { id: data.orderRowId },
      data: { quantity: data.quantity },
    });
    return result;
  }
}
