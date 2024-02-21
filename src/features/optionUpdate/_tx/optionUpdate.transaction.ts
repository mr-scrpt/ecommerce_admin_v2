import { OptionRelationEntity } from "@/entities/option";
import {
  OptionItemRepository,
  OptionRepository,
  optionItemRepository,
  optionRepository,
} from "@/entities/option/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OptionUpdateComplexible } from "../_domain/types";

export class OptionUpdateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly optionRepo: OptionRepository,
    private readonly optionItemRepo: OptionItemRepository,
  ) {
    super(dbClient);
  }

  async updateOptionById(
    data: OptionUpdateComplexible,
  ): Promise<OptionRelationEntity> {
    const { optionId, optionData, optionItemListData } = data;
    const action = async (tx: Tx) => {
      await this.optionRepo.updateOption(optionId, optionData, tx);

      const optionListOld = await this.optionItemRepo.getOptionItemList(
        optionId,
        tx,
      );

      await Promise.all(
        optionItemListData.map(async (itemData) => {
          await this.optionItemRepo.updateOrCreateOptionItem(
            { ...itemData, optionId }, // Добавляем optionId в данные перед вызовом функции
            tx,
          );
        }),
      );

      const itemsToDelete = optionListOld.filter(
        (oldItem) =>
          !optionItemListData.find((newItem) => newItem.id === oldItem.id),
      );

      await Promise.all(
        itemsToDelete.map(async (item) => {
          await this.optionItemRepo.removeOptionItem(item.id, tx);
        }),
      );

      return await this.optionRepo.getOptionRelation(optionId, tx);
    };

    return await this.start(action);
  }
}

export const optionUpdateTx = new OptionUpdateTx(
  dbClient,
  optionRepository,
  optionItemRepository,
);
