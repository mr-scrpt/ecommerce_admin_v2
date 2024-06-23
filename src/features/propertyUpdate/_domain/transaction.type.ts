import { PropertyEntity } from "@/kernel/domain/property/property.type";
import { PropertyUpdateTxDTO } from "./types";

export abstract class IPropertyUpdateTx {
  abstract update(dto: PropertyUpdateTxDTO): Promise<PropertyEntity>;
}
