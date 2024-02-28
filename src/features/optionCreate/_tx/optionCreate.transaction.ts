import { OptionEntity } from "@/entities/property";
import {
  OptionItemRepository,
  OptionRepository,
  optionItemRepository,
  optionRepository,
} from "@/entities/property/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OptionCreateComplexible } from "../_domain/types";

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
  ): Promise<OptionEntity> {
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

      return await this.optionRepo.getOption(optionCreated.id, tx);
    };

    return await this.start(action);
  }
}

export const optionCreateTx = new OptionCreateTx(
  dbClient,
  optionRepository,
  optionItemRepository,
);
