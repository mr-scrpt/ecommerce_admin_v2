import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { deliverySchema } from "@/entities/delivery/server";
import { DeliveryUpdateService } from "../_service/deliveryUpdate.service";

@injectable()
export class DeliveryUpdateController extends Controller {
  constructor(private readonly updateDeliveryService: DeliveryUpdateService) {
    super();
  }

  public router = router({
    deliveryUpdate: {
      update: publicProcedure
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateDeliveryService.execute(input);
          return deliverySchema.parse(result);
        }),
    },
  });
}
