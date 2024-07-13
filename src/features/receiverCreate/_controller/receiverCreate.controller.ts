import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { receiverSchema } from "@/kernel/domain/receiver/receiver.schema";
import { ReceiverCreateService } from "../_service/receiverCreate.service";

@injectable()
export class ReceiverCreateController extends Controller {
  constructor(private readonly createReceiverService: ReceiverCreateService) {
    super();
  }

  public router = router({
    receiverCreate: {
      create: publicProcedure
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createReceiverService.execute(input);
          return receiverSchema.parse(result);
        }),
    },
  });
}
