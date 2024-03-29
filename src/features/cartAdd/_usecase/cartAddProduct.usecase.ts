import { CartEntity } from "@/entities/cart";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import {
  CartRowAddProductTx,
  cartRowAddProductTx,
} from "../_tx/cartRowAddProduct.transaction";
import { CartRowAddProductComplexible } from "../_domain/types";
import { createCartAbility } from "@/entities/cart/server";

type AddProductCart = {
  dataToAddProduct: CartRowAddProductComplexible;
  session: SessionEntity;
};

class AddCartProductUseCase {
  constructor(private readonly CartRowAddProductTx: CartRowAddProductTx) {}

  async exec(data: AddProductCart): Promise<CartEntity> {
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

    console.log("output_log: cart 444444 =>>>", cart);

    return cart;
  }
}

export const addCartProductUseCase = new AddCartProductUseCase(
  cartRowAddProductTx,
);
