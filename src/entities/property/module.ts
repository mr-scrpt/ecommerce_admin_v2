import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { PropertyItemRepository } from ".";
import { PropertyController } from "./_controller/property.controller";
import { PropertyRepository } from "./_repository/property.repo";
import { PropertyGetService } from "./_service/property/propertyGet.service";
import { PropertyListGetService } from "./_service/property/propertyListGet.service";
import { PropertyListGetWithRelationByCategoryListService } from "./_service/property/propertyListGetWithRelationByCategory.service";
import { PropertyGetWithRelationService } from "./_service/property/propertyWithRelationGet.service";
import {
  IPropertyItemRepository,
  IPropertyRepository,
} from "@/kernel/domain/property/repository.type";
import { PropertyListGetByCategoryService } from "./_service/property/propertyListGetByCategory.service";
import { PropertyItemController } from "./_controller/propertyItem.controller";
import { PropertyItemListGetByPropertyService } from "./_service/propertyItem/propertyItemListGetByProperty.service";
import { IPropertyInvariant } from "@/kernel/domain/property/invariant.type";
import { PropertyInvariant } from "./_domain/property/invariant.check";

export const PropertyModule = new ContainerModule((bind) => {
  bind(IPropertyRepository).to(PropertyRepository);
  bind(IPropertyInvariant).to(PropertyInvariant);

  bind(PropertyGetService).toSelf();
  bind(PropertyGetWithRelationService).toSelf();
  bind(PropertyListGetService).toSelf();
  bind(PropertyListGetByCategoryService).toSelf();
  bind(PropertyListGetWithRelationByCategoryListService).toSelf();

  bind(Controller).to(PropertyController);
});

export const PropertyItemModule = new ContainerModule((bind) => {
  bind(IPropertyItemRepository).to(PropertyItemRepository);

  bind(PropertyItemListGetByPropertyService).toSelf();

  bind(Controller).to(PropertyItemController);
});
