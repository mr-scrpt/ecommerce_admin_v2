import { DBClient, Tx } from "@/shared/lib/db/db";
import { OrderRowEntity } from "../_domain/orderRow.types";
import { injectable } from "inversify";
import { IOrderRowRepository } from "../_domain/repository.type";
import {
  OrderRowCreateDTO,
  OrderRowGetDTO,
  OrderRowListGetByOrderDTO,
  OrderRowRemoveDTO,
  OrderRowUpdateDTO,
} from "../_domain/orderRow.dto";

@injectable()
export class OrderRowRepository implements IOrderRowRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: OrderRowGetDTO, db: Tx = this.db): Promise<OrderRowEntity> {
    const result = await db.orderRow.findUniqueOrThrow({ where: dto });
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
    const { data } = dto;

    const result = await db.orderRow.create({ data });
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
