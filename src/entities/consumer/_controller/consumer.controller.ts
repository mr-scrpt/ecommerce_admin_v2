import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { consumerRelationSchema } from "../_domain/consumer.schema";
import {
  getByOrderInputSchema,
  getInputSchema,
  getListOutputSchema,
  getRelationListOutputSchema,
  searchInputSchema,
  searchOutputSchema,
} from "../_domain/validator.schema";
import { ConsumerListService } from "../_service/consumerList.service";
import { ConsumerListSearchService } from "../_service/consumerListSearch.service";
import { ConsumerRelationGetByOrderService } from "../_service/consumerRelationGetByOrder.service";
import { consumerSchema } from "@/kernel/domain/consumer/consumer.schema";
import { ConsumerGetService } from "../_service/consumerGet.service";
import { ConsumerGetByOrderService } from "../_service/consumerGetByOrder.service";
import { ConsumerRelationListService } from "../_service/consumerRelationList.service";

@injectable()
export class ConsumerController extends Controller {
  constructor(
    private readonly getConsumerService: ConsumerGetService,
    private readonly getConsumerRelationListService: ConsumerRelationListService,
    private readonly getConsumerRelationByOrderService: ConsumerRelationGetByOrderService,
    private readonly getConsumerByOrderService: ConsumerGetByOrderService,
    private readonly getConsumerListService: ConsumerListService,
    private readonly searchConsumerListService: ConsumerListSearchService,
  ) {
    super();
  }

  public router = router({
    consumer: {
      get: publicProcedure.input(getInputSchema).query(async ({ input }) => {
        const result = await this.getConsumerService.execute(input);
        return consumerSchema.parse(result);
      }),
      getList: publicProcedure.query(async () => {
        const result = await this.getConsumerListService.execute();
        return getListOutputSchema.parse(result);
      }),

      getRelationList: publicProcedure.query(async () => {
        const result = await this.getConsumerRelationListService.execute();
        console.log("output_log: RESULT =>>>", result);
        return getRelationListOutputSchema.parse(result);
      }),
      getByOrder: publicProcedure
        .input(getByOrderInputSchema)
        .query(async ({ input }) => {
          const result = await this.getConsumerByOrderService.execute(input);
          return consumerSchema.parse(result);
        }),
      getRelationByOrder: publicProcedure
        .input(getByOrderInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getConsumerRelationByOrderService.execute(input);
          return consumerRelationSchema.parse(result);
        }),
      search: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
          const result = await this.searchConsumerListService.execute(input);
          return searchOutputSchema.parse(result);
        }),
    },
  });
}
