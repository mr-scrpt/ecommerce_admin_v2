import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import { ProductEntity } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "../_repository/product.repo";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";

type GetProductListSearch = {
  q: string;
  session: SessionEntity;
};

class GetProductListSearchUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: GetProductListSearch): Promise<ProductEntity[]> {
    const { session, q } = data;
    const { canGetProduct } = createProductAbility(session);

    if (!canGetProduct()) {
      throw new AuthorizatoinError();
    }

    if (!q || q === "" || q.length < SEARCH_MIN_LENGTH) {
      return [];
    }
    return await this.productRepo.getProductListSearch(q);
  }
}

export const getProductListSearchUseCase = new GetProductListSearchUseCase(
  productRepository,
);
