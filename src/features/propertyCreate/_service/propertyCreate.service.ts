import { injectable } from "inversify";
import { IPropertyCreateTx } from "../_domain/transaction.type";
import { PropertyCreateTxPayload } from "../_domain/types";
import { Property } from "@/kernel/domain/property/property.type";

@injectable()
export class PropertyCreateService {
  constructor(private readonly propertyCreateTx: IPropertyCreateTx) {}

  async execute(payload: PropertyCreateTxPayload): Promise<Property> {
    return await this.propertyCreateTx.create(payload);
  }
}
