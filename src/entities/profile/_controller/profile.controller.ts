import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { ProfileGetService } from "../_service/profileGet.service";
import { profileSchema } from "@/kernel/domain/profile/profile.schema";

const getProfile = z.object({
  id: z.string(),
});

@injectable()
export class ProfileController extends Controller {
  constructor(private readonly getProfileService: ProfileGetService) {
    super();
  }

  public router = router({
    profile: {
      get: publicProcedure.input(getProfile).query(async ({ input }) => {
        console.log("output_log: $$$$$ =>>>", input);
        const result = await this.getProfileService.execute(input);
        return profileSchema.parse(result);
      }),
    },
  });
}
