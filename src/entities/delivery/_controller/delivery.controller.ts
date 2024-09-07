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
import { DeliveryWithRelationGetByOrderService } from "../_service/deliveryGetWithRelationByOrder.service";
import { DeliveryWithRelationGetService } from "../_service/deliveryGetWithRelation.service";

@injectable()
export class DeliveryController extends Controller {
  constructor(
    private readonly getDeliveryService: DeliveryGetService,
    private readonly getDeliveryWithRelationService: DeliveryWithRelationGetService,
    private readonly getDeliveryByOrderService: DeliveryGetByOrderService,
    private readonly getDeliveryWithRelationByOrderService: DeliveryWithRelationGetByOrderService,
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
      getWithRelation: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          console.log("output_log: INPUT DELIVERY =>>>", input);
          const result =
            await this.getDeliveryWithRelationService.execute(input);
          const resultParsed = getWithRelationOutputSchema.parse(result);
          return resultParsed;
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
          // try {
          // console.log("output_log: INPUT =>>>", input);
          const result =
            await this.getDeliveryWithRelationByOrderService.execute(input);
          // console.log("output_log: BEFORE PARSING =>>>", result);
          const resultParsed = getWithRelationOutputSchema.parse(result);
          return resultParsed;
          // } catch (e) {
          //   console.log("output_log: ERROR  =>>>", e);
          // }
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
