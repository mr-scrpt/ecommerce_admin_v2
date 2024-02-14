import { ForbiddenError } from "@/shared/lib/errors";
import { product, productEntity, productId } from "../_domain/types";
import { SessionEntity } from "@/shared/lib/user";
import {
  productRepository,
  productRepository,
} from "../_repository/product.repo";
import { createproductAbility } from "../_domain/product.ability";

type Updateproduct = {
  productId: productId;
  productData: Partial<product>;
  session: SessionEntity;
};

class UpdateproductUseCase {
  constructor(private readonly productRepo: productRepository) {}

  async exec(data: Updateproduct): Promise<productEntity> {
    const { productId, productData, session } = data;
    const { canUpdateproduct } = createproductAbility(session);

    if (!canUpdateproduct()) {
      throw new ForbiddenError();
    }

    return await this.productRepo.updateproduct(productId, productData);
  }
}

export const updateproductUseCase = new UpdateproductUseCase(productRepository);
