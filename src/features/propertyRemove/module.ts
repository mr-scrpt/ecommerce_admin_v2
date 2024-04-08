import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { PropertyRemoveTx } from "./_tx/propertyRemove.transaction";
import { RemovePropertyComplexibleUseCase } from "./_useCase/propertyRemoveComplexible.usecase";

const propertyRemoveContainer = new Container();

export const PropertyCreateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(PropertyRepository).toSelf();
  bind(PropertyItemRepository).toSelf();
  bind(PropertyRemoveTx).toSelf();
  bind(RemovePropertyComplexibleUseCase).toSelf();
});

propertyRemoveContainer.load(PropertyCreateModule);

export default propertyRemoveContainer;
