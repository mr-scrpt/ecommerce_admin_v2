import { ContainerModule } from "inversify";
import { NextAuthConfig } from "./nextAuthConfig";
import { SessionService } from "./session.service";
import { CreateUserService } from "@/shared/session/types";

export const NextAuthModule = new ContainerModule((bind) => {
  bind(NextAuthConfig).toSelf();
  bind(SessionService).toSelf();
  bind(CreateUserService).toSelf();
});
