import { PropertyEntity } from "@/kernel/domain/property/property.type";
import { PropertyCreateTxDTO } from "./types";

export abstract class IPropertyCreateTx {
  abstract create(dto: PropertyCreateTxDTO): Promise<PropertyEntity>;
}
