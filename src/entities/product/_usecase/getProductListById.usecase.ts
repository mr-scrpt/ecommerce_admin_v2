import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import { ProductEntity } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";

type GetProductListById = {
  productListId: Array<string>;
  session: SessionEntity;
};

class GetProductListByIdUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: GetProductListById): Promise<ProductEntity[]> {
    const { session, productListId } = data;
    const { canGetProduct } = createProductAbility(session);

    if (!canGetProduct()) {
      throw new AuthorizatoinError();
    }

    return await this.productRepo.getProductListById(productListId);
  }
}

export const getProductListByIdUseCase = new GetProductListByIdUseCase(
  productRepository,
);
