import { PropertyUpdateTxDTO } from "./types";
import { PropertyEntity } from "@/entities/property";

export abstract class IPropertyUpdateTx {
  abstract update(dto: PropertyUpdateTxDTO): Promise<PropertyEntity>;
}
