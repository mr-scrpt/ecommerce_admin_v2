import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import { ProductId, ProductRelationEntity } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/cart.repo";

type GetProductWithRelation = {
  productId: ProductId;
  session: SessionEntity;
};

class GetProductWithRelationUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: GetProductWithRelation): Promise<ProductRelationEntity> {
    const { productId, session } = data;
    const { canGetProduct } = createProductAbility(session);

    if (!canGetProduct()) {
      throw new AuthorizatoinError();
    }

    return await this.productRepo.getProductWithRelation(productId);
  }
}

export const getProductWithRelationUseCase = new GetProductWithRelationUseCase(
  productRepository,
);
