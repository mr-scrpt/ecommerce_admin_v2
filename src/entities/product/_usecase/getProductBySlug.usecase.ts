import { ProductEntity, ProductId } from "../_domain/types";
import { ProductRepository } from "../_repository/product.repo";
import { createProductAbility } from "../_domain/product.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";

type Getproduct = {
  productSlug: ProductId;
  session: SessionEntity;
};

@injectable()
export class GetproductBySlugUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async exec(data: Getproduct): Promise<ProductEntity> {
    const { productSlug, session } = data;
    const { canGetProduct } = createProductAbility(session);

    if (!canGetProduct()) {
      throw new AuthorizatoinError();
    }

    return await this.productRepo.getBySlug(productSlug);
  }
}
