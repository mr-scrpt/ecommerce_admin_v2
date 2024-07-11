import {
  AddressBindToDeliveryListDTO,
  AddressCreateDTO,
  AddressGetByUserAndSettlementRefDTO,
  AddressGetByUserDTO,
  AddressGetDTO,
  AddressRemoveDTO,
  AddressUpdateDTO,
} from "@/kernel/domain/address/address.dto";
import { AddressEntity } from "@/kernel/domain/address/address.type";
import { IAddressRepository } from "@/kernel/domain/address/repository.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class AddressRepository implements IAddressRepository {
  constructor(private readonly db: DBClient) {}

  async get(dto: AddressGetDTO, db: Tx = this.db): Promise<AddressEntity> {
    const res = await db.address.findUniqueOrThrow({
      where: dto,
    });

    return res;
  }

  async getWithRelation<T>(dto: AddressGetDTO, db: Tx = this.db): Promise<T> {
    return (await db.address.findUniqueOrThrow({
      where: dto,
      include: {
        deliveryList: true,
      },
    })) as unknown as T;
  }

  async getListByUser(
    dto: AddressGetByUserDTO,
    db: Tx = this.db,
  ): Promise<AddressEntity[]> {
    const { userId } = dto;
    return await db.address.findMany({
      where: {
        userId,
      },
    });
  }

  async getListByUserAndSettlementRef(
    dto: AddressGetByUserAndSettlementRefDTO,
    db: Tx = this.db,
  ): Promise<AddressEntity[]> {
    return await db.address.findMany({
      where: dto,
    });
  }

  async create(
    dto: AddressCreateDTO,
    db: Tx = this.db,
  ): Promise<AddressEntity> {
    const { data } = dto;

    return await db.address.create({
      data,
    });
  }

  async update(
    dto: AddressUpdateDTO,
    db: Tx = this.db,
  ): Promise<AddressEntity> {
    const { data, selector } = dto;

    return await db.address.update({
      where: selector,
      data,
    });
  }

  async remove(
    dto: AddressRemoveDTO,
    db: Tx = this.db,
  ): Promise<AddressEntity> {
    const { selector } = dto;

    return await db.address.delete({ where: selector });
  }

  async bindToDeliveryList(
    dto: AddressBindToDeliveryListDTO,
    db: Tx = this.db,
  ): Promise<AddressEntity> {
    const { target, data } = dto;
    const { deliveryListId } = data;

    return await db.address.update({
      where: target,
      data: {
        deliveryList: {
          set: deliveryListId.map(({ deliveryId }) => ({ id: deliveryId })),
        },
      },
    });
  }
}
