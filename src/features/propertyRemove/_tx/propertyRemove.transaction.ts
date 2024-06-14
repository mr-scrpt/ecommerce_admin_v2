import { PropertyEntity } from "@/entities/property";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IPropertyRemoveTx } from "../_domain/transaction.type";
import {
  IPropertyItemRepository,
  IPropertyRepository,
} from "@/entities/property/server";
import { PropertyRemoveTxDTO } from "../_domain/types";

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
