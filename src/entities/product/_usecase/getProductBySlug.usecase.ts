import { ProductEntity, ProductId } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";
import { createProductAbility } from "../_domain/product.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";

type Getproduct = {
  productSlug: ProductId;
  session: SessionEntity;
};

class GetproductBySlugUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: Getproduct): Promise<ProductEntity> {
    const { productSlug, session } = data;
    const { canGetProduct } = createProductAbility(session);

    if (!canGetProduct()) {
      throw new AuthorizatoinError();
    }

    return await this.productRepo.getProductBySlug(productSlug);
  }
}

export const getProductBySlugUseCase = new GetproductBySlugUseCase(
  productRepository,
);
