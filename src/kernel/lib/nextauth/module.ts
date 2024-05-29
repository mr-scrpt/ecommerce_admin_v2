import { ContainerModule } from "inversify";
import { NextAuthConfig } from "./nextAuthConfig";
import { SessionService } from "./session.service";

export const NextAuthModule = new ContainerModule((bind) => {
  bind(NextAuthConfig).toSelf();
  bind(SessionService).toSelf();
});
