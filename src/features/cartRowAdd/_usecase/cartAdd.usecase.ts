import { CartEntity } from "@/entities/cart";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { CartRowAddTx } from "../_tx/cartRowAdd.transaction";
import { CartRowAddComplexible } from "../_domain/types";
import { createCartAbility } from "@/entities/cart/server";
import { injectable } from "inversify";

type AddCartRow = {
  dataToAddProduct: CartRowAddComplexible;
  session: SessionEntity;
};

@injectable()
export class AddCartRowUseCase {
  constructor(private readonly CartRowAddProductTx: CartRowAddTx) {}

  async exec(data: AddCartRow): Promise<CartEntity> {
    const { dataToAddProduct, session } = data;
    const { productId } = dataToAddProduct;

    const { canAddProduct } = createCartAbility(session);

    if (!canAddProduct()) {
      throw new ForbiddenError();
    }

    const userId = session.user.id;

    const cart = await this.CartRowAddProductTx.addCartRowProductComplexible({
      userId,
      productId,
    });

    return cart;
  }
}
