import { CartEntity } from "@/entities/cart";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { CartRowRemoveProductTx } from "../_tx/cartRowRemove.transaction";
import { CartRowRemoveProductComplexible } from "../_domain/types";
import { createCartAbility } from "@/entities/cart/server";

type RemoveRowCart = {
  dataToRemoveProduct: CartRowRemoveProductComplexible;
  session: SessionEntity;
};

export class RemoveCartRowUseCase {
  constructor(
    private readonly CartRowRemoveProductTx: CartRowRemoveProductTx,
  ) {}

  async exec(data: RemoveRowCart): Promise<CartEntity> {
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
