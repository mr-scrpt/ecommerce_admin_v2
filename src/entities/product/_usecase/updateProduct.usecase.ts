import { ForbiddenError } from "@/shared/lib/errors";
import { Product, ProductEntity, ProductId } from "../_domain/types";
import { SessionEntity } from "@/shared/lib/user";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";
import { createProductAbility } from "../_domain/product.ability";

type Updateproduct = {
  productData: Partial<Product>;
  productId: ProductId;
  session: SessionEntity;
};

class UpdateProductUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: Updateproduct): Promise<ProductEntity> {
    const { productId, productData, session } = data;
    const { canUpdateProduct } = createProductAbility(session);

    if (!canUpdateProduct()) {
      throw new ForbiddenError();
    }

    return await this.productRepo.updateProduct(productId, productData);
  }
}

export const updateProductUseCase = new UpdateProductUseCase(productRepository);
