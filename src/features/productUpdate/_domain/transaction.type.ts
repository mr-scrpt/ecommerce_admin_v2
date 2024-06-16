import { ProductEntity } from "@/entities/product";
import { ProductUpdateTxDTO } from "./types";

export abstract class IProductUpdateTx {
  abstract update(dto: ProductUpdateTxDTO): Promise<ProductEntity>;
}
