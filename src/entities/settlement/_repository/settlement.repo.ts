import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ISettlementRepository } from "../_domain/repository.type";
import {
  SettlementCreateDTO,
  SettlementGetByRefDTO,
  SettlementSearchDTO,
} from "../_domain/settlement.dto";
import { SettlementEntity } from "../_domain/settlement.type";

@injectable()
export class SettlementRepository implements ISettlementRepository {
  constructor(readonly db: DBClient) {}

  async getByRef(
    dto: SettlementGetByRefDTO,
    db: Tx = this.db,
  ): Promise<SettlementEntity> {
    const res = await db.settlement.findUniqueOrThrow({
      where: dto,
    });
    return res;
  }

  async searchList(
    dto: SettlementSearchDTO,
    db: Tx = this.db,
  ): Promise<Array<SettlementEntity>> {
    const { q } = dto;
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

  async create(
    dto: SettlementCreateDTO,
    db: Tx = this.db,
  ): Promise<SettlementEntity> {
    const { data } = dto;
    return await db.settlement.upsert({
      where: {
        ref: data.ref,
      },
      create: data,

      update: data,
    });
  }
}
