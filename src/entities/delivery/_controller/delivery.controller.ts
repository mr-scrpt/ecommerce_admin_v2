import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getByOrderInputSchema,
  getInputSchema,
  getListOutputSchema,
  getTypeInputSchema,
  getTypeListOutputSchema,
  getWithRelationOutputSchema,
} from "../_domain/validator.schema";
import { DeliveryGetService } from "../_service/deliveryGet.service";
import { DeliveryGetByOrderService } from "../_service/deliveryGetByOrder.service";
import { DeliveryListGetService } from "../_service/deliveryListGet.service";
import { DeliveryTypeListGetService } from "../_service/deliveryTypeListGet.service";
import { DeliveryTypeAvailableListGetService } from "../_service/deliveryTypeAvailableListGet.service";

@injectable()
export class DeliveryController extends Controller {
  constructor(
    private readonly getDeliveryService: DeliveryGetService,
    private readonly getDeliveryByOrderService: DeliveryGetByOrderService,
    private readonly getDeliveryListService: DeliveryListGetService,
    private readonly getDeliveryTypeListService: DeliveryTypeListGetService,
    private readonly getDeliveryTypeAvailableListService: DeliveryTypeAvailableListGetService,
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
      getWithRelationByOrder: publicProcedure
        .input(getByOrderInputSchema)
        .query(async ({ input }) => {
          const result = await this.getDeliveryByOrderService.execute(input);
          return getWithRelationOutputSchema.parse(result);
        }),
      getList: publicProcedure.query(async () => {
        const result = await this.getDeliveryListService.execute();
        return getListOutputSchema.parse(result);
      }),
      getTypeList: publicProcedure.query(async () => {
        const result = await this.getDeliveryTypeListService.execute();
        return getTypeListOutputSchema.parse(result);
      }),
      getTypeAvailableList: publicProcedure
        .input(getTypeInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getDeliveryTypeAvailableListService.execute(input);
          return getTypeListOutputSchema.parse(result);
        }),
    },
  });
}
