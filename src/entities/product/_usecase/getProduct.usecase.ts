import { ProductEntity, ProductId } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";
import { createProductAbility } from "../_domain/product.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";

type GetProduct = {
  productId: ProductId;
  session: SessionEntity;
};

class GetProductUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: GetProduct): Promise<ProductEntity> {
    const { productId, session } = data;
    const { canGetProduct } = createProductAbility(session);

    if (!canGetProduct()) {
      throw new AuthorizatoinError();
    }

    return await this.productRepo.getProduct(productId);
  }
}

export const getProductUseCase = new GetProductUseCase(productRepository);
