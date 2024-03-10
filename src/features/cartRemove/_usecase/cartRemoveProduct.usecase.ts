import { CartEntity } from "@/entities/cart";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import {
  CartRowRemoveProductTx,
  cartRowRemoveProductTx,
} from "../_tx/cartRowRemoveProduct.transaction";
import { CartRowRemoveProductComplexible } from "../_domain/types";
import { createCartAbility } from "@/entities/cart/server";

type RemoveProductCart = {
  dataToRemoveProduct: CartRowRemoveProductComplexible;
  session: SessionEntity;
};

class RemoveCartProductUseCase {
  constructor(
    private readonly CartRowRemoveProductTx: CartRowRemoveProductTx,
  ) {}

  async exec(data: RemoveProductCart): Promise<CartEntity> {
    const { dataToRemoveProduct, session } = data;
    const { productId } = dataToRemoveProduct;
    // console.log("output_log: dataToRemoveProduct =>>>", dataToRemoveProduct);
    // console.log("output_log: session =>>>", session);

    const { canRemoveProduct } = createCartAbility(session);

    if (!canRemoveProduct()) {
      throw new ForbiddenError();
    }

    const userId = session.user.id;

    const cart =
      await this.CartRowRemoveProductTx.removeCartRowProductComplexible({
        userId,
        productId,
      });

    console.log("output_log: cart 444444 =>>>", cart);

    return cart;
  }
}

export const removeCartProductUseCase = new RemoveCartProductUseCase(
  cartRowRemoveProductTx,
);
