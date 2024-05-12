import { Container, ContainerModule } from "inversify";
import { CartRepository } from "./_repository/cart.repo";
import { CartRowRepository } from "./_repository/cartRow.repo";
import { GetCartWithRelationUseCase } from "./_usecase/getCartWithRelation.usecase";
import { GetCartWithRelationByUserIdUseCase } from "./_usecase/getCartWithRelationByUserId.usecase";

export const cartContainer = new Container();

export const CartModule = new ContainerModule((bind) => {
  bind(CartRepository).toSelf();
  bind(CartRowRepository).toSelf();
  bind(GetCartWithRelationUseCase).toSelf();
  bind(GetCartWithRelationByUserIdUseCase).toSelf();
});

cartContainer.load(CartModule);

// export default cartContainer;
