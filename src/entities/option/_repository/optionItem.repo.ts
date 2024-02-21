import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import { OptionId } from "../_domain/option/types";
import {
  OptionItemCombineCreate,
  OptionItemCombineUpdateOrCreate,
  OptionItemEntity,
  OptionItemId,
  OptionItemToCreate,
  OptionItemToUpdate,
} from "../_domain/optionItem/types";

export class OptionItemRepository {
  constructor(readonly db: DbClient) {}

  async getOptionItem(
    optionItemId: OptionItemId,
    db: Tx = this.db,
  ): Promise<OptionItemEntity> {
    return db.optionItem.findUniqueOrThrow({
      where: {
        id: optionItemId,
      },
    });
  }

  async getOptionItemList(
    optionId: OptionId,
    db: Tx = this.db,
  ): Promise<OptionItemEntity[]> {
    return db.optionItem.findMany({
      where: {
        optionId,
      },
    });
  }

  async createOptionItem(
    data: OptionItemCombineCreate,
    db: Tx = this.db,
  ): Promise<OptionItemEntity> {
    const { optionId, ...optionItem } = data;
    console.log("output_log: optionItem =>>>", optionItem);
    console.log("output_log: optionId =>>>", optionId);
    return await db.optionItem.create({
      data: { ...optionItem, optionId },
    });
  }

  async updateOptionItem(
    optionItemId: OptionItemId,
    optionItemData: Partial<OptionItemToUpdate>,
    db: Tx = this.db,
  ): Promise<OptionItemEntity> {
    return await db.optionItem.update({
      where: { id: optionItemId },
      data: optionItemData,
    });
  }

  async updateOrCreateOptionItem(
    data: OptionItemCombineUpdateOrCreate,
    db: Tx = this.db,
  ): Promise<OptionItemEntity> {
    const { id, ...optionItem } = data;
    console.log("output_log: data in repo =>>>", data);
    return await db.optionItem.upsert({
      where: { id: id ?? "" },

      create: { ...optionItem },
      update: { ...optionItem },
    });
  }

  async removeOptionItem(
    optionItemId: OptionItemId,
    db: Tx = this.db,
  ): Promise<OptionItemEntity> {
    return await db.optionItem.delete({ where: { id: optionItemId } });
  }

  async removeOptionRelation(
    optionId: OptionId,
    db: Tx = this.db,
  ): Promise<void> {
    await db.optionItem.deleteMany({
      where: {
        optionId,
      },
    });
  }

  // async updateOptionItem(
  //   targetId: OptionItemId,
  //   optionItemData: Partial<OptionItem>,
  //   db: Tx = this.db,
  // ): Promise<OptionItemEntity> {
  //   return await db.optionItem.update({
  //     where: { id: targetId },
  //     data: optionItemData,
  //   });
  // }
  //
  // async removeOptionItemById(
  //   optionItemId: OptionItemId,
  //   db: Tx = this.db,
  // ): Promise<OptionItemEntity> {
  //   return await db.optionItem.delete({ where: { id: optionItemId } });
  // }
}

export const optionItemRepository = new OptionItemRepository(dbClient);
