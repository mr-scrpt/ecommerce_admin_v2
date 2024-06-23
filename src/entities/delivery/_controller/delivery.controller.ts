import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getInputSchema,
  getByOrderInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { DeliveryGetService } from "../_service/deliveryGet.service";
import { DeliveryListGetService } from "../_service/deliveryListGet.service";
import { DeliveryGetByOrderService } from "../_service/deliveryGetByOrder.service";
import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";

@injectable()
export class DeliveryController extends Controller {
  constructor(
    private readonly getDeliveryService: DeliveryGetService,
    private readonly getDeliveryByOrderService: DeliveryGetByOrderService,
    private readonly getDeliveryListService: DeliveryListGetService,
  ) {
    super();
  }

  public router = router({
    delivery: {
      get: publicProcedure.input(getInputSchema).query(async ({ input }) => {
        const result = await this.getDeliveryService.execute(input);
        return deliverySchema.parse(result);
      }),
      getByOrder: publicProcedure
        .input(getByOrderInputSchema)
        .query(async ({ input }) => {
          const result = await this.getDeliveryByOrderService.execute(input);
          return deliverySchema.parse(result);
        }),
      getList: publicProcedure.query(async () => {
        const result = await this.getDeliveryListService.execute();
        return getListOutputSchema.parse(result);
      }),
    },
  });
}
