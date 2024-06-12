import { ProductEntity } from "@/entities/product";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { ProductCreateComplexible } from "../_domain/types";
import { ProductCreateTx } from "../_tx/productCreate.transaction";
import { createProductAbility } from "@/entities/product/server";
import { injectable } from "inversify";

type CreateProduct = {
  dataToCreate: ProductCreateComplexible;
  session: SessionEntity;
};

@injectable()
export class CreateProductComplexibleUseCase {
  constructor(private readonly productCreateTx: ProductCreateTx) {}

  async exec(data: CreateProduct): Promise<ProductEntity> {
    const { dataToCreate, session } = data;

    const { canCreateProduct } = createProductAbility(session);

    if (!canCreateProduct()) {
      throw new ForbiddenError();
    }

    return await this.productCreateTx.create(dataToCreate);
  }
}
