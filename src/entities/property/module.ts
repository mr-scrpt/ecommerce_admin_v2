import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { PropertyItemRepository } from ".";
import { PropertyController } from "./_controller/property.controller";
import { IPropertyRepository } from "./_domain/property/repository.type";
import { IPropertyItemRepository } from "./_domain/propertyItem/repository.type";
import { PropertyRepository } from "./_repository/property.repo";
import { PropertyGetService } from "./_service/propertyGet.service";
import { PropertyListGetService } from "./_service/propertyListGet.service";
import { PropertyListGetWithRelationByCategoryListService } from "./_service/propertyListGetWithRelationByCategory.service";
import { PropertyGetWithRelationService } from "./_service/propertyWithRelationGet.service";

export const PropertyModule = new ContainerModule((bind) => {
  bind(IPropertyRepository).to(PropertyRepository);
  bind(IPropertyItemRepository).to(PropertyItemRepository);

  bind(PropertyGetService).toSelf();
  bind(PropertyGetWithRelationService).toSelf();
  bind(PropertyListGetService).toSelf();
  bind(PropertyListGetWithRelationByCategoryListService).toSelf();

  bind(Controller).to(PropertyController);
});
