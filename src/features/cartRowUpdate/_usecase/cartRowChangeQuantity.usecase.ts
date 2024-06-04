import { CartEntity } from "@/entities/cart";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { CartRowChangeQuantityTx } from "../_tx/cartRowUpdate.transaction";
import { CartRowChangeQuantityComplexible } from "../_domain/types";
import { createCartAbility } from "@/entities/cart/server";
import { injectable } from "inversify";

type ChangeQuantityCartRow = {
  dataToChangeCountProduct: CartRowChangeQuantityComplexible;
  session: SessionEntity;
};

@injectable()
export class ChangeQuantityCartRowUseCase {
  constructor(
    private readonly CartRowChangeCountProductTx: CartRowChangeQuantityTx,
  ) {}

  async exec(data: ChangeQuantityCartRow): Promise<CartEntity> {
    const { dataToChangeCountProduct, session } = data;
    const { productId, quantity } = dataToChangeCountProduct;

    const { canChangeProduct } = createCartAbility(session);

    if (!canChangeProduct()) {
      throw new ForbiddenError();
    }

    const userId = session.user.id;

    const cart =
      await this.CartRowChangeCountProductTx.changeQuantityCartRowComplexible({
        userId,
        productId,
        quantity,
      });

    return cart;
  }
}
