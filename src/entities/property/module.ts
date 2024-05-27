import { Container, ContainerModule } from "inversify";
import { PropertyRepository } from "./_repository/property.repo";
import { PropertyGetService } from "./_service/propertyGet.service";
import { PropertyController } from "./_controller/property.controller";
import { Controller } from "@/kernel/lib/trpc/server";
import { PropertyListGetService } from "./_service/propertyListGet.service";
import { PropertyListWithRelationGetByService } from "./_service/propertyListGetWithRelationBy.service";
import { PropertyGetWithRelationService } from "./_service/propertyWithRelationGet.service";

export const propertyContainer = new Container();

export const PropertyModule = new ContainerModule((bind) => {
  bind(PropertyRepository).toSelf();
  bind(PropertyGetService).toSelf();
  bind(PropertyGetWithRelationService).toSelf();
  bind(PropertyListGetService).toSelf();
  bind(PropertyListWithRelationGetByService).toSelf();

  bind(Controller).to(PropertyController);
});

propertyContainer.load(PropertyModule);
