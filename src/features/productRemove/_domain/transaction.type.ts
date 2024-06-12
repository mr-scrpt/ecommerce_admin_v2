import { ProductEntity } from "@/entities/product";
import { ProductRemoveTxDTO } from "./types";

export abstract class IProductRemoveTx {
  abstract remove(dto: ProductRemoveTxDTO): Promise<ProductEntity>;
}
