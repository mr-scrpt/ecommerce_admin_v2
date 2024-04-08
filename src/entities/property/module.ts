import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { PropertyRepository } from "./_repository/property.repo";
import { GetPropertyUseCase } from "./_usecase/property/getProperty.usecase";
import { GetPropertyListUseCase } from "./_usecase/property/getPropertyList.usecase";
import { GetPropertyWithRelationUseCase } from "./_usecase/property/getPropertyWithRelation.usecase";
import { GetPropertyWithRelationByCategoryUseCase } from "./_usecase/property/getPropertyWithRelationByCategory.usecase";

const propertyContainer = new Container();

export const PropertyModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(PropertyRepository).toSelf();
  bind(GetPropertyUseCase).toSelf();
  bind(GetPropertyListUseCase).toSelf();
  bind(GetPropertyWithRelationUseCase).toSelf();
  bind(GetPropertyWithRelationByCategoryUseCase).toSelf();
});

propertyContainer.load(PropertyModule);

export default propertyContainer;
