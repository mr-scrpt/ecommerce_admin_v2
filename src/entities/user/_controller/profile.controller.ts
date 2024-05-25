import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { profileSchema } from "../profile";
import { ProfileGetService } from "../_service/profileGet.service";

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
        const result = await this.getProfileService.execute(input);
        return profileSchema.parse(result);
      }),
    },
  });
}
