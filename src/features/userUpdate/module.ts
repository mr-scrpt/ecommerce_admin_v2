import { ContainerModule } from "inversify";
import { UserUpdateTx } from "./_tx/userUpdate.transaction";

export const UserUpdateModule = new ContainerModule((bind) => {
  bind(UserUpdateTx).toSelf();
  // bind(UserRepository).toSelf();
});
