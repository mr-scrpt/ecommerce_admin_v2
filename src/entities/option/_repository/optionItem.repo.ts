import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  OptionItem,
  OptionItemCreate,
  OptionItemEntity,
  OptionItemId,
} from "../_domain/types";

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
    data: OptionItemCreate,
    db: Tx = this.db,
  ): Promise<OptionItemEntity> {
    const { optionId, ...optionItem } = data;
    return await db.optionItem.create({
      data: { ...optionItem, optionId },
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
