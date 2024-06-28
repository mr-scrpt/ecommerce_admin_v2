import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  StoreCreateDTO,
  StoreGetBySettlementRefDTO,
  StoreGetDTO,
  StoreRemoveDTO,
  StoreUpdateDTO,
} from "../../../kernel/domain/store/store.dto";
import { IStoreRepository } from "../../../kernel/domain/store/repository.type";
import { StoreEntity } from "@/kernel/domain/store/store.type";
import { StoreRelationEntity } from "../_domain/types";

@injectable()
export class StoreRepository implements IStoreRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: StoreGetDTO, db: Tx = this.db): Promise<StoreEntity> {
    return db.store.findUniqueOrThrow({
      where: dto,
    });
  }

  async getListBySettlementRef(
    dto: StoreGetBySettlementRefDTO,
    db: Tx = this.db,
  ): Promise<Array<StoreEntity>> {
    return db.store.findMany({
      where: dto,
    });
  }
  async getListBySettlementRefWithRelation(
    dto: StoreGetBySettlementRefDTO,
    db: Tx = this.db,
  ): Promise<Array<StoreRelationEntity>> {
    const res = await db.store.findMany({
      where: dto,
      include: {
        settlement: true,
      },
    });
    return res;
  }

  async getList(db: Tx = this.db): Promise<StoreEntity[]> {
    return db.store.findMany();
  }

  async getListWithRelation<T>(db: Tx = this.db): Promise<Array<T>> {
    return db.store.findMany({
      include: {
        settlement: true,
      },
    }) as unknown as Array<T>;
  }

  async getListBySettlement(
    dto: StoreGetBySettlementRefDTO,
    db: Tx = this.db,
  ): Promise<StoreEntity[]> {
    return db.store.findMany({
      where: dto,
    });
  }

  async create(dto: StoreCreateDTO, db: Tx = this.db): Promise<StoreEntity> {
    const { data } = dto;
    return await db.store.create({
      data,
    });
  }

  async update(dto: StoreUpdateDTO, db: Tx = this.db): Promise<StoreEntity> {
    const { data, selector } = dto;
    return await db.store.update({
      where: selector,
      data,
    });
  }

  async remove(dto: StoreRemoveDTO, db: Tx = this.db): Promise<StoreEntity> {
    const { selector } = dto;
    return await db.store.delete({ where: selector });
  }
}
