import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { getByOrderInputSchema } from "../_domain/validator.schema";
import { consumerSchema } from "@/entities/consumer/server";
import { ConsumerDataGetByOrderService } from "../_service/consumerDataGetByOrder.service";

@injectable()
export class ConsumerDataCreateController extends Controller {
  constructor(
    private readonly getConsumerDataByOrderService: ConsumerDataGetByOrderService,
  ) {
    super();
  }

  public router = router({
    consumerData: {
      getByOrder: publicProcedure
        .input(getByOrderInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getConsumerDataByOrderService.execute(input);
          console.log("output_log: before =>>>", result);
          return consumerSchema.parse(result);
        }),
    },
  });
}
