import { userSchema } from "@/entities/user/user";
import { ROLES } from "@/kernel/domain/role.type";
import { UserCreateServiceAbstract } from "@/kernel/lib/nextauth/type";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { userCreateSchema } from "../_domain/schema";

@injectable()
export class UserCreateController extends Controller {
  constructor(private readonly userCreateService: UserCreateServiceAbstract) {
    super();
  }

  public router = router({
    userCreate: {
      create: publicProcedure.input(userCreateSchema).mutation(({ input }) => {
        const user = this.userCreateService.execute({
          ...input,
          role: ROLES.USER,
        });

        return userSchema.parse(user);
      }),
    },
  });
}
