import { DBClient, Tx } from "@/shared/lib/db";
import { injectable } from "inversify";
import {
  SettlementEntity,
  SettlementToCreate,
} from "../_domain/settlement.type";

@injectable()
export class SettlementRepository {
  constructor(readonly db: DBClient) {}

  async getSettlementListSearch(q: string): Promise<Array<SettlementEntity>> {
    return await this.db.settlement.findMany({
      where: {
        OR: [
          {
            description: {
              contains: q,
            },
          },
          {
            descriptionRu: {
              contains: q,
            },
          },
          {
            descriptionTranslit: {
              contains: q,
            },
          },
        ],
      },
    });
  }

  async createSettlement(
    settlement: SettlementToCreate,
    db: Tx = this.db,
  ): Promise<SettlementEntity> {
    return await db.settlement.upsert({
      where: {
        ref: settlement.ref,
      },
      create: settlement,

      update: settlement,
    });
  }
}
