import { injectable } from "inversify";
import { SessionWithDataPayload } from "./types";

@injectable()
export class SessionWithDataService implements UserCreateServiceAbstract {
  constructor(private readonly userGet: UserCreateTx) {}

  async execute(payload: SessionWithDataPayload): Promise<UserEntity> {}
}
