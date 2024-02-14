import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import { Product, ProductEntity } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";

type CreateProduct = {
  session: SessionEntity;
  productData: Product;
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
