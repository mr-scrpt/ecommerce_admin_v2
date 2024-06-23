import { ProductEntity } from "@/kernel/domain/product/product.type";
import { ProductUpdateTxDTO } from "./types";

export abstract class IProductUpdateTx {
  abstract update(dto: ProductUpdateTxDTO): Promise<ProductEntity>;
}
