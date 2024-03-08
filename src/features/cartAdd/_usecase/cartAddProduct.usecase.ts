import { CartEntity, createCartAbility } from "@/entities/cart";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import {
  CartRowAddProductTx,
  cartRowAddProductTx,
} from "../_tx/cartRowAddProduct.transaction";
import { CartRowAddProductComplexible } from "../_domain/types";

type AddProductCart = {
  dataToAddProduct: CartRowAddProductComplexible;
  session: SessionEntity;
};

class AddCartProductUseCase {
  constructor(private readonly CartRowAddProductTx: CartRowAddProductTx) {}

  async exec(data: AddProductCart): Promise<CartEntity> {
    console.log("output_log:  =>>> in usecase");
    const { dataToAddProduct, session } = data;
    const { productId, quantity } = dataToAddProduct;

    const { canAddProduct } = createCartAbility(session);

    if (!canAddProduct()) {
      throw new ForbiddenError();
    }

    const userId = session.user.id;

    const cart = await this.CartRowAddProductTx.addCartRowProductComplexible({
      userId,
      productId,
      quantity,
    });

    return cart;
  }
}

export const addCartProductUseCase = new AddCartProductUseCase(
  cartRowAddProductTx,
);
