import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import { OptionId } from "../_domain/option/types";
import {
  OptionItemCombineCreate,
  OptionItemEntity,
  OptionItemId,
  OptionItemToCreate,
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

  async getOptionItemList(db: Tx = this.db): Promise<OptionItemEntity[]> {
    return db.optionItem.findMany();
  }

  async createOptionItem(
    data: OptionItemCombineCreate,
    db: Tx = this.db,
  ): Promise<OptionItemEntity> {
    const { optionId, ...optionItem } = data;
    return await db.optionItem.create({
      data: { ...optionItem, optionId },
    });
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
