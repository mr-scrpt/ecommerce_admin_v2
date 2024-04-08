import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createProductAbility } from "../_domain/product.ability";
import { ProductEntity } from "../_domain/types";
import { ProductRepository } from "../_repository/product.repo";
import { injectable } from "inversify";

type GetProductListById = {
  productListId: Array<string>;
  session: SessionEntity;
};

@injectable()
export class GetProductListByIdUseCase {
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
