import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  SettlementEntity,
  SettlementToCreate,
} from "../_domain/settlement.type";

@injectable()
export class SettlementRepository {
  constructor(readonly db: DBClient) {}

  async getSettlement(
    settlement: string,
    db: Tx = this.db,
  ): Promise<SettlementEntity> {
    const res = await db.settlement.findUniqueOrThrow({
      where: {
        ref: settlement,
      },
    });
    return res;
  }

  async getSettlementListSearch(
    q: string,
    db: Tx = this.db,
  ): Promise<Array<SettlementEntity>> {
    const res = await db.settlement.findMany({
      where: {
        OR: [
          {
            description: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            descriptionRu: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            descriptionTranslit: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            ref: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return res;
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
