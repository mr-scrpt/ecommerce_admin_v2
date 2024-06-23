import { ProductEntity } from "@/kernel/domain/product/product.type";
import { ProductCreateTxDTO } from "./types";

export abstract class IProductCreateTx {
  abstract create(dto: ProductCreateTxDTO): Promise<ProductEntity>;
}
