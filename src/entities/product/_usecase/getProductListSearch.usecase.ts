import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import { ProductEntity } from "../_domain/types";
import { ProductRepository } from "../_repository/product.repo";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import { injectable } from "inversify";

type GetProductListSearch = {
  q: string;
  session: SessionEntity;
};

@injectable()
export class GetProductListSearchUseCase {
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

    return await this.productRepo.getListSearch(q);
  }
}
