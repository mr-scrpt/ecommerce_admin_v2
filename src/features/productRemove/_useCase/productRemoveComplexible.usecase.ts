import { ForbiddenError } from "@/shared/lib/errors";
import { ProductRemoveTx } from "../_tx/productRemove.transaction";
import { ProductEntity, ProductId } from "@/entities/product";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "@/entities/product/server";
import { injectable } from "inversify";

type RemoveProduct = {
  productId: ProductId;
  session: SessionEntity;
};

@injectable()
export class RemoveProductComplexibleUseCase {
  constructor(private readonly productRemoveTx: ProductRemoveTx) {}

  async exec(data: RemoveProduct): Promise<ProductEntity> {
    const { productId, session } = data;
    const { canRemoveProduct } = createProductAbility(session);

    if (!canRemoveProduct()) {
      throw new ForbiddenError();
    }

    return await this.productRemoveTx.removeProductById(productId);
  }
}
