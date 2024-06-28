import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IPropertyRemoveTx } from "../_domain/transaction.type";
import { PropertyRemoveTxDTO } from "../_domain/types";
import { PropertyEntity } from "@/kernel/domain/property/property.type";
import {
  IPropertyItemRepository,
  IPropertyRepository,
} from "@/kernel/domain/property/repository.type";

@injectable()
export class PropertyRemoveTx extends Transaction implements IPropertyRemoveTx {
  constructor(
    readonly db: DBClient,
    private readonly propertyRepo: IPropertyRepository,
    private readonly propertyItemRepo: IPropertyItemRepository,
  ) {
    super(db);
  }

  async remove(dto: PropertyRemoveTxDTO): Promise<PropertyEntity> {
    const action = async (tx: Tx) => {
      await this.propertyItemRepo.removeByProperty(dto, tx);

      return await this.propertyRepo.remove(dto, tx);
    };

    return await this.start(action);
  }
}
