import { OptionEntity, OptionId } from "@/entities/option";
import { OptionRepository, optionRepository } from "@/entities/option";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

export class OptionUpdateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly optionRepo: OptionRepository,
  ) {
    super(dbClient);
  }

  async updateOptionById(optionId: OptionId): Promise<OptionEntity> {
    const action = async (tx: Tx) => {
      return await this.optionRepo.updateOptionById(optionId, tx);
    };

    return await this.start(action);
  }
}

export const optionUpdateTx = new OptionUpdateTx(dbClient, optionRepository);
