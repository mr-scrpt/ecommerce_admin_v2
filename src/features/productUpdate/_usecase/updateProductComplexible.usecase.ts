import { ProductEntity } from "@/entities/product";
import { createProductAbility } from "@/entities/product/server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { ProductUpdateComplexible } from "../_domain/types";
import {
  ProductUpdateTx,
  productUpdateTx,
} from "../_tx/productUpdate.transaction";

type UpdateProduct = {
  dataToUpdate: ProductUpdateComplexible;
  session: SessionEntity;
};

class UpdateProductComplexibleUseCase {
  constructor(private readonly productUpdateTx: ProductUpdateTx) {}

  async exec(data: UpdateProduct): Promise<ProductEntity> {
    const { dataToUpdate, session } = data;
    const { canUpdateProduct } = createProductAbility(session);

    if (!canUpdateProduct()) {
      throw new ForbiddenError();
    }

    return await this.productUpdateTx.updateProductComplexible(dataToUpdate);
  }
}

export const updateProductComplexibleUseCase =
  new UpdateProductComplexibleUseCase(productUpdateTx);
