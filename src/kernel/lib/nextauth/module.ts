import { ContainerModule } from "inversify";
import { NextAuthConfig } from "./nextAuthConfig";
import { SessionService } from "./session.service";
// import { UserCreateService } from "./type";

export const NextAuthModule = new ContainerModule((bind) => {
  bind(NextAuthConfig).toSelf();
  bind(SessionService).toSelf();
  // bind(UserCreateService).toSelf();
});
