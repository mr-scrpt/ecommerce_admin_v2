import { ContainerModule } from "inversify";
import { SessionGetRelationService } from "./sessionGet.service";
import { SessionGetRelationServiceAbstract } from "@/kernel/lib/nextauth/type";

export const SessionCreateModule = new ContainerModule((bind) => {
  bind(SessionGetRelationServiceAbstract).to(SessionGetRelationService);
});
