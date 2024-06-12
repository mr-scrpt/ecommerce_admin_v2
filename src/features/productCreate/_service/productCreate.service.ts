import { Product } from "@/entities/product";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { injectable } from "inversify";
import { merge } from "lodash";
import { IProductCreateTx } from "../_domain/transaction.type";
import { ProductCreateTxDTO, ProductCreateTxPayload } from "../_domain/types";

@injectable()
export class ProductCreateService {
  constructor(private readonly productCreateTx: IProductCreateTx) {}

  async execute(payload: ProductCreateTxPayload): Promise<Product> {
    const productCreateDTO = this.build(payload);
    return await this.productCreateTx.create(productCreateDTO);
  }

  private build(payload: ProductCreateTxPayload): ProductCreateTxDTO {
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
