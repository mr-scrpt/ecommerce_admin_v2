import { Tx } from "@/shared/lib/db/db";
import {
  SettlementCreateDTO,
  SettlementGetByRefDTO,
  SettlementSearchDTO,
} from "./settlement.dto";
import { SettlementEntity } from "./settlement.type";

export abstract class ISettlementRepository {
  abstract getByRef(
    dto: SettlementGetByRefDTO,
    db?: Tx,
  ): Promise<SettlementEntity>;

  abstract searchList(
    dto: SettlementSearchDTO,
    db?: Tx,
  ): Promise<Array<SettlementEntity>>;

  abstract create(dto: SettlementCreateDTO, db?: Tx): Promise<SettlementEntity>;
}
