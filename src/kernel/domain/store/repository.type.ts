import { Tx } from "@/shared/lib/db/db";
import {
  StoreCreateDTO,
  StoreGetBySettlementRefDTO,
  StoreGetDTO,
  StoreRemoveDTO,
  StoreUpdateDTO,
} from "./store.dto";
import { StoreEntity } from "@/kernel/domain/store/store.type";
import { StoreRelationEntity } from "../../../entities/store/_domain/types";

export abstract class IStoreRepository {
  abstract get(dto: StoreGetDTO, db?: Tx): Promise<StoreEntity>;

  abstract getListBySettlementRef(
    dto: StoreGetBySettlementRefDTO,
    db?: Tx,
  ): Promise<Array<StoreEntity>>;

  abstract getListBySettlementRefWithRelation(
    dto: StoreGetBySettlementRefDTO,
    db?: Tx,
  ): Promise<Array<StoreRelationEntity>>;

  abstract getList(db?: Tx): Promise<StoreEntity[]>;

  abstract getListWithRelation<T>(db?: Tx): Promise<Array<T>>;

  abstract getListBySettlement(
    dto: StoreGetBySettlementRefDTO,
    db?: Tx,
  ): Promise<StoreEntity[]>;

  abstract create(dto: StoreCreateDTO, db?: Tx): Promise<StoreEntity>;

  abstract update(dto: StoreUpdateDTO, db?: Tx): Promise<StoreEntity>;

  abstract remove(dto: StoreRemoveDTO, db?: Tx): Promise<StoreEntity>;
}
