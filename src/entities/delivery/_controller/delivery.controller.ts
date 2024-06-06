import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { getInputSchema, getByOrderInputSchema } from "../_domain/input.schema";
import { deliverySchema } from "../server";
import { DeliveryGetService } from "../_service/deliveryGet.service";
import { DeliveryListGetService } from "../_service/deliveryListGet.service";
import { DeliveryGetOrderService } from "../_service/deliveryGetOrder.service";

@injectable()
export class DeliveryController extends Controller {
  constructor(
    private readonly getDeliveryService: DeliveryGetService,
    private readonly getDeliveryOrderService: DeliveryGetOrderService,
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
      getOrder: publicProcedure
        .input(getByOrderInputSchema)
        .query(async ({ input }) => {
          const result = await this.getDeliveryOrderService.execute(input);
          return deliverySchema.parse(result);
        }),
      getList: publicProcedure.query(async () => {
        const result = await this.getDeliveryListService.execute();
        return deliverySchema.array().parse(result);
      }),
    },
  });
}
