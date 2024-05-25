import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { profileUpdateSchema } from "../_domain/schema";
import { ProfileUpdateService } from "../_service/profileUpdate.service";
import { profileSchema } from "@/entities/user/profile";

const updateProfileSchema = z.object({
  profileId: z.string(),
  profileData: profileSchema.partial(),
});

@injectable()
export class ProfileUpdateController extends Controller {
  constructor(private readonly updateProfileService: ProfileUpdateService) {
    super();
  }

  public router = router({
    profileUpdate: {
      update: publicProcedure
        .input(updateProfileSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateProfileService.execute(input);
          return profileUpdateSchema.parse(result);
        }),
    },
  });
}
