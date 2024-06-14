import { Property } from "@/entities/property";
import { injectable } from "inversify";
import { IPropertyRemoveTx } from "../_domain/transaction.type";
import { PropertyRemoveTxDTO } from "../_domain/types";

@injectable()
export class PropertyRemoveService {
  constructor(private readonly propertyRemoveTx: IPropertyRemoveTx) {}

  async execute(payload: PropertyRemoveTxDTO): Promise<Property> {
    return await this.propertyRemoveTx.remove(payload);
  }
}
