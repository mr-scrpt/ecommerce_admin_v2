import { createStoreAbility } from "@/entities/store/server";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { removeInputSchema } from "../_domain/validator.schema";
import { StoreRemoveService } from "../_service/storeRemove.service";
import { storeSchema } from "@/kernel/domain/store/store.schema";

@injectable()
export class StoreRemoveController extends Controller {
  constructor(private readonly removeStoreService: StoreRemoveService) {
    super();
  }

  public router = router({
    storeRemove: {
      remove: checkAbilityProcedure({
        create: createStoreAbility,
        check: (ability) => ability.canRemoveStore(),
      })
        .input(removeInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.removeStoreService.execute(input);

          return storeSchema.parse(result);
        }),
    },
  });
}
