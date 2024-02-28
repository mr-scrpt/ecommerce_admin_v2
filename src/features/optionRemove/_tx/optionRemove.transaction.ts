import { OptionEntity, OptionId } from "@/entities/property";
import {
  OptionItemRepository,
  OptionRepository,
  optionItemRepository,
  optionRepository,
} from "@/entities/property/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

export class OptionRemoveTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly optionRepo: OptionRepository,
    private readonly optionItemRepo: OptionItemRepository,
  ) {
    super(dbClient);
  }

  async removeOptionById(optionId: OptionId): Promise<OptionEntity> {
    const action = async (tx: Tx) => {
      await this.optionItemRepo.removeOptionRelation(optionId, tx);

      return await this.optionRepo.removeOptionById(optionId, tx);
    };

    return await this.start(action);
  }
}

export const optionRemoveTx = new OptionRemoveTx(
  dbClient,
  optionRepository,
  optionItemRepository,
);
