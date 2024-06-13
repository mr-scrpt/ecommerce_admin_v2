import { Tx } from "@/shared/lib/db/db";
import { SettlementEntity } from "../_domain/settlement.type";
import {
  SettlementCreateDTO,
  SettlementGetByRefDTO,
  SettlementSearchDTO,
} from "./settlement.dto";

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
