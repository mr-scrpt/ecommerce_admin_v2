import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IOrderRowRepository } from "@/kernel/domain/order/repository.type";
import {
  OrderRowCreateDTO,
  OrderRowGetByOrderProductDTO,
  OrderRowGetDTO,
  OrderRowListGetByOrderDTO,
  OrderRowRemoveDTO,
  OrderRowUpdateDTO,
} from "@/kernel/domain/order/orderRow.dto";
import { OrderRowEntity } from "@/kernel/domain/order/orderRow.type";

@injectable()
export class OrderRowRepository implements IOrderRowRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: OrderRowGetDTO, db: Tx = this.db): Promise<OrderRowEntity> {
    const result = await db.orderRow.findUniqueOrThrow({ where: dto });
    return result;
  }

  async getByOrderProduct(
    dto: OrderRowGetByOrderProductDTO,
    db: Tx = this.db,
  ): Promise<OrderRowEntity | null> {
    const { orderId, productId } = dto;

    const result = await db.orderRow.findUnique({
      where: { orderId_productId: { orderId, productId } },
    });

    return result;
  }

  async getListByOrder(
    dto: OrderRowListGetByOrderDTO,
    db: Tx = this.db,
  ): Promise<OrderRowEntity[]> {
    const result = await db.orderRow.findMany({ where: dto });
    return result;
  }

  async create(
    dto: OrderRowCreateDTO,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const { data, target } = dto;

    const result = await db.orderRow.create({
      data: {
        ...data,
        orderId: target.orderId,
      },
    });
    return result;
  }

  async update(
    dto: OrderRowUpdateDTO,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const { data, selector } = dto;

    const result = await db.orderRow.update({
      where: selector,
      data,
    });
    return result;
  }

  async remove(
    dto: OrderRowRemoveDTO,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const { selector } = dto;

    const result = await db.orderRow.delete({ where: selector });
    return result;
  }
}
