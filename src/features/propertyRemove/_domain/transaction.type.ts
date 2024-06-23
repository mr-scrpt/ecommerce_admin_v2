import { PropertyEntity } from "@/kernel/domain/property/property.type";
import { PropertyRemoveTxDTO } from "./types";

export abstract class IPropertyRemoveTx {
  abstract remove(dto: PropertyRemoveTxDTO): Promise<PropertyEntity>;
}
