import {
  OptionItemRepository,
  OptionRelation,
  OptionRelationEntity,
  OptionRepository,
  optionItemRepository,
  optionRepository,
} from "@/entities/option";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

export class OptionCreateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly optionRepo: OptionRepository,
    private readonly optionItemRepo: OptionItemRepository,
  ) {
    super(dbClient);
  }

  async createOptionComplexible(
    data: OptionRelation,
  ): Promise<OptionRelationEntity> {
    const action = async (tx: Tx) => {
      const { optionItemList, ...option } = data;
      const optionCreated = await this.optionRepo.createOption(option, tx);
      const optionItemListCreated = [];

      for await (const item of optionItemList) {
        const itemCreated = await this.optionItemRepo.createOptionItem(
          { optionId: optionCreated.id, ...item },
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
