import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { storeSchema } from "@/kernel/domain/store/store.schema";
import { updateInputSchema } from "../_domain/validator";
import { StoreUpdateService } from "../_service/storeUpdate.service";

@injectable()
export class StoreUpdateController extends Controller {
  constructor(private readonly updateStoreService: StoreUpdateService) {
    super();
  }

  public router = router({
    storeUpdate: {
      update: publicProcedure
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateStoreService.execute(input);
          return storeSchema.parse(result);
        }),
    },
  });
}
