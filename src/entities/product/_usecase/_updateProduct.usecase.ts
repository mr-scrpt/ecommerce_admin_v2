import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import { ProductEntity, ProductId, ProductToUpdate } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";

type UpdateProduct = {
  productId: ProductId;
  productData: ProductToUpdate;
  session: SessionEntity;
};

class UpdateProductUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: UpdateProduct): Promise<ProductEntity> {
    const { productId, productData, session } = data;
    const { canUpdateProduct } = createProductAbility(session);
    console.log("output_log:  =>>>", productData);

    if (!canUpdateProduct()) {
      throw new ForbiddenError();
    }

    return await this.productRepo.updateProduct(productId, productData);
  }
}

export const updateProductUseCase = new UpdateProductUseCase(productRepository);
