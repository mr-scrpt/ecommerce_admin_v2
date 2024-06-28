import { createConsumerAbility } from "@/entities/consumer/server";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { removeInputSchema } from "../_domain/validator.schema";
import { ConsumerRemoveService } from "../_service/consumerRemove.service";
import { consumerRemoveSchema } from "../_domain/schema";

@injectable()
export class ConsumerRemoveController extends Controller {
  constructor(private readonly consumerRemoveService: ConsumerRemoveService) {
    super();
  }

  public router = router({
    consumerRemove: {
      remove: checkAbilityProcedure({
        create: createConsumerAbility,
        check: (ability) => {
          return ability.canRemoveConsumer();
        },
      })
        .input(removeInputSchema)
        .mutation(async ({ input }) => {
          const consumer = await this.consumerRemoveService.execute(input);
          return consumerRemoveSchema.parse(consumer);
        }),
    },
  });
}
