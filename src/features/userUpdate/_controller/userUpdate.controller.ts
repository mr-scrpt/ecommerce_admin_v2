import { userSchema } from "@/entities/user/user";
import { createUserAbility } from "@/entities/user/user.server";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { UserUpdateService } from "../_service/userUpdate.service";

@injectable()
export class UserUpdateController extends Controller {
  constructor(private readonly userUpdateService: UserUpdateService) {
    super();
  }

  public router = router({
    userUpdate: {
      update: checkAbilityProcedure({
        create: createUserAbility,
        check: (ability) => ability.canUpdateUser(),
      })
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const user = await this.userUpdateService.execute(input);

          return userSchema.parse(user);
        }),
    },
  });
}
