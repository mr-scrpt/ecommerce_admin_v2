// import { DbClient, Tx, dbClient } from "@/shared/lib/db";
// import { OptionItem, OptionItemEntity, OptionItemId } from "../_domain/types";
//
// export class OptionItemRepository {
//   constructor(readonly db: DbClient) {}
//
//   async getOptionItem(
//     optionItemId: OptionItemId,
//     db: Tx = this.db,
//   ): Promise<OptionItemEntity> {
//     return db.optionItem.findUniqueOrThrow({
//       where: {
//         id: optionItemId,
//       },
//     });
//   }
//
//   async getOptionItemList(db: Tx = this.db): Promise<OptionItemEntity[]> {
//     return db.optionItem.findMany();
//   }
//
//   async createOptionItem(
//     optionItem: OptionItem,
//     db: Tx = this.db,
//   ): Promise<OptionItemEntity> {
//     return await db.optionItem.create({
//       data: optionItem,
//     });
//   }
//
//   async updateOptionItem(
//     targetId: OptionItemId,
//     optionItemData: Partial<OptionItem>,
//     db: Tx = this.db,
//   ): Promise<OptionItemEntity> {
//     return await db.optionItem.update({
//       where: { id: targetId },
//       data: optionItemData,
//     });
//   }
//
//   async removeOptionItemById(
//     optionItemId: OptionItemId,
//     db: Tx = this.db,
//   ): Promise<OptionItemEntity> {
//     return await db.optionItem.delete({ where: { id: optionItemId } });
//   }
// }
//
// export const optionItemRepository = new OptionItemRepository(dbClient);
