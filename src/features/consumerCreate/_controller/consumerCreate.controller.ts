import { createConsumerAbility } from "@/entities/consumer/server";
import { consumerSchema } from "@/kernel/domain/consumer/consumer.schema";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { ConsumerCreateService } from "../_service/consumerCreate.service";

@injectable()
export class ConsumerCreateController extends Controller {
  constructor(private readonly consumerCreateService: ConsumerCreateService) {
    super();
  }

  public router = router({
    consumerCreate: {
      create: checkAbilityProcedure({
        create: createConsumerAbility,
        check: (ability) => {
          return ability.canCreateConsumer();
        },
      })
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const consumer = await this.consumerCreateService.execute(input);

          return consumerSchema.parse(consumer);
        }),
    },
  });
}
