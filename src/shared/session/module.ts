import { Container, ContainerModule } from "inversify";
import { NextAuthConfig } from "./nextAuthConfig";
import { SessionService } from "./session.service";

const sessionContainer = new Container();

export const NextAuthModule = new ContainerModule((bind) => {
  bind(SessionService).toSelf();
  bind(NextAuthConfig).toSelf();
});

sessionContainer.load(NextAuthModule);

export { sessionContainer };
