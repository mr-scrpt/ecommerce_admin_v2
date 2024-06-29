import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { storeSchema } from "@/kernel/domain/store/store.schema";
import { StoreCreateService } from "../_service/storeCreate.service";

@injectable()
export class StoreCreateController extends Controller {
  constructor(private readonly createStoreService: StoreCreateService) {
    super();
  }

  public router = router({
    storeCreate: {
      create: publicProcedure
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createStoreService.execute(input);
          return storeSchema.parse(result);
        }),
    },
  });
}
