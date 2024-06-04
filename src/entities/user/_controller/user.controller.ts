import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { userSchema } from "../user";
import { UserGetService } from "../_service/userGet.service";
import { UserListGetService } from "../_service/userListGet.service";

const getUser = z.object({
  id: z.string(),
});

@injectable()
export class UserController extends Controller {
  constructor(
    private readonly getUserService: UserGetService,
    private readonly getUserListService: UserListGetService,
  ) {
    super();
  }

  public router = router({
    user: {
      get: publicProcedure.input(getUser).query(async ({ input }) => {
        const result = await this.getUserService.execute(input);
        return userSchema.parse(result);
      }),
      getList: publicProcedure.query(async () => {
        const result = await this.getUserListService.execute();
        return userSchema.array().parse(result);
      }),
    },
  });
}
