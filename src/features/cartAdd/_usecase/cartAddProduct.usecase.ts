import { CartEntity, createCartAbility } from "@/entities/cart";
import { CartToAddProduct } from "@/entities/cart/_domain/types";
import { CartRepository, cartRepository } from "@/entities/cart/server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";

type AddProductCart = {
  dataToAddProduct: CartToAddProduct;
  session: SessionEntity;
};

class AddProductCartUseCase {
  constructor(private readonly cartRepo: CartRepository) {}

  async exec(data: AddProductCart): Promise<CartEntity> {
    const { dataToAddProduct, session } = data;
    console.log("output_log: data to create =>>>", dataToAddProduct);

    const { canAddProduct } = createCartAbility(session);

    if (!canAddProduct()) {
      throw new ForbiddenError();
    }

    return await this.cartRepo.addProductCart(dataToAddProduct);
  }
}

export const addProductCartUseCase = new AddProductCartUseCase(cartRepository);
