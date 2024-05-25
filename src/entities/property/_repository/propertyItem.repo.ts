import { DBClient, Tx } from "@/shared/lib/db/db";
import { PropertyId } from "../_domain/property/types";
import {
  PropertyItemCombineCreate,
  PropertyItemCombineUpdateOrCreate,
  PropertyItemEntity,
  PropertyItemId,
  PropertyItemToUpdate,
} from "../_domain/propertyItem/types";
import { injectable } from "inversify";

@injectable()
export class PropertyItemRepository {
  constructor(readonly db: DBClient) {}

  async getPropertyItem(
    propertyItemId: PropertyItemId,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    return db.propertyItem.findUniqueOrThrow({
      where: {
        id: propertyItemId,
      },
    });
  }

  async getPropertyItemList(
    propertyId: PropertyId,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity[]> {
    return db.propertyItem.findMany({
      where: {
        propertyId,
      },
    });
  }

  async createPropertyItem(
    data: PropertyItemCombineCreate,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    const { propertyId, ...propertyItem } = data;
    return await db.propertyItem.create({
      data: { ...propertyItem, propertyId },
    });
  }

  async updatePropertyItem(
    propertyItemId: PropertyItemId,
    propertyItemData: Partial<PropertyItemToUpdate>,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    return await db.propertyItem.update({
      where: { id: propertyItemId },
      data: propertyItemData,
    });
  }

  async updateOrCreatePropertyItem(
    data: PropertyItemCombineUpdateOrCreate,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    const { id, ...propertyItem } = data;
    return await db.propertyItem.upsert({
      where: { id: id ?? "" },

      create: { ...propertyItem },
      update: { ...propertyItem },
    });
  }

  async removePropertyItem(
    propertyItemId: PropertyItemId,
    db: Tx = this.db,
  ): Promise<PropertyItemEntity> {
    return await db.propertyItem.delete({ where: { id: propertyItemId } });
  }

  async removePropertyRelation(
    propertyId: PropertyId,
    db: Tx = this.db,
  ): Promise<void> {
    await db.propertyItem.deleteMany({
      where: {
        propertyId,
      },
    });
  }
}
