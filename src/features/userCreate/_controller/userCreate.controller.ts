import { userSchema } from "@/entities/user/user";
import { IUserCreateService } from "@/kernel/lib/nextauth/type";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";

@injectable()
export class UserCreateController extends Controller {
  constructor(private readonly userCreateService: IUserCreateService) {
    super();
  }

  public router = router({
    userCreate: {
      create: publicProcedure.input(createInputSchema).mutation(({ input }) => {
        const user = this.userCreateService.execute(input);

        return userSchema.parse(user);
      }),
    },
  });
}
