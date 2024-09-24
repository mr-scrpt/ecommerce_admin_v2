import {
  ReceiverBindToOrderDTO,
  ReceiverCreateDTO,
  ReceiverGetByOrderDTO,
  ReceiverGetByUserDTO,
  ReceiverGetDTO,
  ReceiverRemoveDTO,
  ReceiverUpdateDTO,
} from "@/kernel/domain/receiver/receiver.dto";
import { ReceiverEntity } from "@/kernel/domain/receiver/receiver.type";
import { IReceiverRepository } from "@/kernel/domain/receiver/repository.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class ReceiverRepository implements IReceiverRepository {
  constructor(private readonly db: DBClient) {}

  async get(dto: ReceiverGetDTO, db: Tx = this.db): Promise<ReceiverEntity> {
    const res = await db.receiver.findUniqueOrThrow({
      where: dto,
    });

    return res;
  }

  async getWithRelation<T>(dto: ReceiverGetDTO, db: Tx = this.db): Promise<T> {
    return (await db.receiver.findUniqueOrThrow({
      where: dto,
      include: {
        orderList: true,
      },
    })) as unknown as T;
  }

  async getListByUser(
    dto: ReceiverGetByUserDTO,
    db: Tx = this.db,
  ): Promise<ReceiverEntity[]> {
    const { userId } = dto;
    return await db.receiver.findMany({
      where: {
        userId,
      },
    });
  }

  // async getListByOrder(
  //   dto: ReceiverGetByOrderDTO,
  //   db: Tx = this.db,
  // ): Promise<ReceiverEntity[]> {
  //   const { orderId } = dto;
  //   return await db.receiver.findMany({
  //     where: {
  //       user: {
  //         orderList: {
  //           some: {
  //             id: orderId,
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  async create(
    dto: ReceiverCreateDTO,
    db: Tx = this.db,
  ): Promise<ReceiverEntity> {
    const { data } = dto;

    return await db.receiver.create({
      data,
    });
  }

  async update(
    dto: ReceiverUpdateDTO,
    db: Tx = this.db,
  ): Promise<ReceiverEntity> {
    const { data, selector } = dto;

    return await db.receiver.update({
      where: selector,
      data,
    });
  }

  async remove(
    dto: ReceiverRemoveDTO,
    db: Tx = this.db,
  ): Promise<ReceiverEntity> {
    const { selector } = dto;

    return await db.receiver.delete({ where: selector });
  }

  async bindToOrder(
    dto: ReceiverBindToOrderDTO,
    db: Tx = this.db,
  ): Promise<ReceiverEntity> {
    const { target, data } = dto;
    const { orderId } = data;

    return await db.receiver.update({
      where: target,
      data: {
        orderList: {
          // set: deliveryListId.map(({ deliveryId }) => ({ id: deliveryId })),
          connect: { id: orderId },
          // set: {
          //   id: orderId,
          // }
        },
      },
    });
  }
}
