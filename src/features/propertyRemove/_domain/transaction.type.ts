import { PropertyEntity } from "@/entities/property";
import { PropertyRemoveTxDTO } from "./types";

export abstract class IPropertyRemoveTx {
  abstract remove(dto: PropertyRemoveTxDTO): Promise<PropertyEntity>;
}
