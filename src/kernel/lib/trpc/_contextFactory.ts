import { injectable } from "inversify";
import { SessionService } from "../nextauth/session.service";

@injectable()
export class ContextFactory {
  constructor(private sessionService: SessionService) {}

  createContext = async () => {
    const session = await this.sessionService.get();

    return {
      session,
    };
  };
}
