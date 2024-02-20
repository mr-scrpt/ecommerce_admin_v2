import { OptionRelationEntity } from "@/entities/option";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OptionCreateComplexible } from "../_domain/types";
import {
  OptionItemRepository,
  OptionRepository,
  optionItemRepository,
  optionRepository,
} from "@/entities/option/server";

export class OptionCreateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly optionRepo: OptionRepository,
    private readonly optionItemRepo: OptionItemRepository,
  ) {
    super(dbClient);
  }

  async createOptionComplexible(
    data: OptionCreateComplexible,
  ): Promise<OptionRelationEntity> {
    const action = async (tx: Tx) => {
      const { optionItemListData, optionData } = data;

      const optionCreated = await this.optionRepo.createOption(optionData, tx);

      const optionItemListCreated = [];

      for await (const item of optionItemListData) {
        const itemCreated = await this.optionItemRepo.createOptionItem(
          { ...item, optionId: optionCreated.id },
          tx,
        );
        optionItemListCreated.push(itemCreated);
      }

      return await this.optionRepo.getOptionRelation(optionCreated.id, tx);
    };

    return await this.start(action);
  }
}

export const optionCreateTx = new OptionCreateTx(
  dbClient,
  optionRepository,
  optionItemRepository,
);
