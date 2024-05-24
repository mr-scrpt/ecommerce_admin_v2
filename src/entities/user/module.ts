import { ContainerModule } from "inversify";
import { ProfileRepository } from "./_repository/profile.repo";
import { UserRepository } from "./_repository/user.repo";

export const UserModule = new ContainerModule((bind) => {
  bind(UserRepository).toSelf();
  bind(ProfileRepository).toSelf();
});
