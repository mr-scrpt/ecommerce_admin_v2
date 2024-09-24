import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { receiverRelationSchema } from "../_domain/receiver.schema";
import {
  getByUserInputSchema,
  getInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { ReceiverListGetByUserService } from "../_service/receiverListGetByUser.service";
import { ReceiverRelationGetService } from "../_service/receiverRelationGet.service";

@injectable()
export class ReceiverController extends Controller {
  constructor(
    private readonly getReceiverRelationService: ReceiverRelationGetService,
    private readonly getReceiverListByUserService: ReceiverListGetByUserService,
  ) {
    super();
  }

  public router = router({
    receiver: {
      getRelation: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result = await this.getReceiverRelationService.execute(input);

          return receiverRelationSchema.parse(result);
        }),
      getListByUser: publicProcedure
        .input(getByUserInputSchema)
        .query(async ({ input }) => {
          const result = await this.getReceiverListByUserService.execute(input);

          return getListOutputSchema.parse(result);
        }),
      // getListByOrder: publicProcedure
      //   .input(getByOrderInputSchema)
      //   .query(async ({ input }) => {
      //     const result =
      //       await this.getReceiverListByOrderService.execute(input);
      //
      //     return getListOutputSchema.parse(result);
      //   }),
    },
  });
}
