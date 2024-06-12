import { userSchema } from "@/entities/user/user";
import { IUserCreateService } from "@/kernel/lib/nextauth/type";
import {
  Controller,
  checkAbilityProcedure,
  publicProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  createInputSchema,
  registrationInputSchema,
} from "../_domain/validator.schema";
import { createUserAbility } from "@/entities/user/user.server";

@injectable()
export class UserCreateController extends Controller {
  constructor(private readonly userCreateService: IUserCreateService) {
    super();
  }

  public router = router({
    userCreate: {
      registration: publicProcedure
        .input(registrationInputSchema)
        .mutation(async ({ input }) => {
          const user = await this.userCreateService.execute(input);

          return userSchema.parse(user);
        }),
      create: checkAbilityProcedure({
        create: createUserAbility,
        check: (ability) => ability.canCreateUser(),
      })
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const user = await this.userCreateService.execute(input);

          return userSchema.parse(user);
        }),
    },
  });
}
