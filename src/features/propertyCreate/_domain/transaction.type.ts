import { PropertyCreateTxDTO } from "./types";
import { PropertyEntity } from "@/entities/property";

export abstract class IPropertyCreateTx {
  abstract create(dto: PropertyCreateTxDTO): Promise<PropertyEntity>;
}
