import { userSchema } from "@/entities/user/user";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { userCreateSchema } from "../_domain/schema";
import { UserCreateService } from "../_service/userCreate.service";
import { ROLES } from "@/kernel/domain/role.type";
import { UserCreateServiceAbstract } from "@/kernel/lib/nextauth/type";

@injectable()
export class UserCreateController extends Controller {
  constructor(private readonly userCreateService: UserCreateServiceAbstract) {
    super();
  }

  public router = router({
    userCreate: {
      create: publicProcedure
        .input(userCreateSchema)
        .output(userSchema)
        .mutation(({ input }) => {
          const user = this.userCreateService.execute({
            ...input,
            role: ROLES.USER,
          });

          return userSchema.parseAsync(user);
        }),
    },
  });
}
