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
      console.log("output_log: optionListOld =>>>", optionListOld);
      console.log("output_log: optionItemListData =>>>", optionItemListData);
      // Добавление новых OptionItem и обновление существующих
      await Promise.all(
        optionItemListData.map(async (itemData) => {
          if (itemData.id) {
            await this.optionItemRepo.updateOptionItem(
              itemData.id,
              itemData,
              tx,
            );
          } else {
            await this.optionItemRepo.createOptionItem(
              { ...itemData, optionId },
              tx,
            );
          }
        }),
      );

      // Удаление OptionItem, которые отсутствуют в новом списке
      const itemsToDelete = optionListOld.filter(
        (oldItem) =>
          !optionItemListData.find((newItem) => newItem.id === oldItem.id),
      );

      await Promise.all(
        itemsToDelete.map(async (item) => {
          await this.optionItemRepo.removeOptionItem(item.id, tx);
        }),
      );

      // return await this.optionRepo.updateOptionById(optionId, tx);
      const res = await this.optionRepo.getOptionRelation(optionId, tx);
      console.log("output_log: with relation =>>>", res);
      return res;
    };

    return await this.start(action);
  }
}

export const optionUpdateTx = new OptionUpdateTx(
  dbClient,
  optionRepository,
  optionItemRepository,
);
