import { CartEntity } from "@/entities/cart";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import {
  CartRowChangeCountProductTx,
  cartRowChangeCountProductTx,
} from "../_tx/cartRowChangeCountProduct.transaction";
import { CartRowChangeCountProductComplexible } from "../_domain/types";
import { createCartAbility } from "@/entities/cart/server";

type ChangeCountProductCart = {
  dataToChangeCountProduct: CartRowChangeCountProductComplexible;
  session: SessionEntity;
};

class ChangeCountCartProductUseCase {
  constructor(
    private readonly CartRowChangeCountProductTx: CartRowChangeCountProductTx,
  ) {}

  async exec(data: ChangeCountProductCart): Promise<CartEntity> {
    const { dataToChangeCountProduct, session } = data;
    const { productId, quantity } = dataToChangeCountProduct;

    const { canChangeProduct } = createCartAbility(session);

    if (!canChangeProduct()) {
      throw new ForbiddenError();
    }

    const userId = session.user.id;

    const cart =
      await this.CartRowChangeCountProductTx.changeCountCartRowProductComplexible(
        {
          userId,
          productId,
          quantity,
        },
      );

    return cart;
  }
}

export const changeCountCartProductUseCase = new ChangeCountCartProductUseCase(
  cartRowChangeCountProductTx,
);
