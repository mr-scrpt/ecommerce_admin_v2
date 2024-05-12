import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property";
import { Container, ContainerModule } from "inversify";
import { PropertyCreateTx } from "./_tx/propertyCreate.transaction";
import { CreatePropertyComplexibleUseCase } from "./_useCase/propertyCreateComplexible.usecase";

export const propertyCreateContainer = new Container();

export const PropertyCreateModule = new ContainerModule((bind) => {
  bind(PropertyRepository).toSelf();
  bind(PropertyItemRepository).toSelf();
  bind(PropertyCreateTx).toSelf();
  bind(CreatePropertyComplexibleUseCase).toSelf();
});

propertyCreateContainer.load(PropertyCreateModule);
