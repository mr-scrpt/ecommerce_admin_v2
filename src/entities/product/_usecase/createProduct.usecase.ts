import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import {
  ProductEntity,
  ProductRelation,
  ProductToCreate,
} from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";

type CreateProduct = {
  session: SessionEntity;
  productData: ProductToCreate;
};

class CreateProductUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: CreateProduct): Promise<ProductEntity> {
    const { productData, session } = data;
    const { canCreateProduct } = createProductAbility(session);

    if (!canCreateProduct()) {
      throw new AuthorizatoinError();
    }

    return await this.productRepo.createProduct(productData);
  }
}

export const createProductUseCase = new CreateProductUseCase(productRepository);
