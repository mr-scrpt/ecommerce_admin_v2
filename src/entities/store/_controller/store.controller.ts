import { storeSchema } from "@/kernel/domain/store/store.schema";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getBySettlementRefInputSchema,
  getInputSchema,
  getListOutputSchema,
  getListWithRelationOutputSchema,
} from "../_domain/validator.schema";
import { StoreGetService } from "../_service/storeGet.service";
import { StoreListGetService } from "../_service/storeListGet.service";
import { StoreListGetBySettlementRefService } from "../_service/storeListGetBySettlementRef.service";
import { StoreListGetBySettlementRefWithRelationService } from "../_service/storeListGetBySettlementRefWithRelation.service";
import { StoreListWithRelationGetService } from "../_service/storeListWithRelationGet.service";
import { storeRelationSchema } from "../_domain/store.schema";
import { StoreWithRelationGetService } from "../_service/storeGetWithRelation.service";

@injectable()
export class StoreController extends Controller {
  constructor(
    private readonly getStoreService: StoreGetService,
    private readonly getStoreWithRelationService: StoreWithRelationGetService,
    private readonly getStoreListService: StoreListGetService,
    private readonly getStoreListWithRelationService: StoreListWithRelationGetService,
    private readonly getStoreListBySettlementRefService: StoreListGetBySettlementRefService,
    private readonly getStoreListBySettlementRefWithRelationService: StoreListGetBySettlementRefWithRelationService,
  ) {
    super();
  }

  public router = router({
    store: {
      get: publicProcedure.input(getInputSchema).query(async ({ input }) => {
        const result = await this.getStoreService.execute(input);

        return storeSchema.parse(result);
      }),
      getRelation: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result = await this.getStoreWithRelationService.execute(input);

          return storeRelationSchema.parse(result);
        }),
      getListBySettlementRef: publicProcedure
        .input(getBySettlementRefInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getStoreListBySettlementRefService.execute(input);

          return getListOutputSchema.parse(result);
        }),

      getListBySettlementRefWithRelation: publicProcedure
        .input(getBySettlementRefInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getStoreListBySettlementRefWithRelationService.execute(
              input,
            );

          return getListWithRelationOutputSchema.parse(result);
        }),
      getList: publicProcedure.query(async () => {
        const result = await this.getStoreListService.execute();

        return getListOutputSchema.parse(result);
      }),
      getListWithRelation: publicProcedure.query(async () => {
        const result = await this.getStoreListWithRelationService.execute();

        return getListWithRelationOutputSchema.parse(result);
      }),
    },
  });
}
