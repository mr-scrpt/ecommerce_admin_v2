import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { ProfileUpdateService } from "../_service/profileUpdate.service";
import { profileSchema } from "@/kernel/domain/profile/profile.schema";

@injectable()
export class ProfileUpdateController extends Controller {
  constructor(private readonly updateProfileService: ProfileUpdateService) {
    super();
  }

  public router = router({
    profileUpdate: {
      update: publicProcedure
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateProfileService.execute(input);
          return profileSchema.parse(result);
        }),
    },
  });
}
