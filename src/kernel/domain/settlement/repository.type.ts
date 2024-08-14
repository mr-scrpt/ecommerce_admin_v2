import { Tx } from "@/shared/lib/db/db";
import {
  SettlementCreateDTO,
  SettlementGetByRefDTO,
  SettlementSearchByRefDTO,
  SettlementSearchDTO,
} from "./settlement.dto";
import { SettlementEntity } from "./settlement.type";

export abstract class ISettlementRepository {
  abstract getByRef(
    dto: SettlementGetByRefDTO,
    db?: Tx,
  ): Promise<SettlementEntity>;

  abstract searchByRef(
    dto: SettlementSearchByRefDTO,
    db?: Tx,
  ): Promise<SettlementEntity | null>;

  abstract searchList(
    dto: SettlementSearchDTO,
    db?: Tx,
  ): Promise<Array<SettlementEntity>>;
  abstract searchAvailableList(
    dto: SettlementSearchDTO,
    db?: Tx,
  ): Promise<Array<SettlementEntity>>;

  abstract create(dto: SettlementCreateDTO, db?: Tx): Promise<SettlementEntity>;
}
