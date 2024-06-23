import { slugGenerator } from "@/shared/lib/slugGenerator";
import { injectable } from "inversify";
import { merge } from "lodash";
import { ProductUpdateTxDTO, ProductUpdateTxPayload } from "../_domain/types";
import { IProductUpdateTx } from "../_domain/transaction.type";
import { Product } from "@/kernel/domain/product/product.type";

@injectable()
export class ProductUpdateService {
  constructor(private readonly productUpdateTx: IProductUpdateTx) {}

  async execute(payload: ProductUpdateTxPayload): Promise<Product> {
    const productUpdateDTO = this.build(payload);
    return await this.productUpdateTx.update(productUpdateDTO);
  }

  private build(payload: ProductUpdateTxPayload): ProductUpdateTxDTO {
    const {
      productData: { name },
    } = payload;

    const slug = slugGenerator(name);

    return merge({}, payload, {
      productData: {
        ...payload.productData,
        slug,
      },
    });
  }
}
