import { ContainerModule } from "inversify";
import { SessionGetRelationService } from "./sessionGet.service";
import { ISessionGetRelationService } from "@/kernel/lib/nextauth/type";

export const SessionCreateModule = new ContainerModule((bind) => {
  bind(ISessionGetRelationService).to(SessionGetRelationService);
});
