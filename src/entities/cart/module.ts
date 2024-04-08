import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CartRepository } from "./_repository/cart.repo";
import { CartRowRepository } from "./_repository/cartRow.repo";
import { GetCartWithRelationUseCase } from "./_usecase/getCartWithRelation.usecase";
import { GetCartWithRelationByUserIdUseCase } from "./_usecase/getCartWithRelationByUserId.usecase";

const categoryContainer = new Container();

export const CategoryModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(CartRepository).toSelf();
  bind(CartRowRepository).toSelf();
  bind(GetCartWithRelationUseCase).toSelf();
  bind(GetCartWithRelationByUserIdUseCase).toSelf();
});

categoryContainer.load(CategoryModule);

export default categoryContainer;
