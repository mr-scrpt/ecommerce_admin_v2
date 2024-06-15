import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  PropertyItemCreateDTO,
  PropertyItemGetDTO,
  PropertyItemListGetByProperyDTO,
  PropertyItemRemoveByPropertyDTO,
  PropertyItemRemoveDTO,
  PropertyItemUpdateDTO,
} from "../_domain/propertyItem/propertyItem.dto";
import { PropertyItemEntity } from "../_domain/propertyItem/types";
import { IPropertyItemRepository } from "../_domain/propertyItem/repository.type";

@injectable()
export class PropertyItemRepository implements IPropertyItemRepository {
  constructor(readonly db: DBClient) {}

  async get(
    dto: PropertyItemGetDTO,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    return db.propertyItem.findUniqueOrThrow({
      where: dto,
    });
  }

  async getListByProperty(
    dto: PropertyItemListGetByProperyDTO,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity[]> {
    return db.propertyItem.findMany({
      where: dto,
    });
  }

  async create(
    dto: PropertyItemCreateDTO,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    const { data } = dto;
    return await db.propertyItem.create({
      data,
    });
  }

  async update(
    dto: PropertyItemUpdateDTO,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    const { selector, data } = dto;
    return await db.propertyItem.update({
      where: selector,
      data,
    });
  }

  // async updateOrCreate(
  //   dto: PropertyItemUpdateOrCreateDTO,
  //   db: Tx = this.db,
  // ): Promise<PropertyItemEntity> {
  //   const { selector, data } = dto;
  //   const { id } = selector;
  //   return await db.propertyItem.upsert({
  //     where: { id: id ?? "" },
  //
  //     update: data,
  //     create: data,
  //   });
  // }

  async remove(
    dto: PropertyItemRemoveDTO,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    const { selector } = dto;
    return await db.propertyItem.delete({ where: selector });
  }

  async removeByProperty(
    dto: PropertyItemRemoveByPropertyDTO,
    db: Tx = this.db,
  ): Promise<void> {
    const { selector } = dto;
    const { id: propertyId } = selector;

    await db.propertyItem.deleteMany({
      where: { propertyId },
    });
  }
}
