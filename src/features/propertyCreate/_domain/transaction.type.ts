import { PropertyRelationEntity } from "@/entities/property";
import { PropertyCreateTxDTO } from "./types";

export abstract class IPropertyCreateTx {
  abstract create(dto: PropertyCreateTxDTO): Promise<PropertyRelationEntity>;
}
