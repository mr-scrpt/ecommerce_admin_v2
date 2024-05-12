import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property";
import { Container, ContainerModule } from "inversify";
import { PropertyRemoveTx } from "./_tx/propertyRemove.transaction";
import { RemovePropertyComplexibleUseCase } from "./_useCase/propertyRemoveComplexible.usecase";

export const propertyRemoveContainer = new Container();

export const PropertyCreateModule = new ContainerModule((bind) => {
  bind(PropertyRepository).toSelf();
  bind(PropertyItemRepository).toSelf();
  bind(PropertyRemoveTx).toSelf();
  bind(RemovePropertyComplexibleUseCase).toSelf();
});
