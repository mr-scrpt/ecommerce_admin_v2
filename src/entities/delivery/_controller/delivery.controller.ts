import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { getByInputSchema } from "../_domain/input.schema";
import { deliverySchema } from "../server";
import { DeliveryGetService } from "../_service/deliveryGet.service";

@injectable()
export class DeliveryController extends Controller {
  constructor(
    // private readonly getDeliveryListService: DeliveryListGetService,
    private readonly getDeliveryService: DeliveryGetService,
  ) {
    super();
  }

  public router = router({
    delivery: {
      get: publicProcedure.input(getByInputSchema).query(async ({ input }) => {
        const result = await this.getDeliveryService.execute(input);
        return deliverySchema.parse(result);
      }),
      // getList: publicProcedure.query(async () => {
      //   const result = await this.getDeliveryListService.execute();
      //   return getListOutputSchema.parse(result);
      // }),
    },
  });
}
