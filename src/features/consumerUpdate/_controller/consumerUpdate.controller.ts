import { createConsumerAbility } from "@/entities/consumer/server";
import { consumerSchema } from "@/kernel/domain/consumer/consumer.schema";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { ConsumerUpdateService } from "../_service/consumerUpdate.service";

@injectable()
export class ConsumerUpdateController extends Controller {
  constructor(private readonly consumerUpdateService: ConsumerUpdateService) {
    super();
  }

  public router = router({
    consumerUpdate: {
      update: checkAbilityProcedure({
        create: createConsumerAbility,
        check: (ability) => ability.canUpdateConsumer(),
      })
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const consumer = await this.consumerUpdateService.execute(input);

          return consumerSchema.parse(consumer);
        }),
    },
  });
}
