import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property";
import { Container, ContainerModule } from "inversify";
import { PropertyUpdateTx } from "./_tx/propertyUpdate.transaction";
import { UpdatePropertyComplexibleUseCase } from "./_useCase/propertyUpdateComplexible.usecase";

export const propertyUpdateContainer = new Container();

export const PropertyUpdateModule = new ContainerModule((bind) => {
  bind(PropertyRepository).toSelf();
  bind(PropertyItemRepository).toSelf();
  bind(PropertyUpdateTx).toSelf();
  bind(UpdatePropertyComplexibleUseCase).toSelf();
});

propertyUpdateContainer.load(PropertyUpdateModule);
