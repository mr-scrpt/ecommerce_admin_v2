import {
  PropertyItemRepository,
  PropertyRepository,
} from "@/entities/property";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { PropertyUpdateTx } from "./_tx/propertyUpdate.transaction";
import { UpdatePropertyComplexibleUseCase } from "./_useCase/propertyUpdateComplexible.usecase";

const propertyUpdateContainer = new Container();

export const PropertyUpdateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(PropertyRepository).toSelf();
  bind(PropertyItemRepository).toSelf();
  bind(PropertyUpdateTx).toSelf();
  bind(UpdatePropertyComplexibleUseCase).toSelf();
});

propertyUpdateContainer.load(PropertyUpdateModule);

export default propertyUpdateContainer;
