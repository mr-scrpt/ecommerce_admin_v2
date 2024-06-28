import { userSchema } from "@/kernel/domain/user/user.schema";
import { IUserCreateService } from "@/kernel/lib/nextauth/type";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { registrationInputSchema } from "../_domain/validator.schema";

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
    },
  });
}
