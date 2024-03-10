import { ProductEntity } from "@/entities/product";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { ProductCreateComplexible } from "../_domain/types";
import {
  ProductCreateTx,
  productCreateTx,
} from "../_tx/productCreate.transaction";
import { createProductAbility } from "@/entities/product/server";

type CreateProduct = {
  dataToCreate: ProductCreateComplexible;
  session: SessionEntity;
};

class CreateProductComplexibleUseCase {
  constructor(private readonly productCreateTx: ProductCreateTx) {}

  async exec(data: CreateProduct): Promise<ProductEntity> {
    const { dataToCreate, session } = data;

    const { canCreateProduct } = createProductAbility(session);

    if (!canCreateProduct()) {
      throw new ForbiddenError();
    }

    return await this.productCreateTx.createProductComplexible(dataToCreate);
  }
}

export const createProductComplexibleUseCase =
  new CreateProductComplexibleUseCase(productCreateTx);
