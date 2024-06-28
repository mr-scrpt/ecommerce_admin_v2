import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { PropertyCreateTxDTO } from "../_domain/types";
import { IPropertyCreateTx } from "../_domain/transaction.type";
import { PropertyRelationEntity } from "@/entities/property";
import {
  IPropertyItemRepository,
  IPropertyRepository,
} from "@/kernel/domain/property/repository.type";

@injectable()
export class PropertyCreateTx extends Transaction implements IPropertyCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly propertyRepo: IPropertyRepository,
    private readonly propertyItemRepo: IPropertyItemRepository,
  ) {
    super(db);
  }

  async create(dto: PropertyCreateTxDTO): Promise<PropertyRelationEntity> {
    const action = async (tx: Tx): Promise<PropertyRelationEntity> => {
      const { propertyItemData, propertyData } = dto;

      const { id } = await this.propertyRepo.create({ data: propertyData }, tx);

      const propertyItemListCreated = [];

      for await (const item of propertyItemData) {
        const itemCreated = await this.propertyItemRepo.create(
          { data: { ...item, propertyId: id } },
          tx,
        );
        propertyItemListCreated.push(itemCreated);
      }

      return await this.propertyRepo.getWithRelation({ id }, tx);
    };

    return await this.start(action);
  }
}
