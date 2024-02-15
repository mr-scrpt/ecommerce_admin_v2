import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import { ProductEntity } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";

type GetProductList = {
  session: SessionEntity;
};

class GetProductListUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: GetProductList): Promise<ProductEntity[]> {
    const { session } = data;
    const { canGetProduct } = createProductAbility(session);

    if (!canGetProduct()) {
      throw new AuthorizatoinError();
    }

    return await this.productRepo.getProductList();
  }
}

export const getProductListUseCase = new GetProductListUseCase(
  productRepository,
);
