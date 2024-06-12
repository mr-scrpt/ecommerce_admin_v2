import { ProductEntity } from "@/entities/product";
import { ProductCreateTxDTO } from "./types";

export abstract class IProductCreateTx {
  abstract create(dto: ProductCreateTxDTO): Promise<ProductEntity>;
}
