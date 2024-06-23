import { ProductEntity } from "@/kernel/domain/product/product.type";
import { ProductRemoveTxDTO } from "./types";

export abstract class IProductRemoveTx {
  abstract remove(dto: ProductRemoveTxDTO): Promise<ProductEntity>;
}
