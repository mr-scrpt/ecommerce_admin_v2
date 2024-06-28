import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { staffRelationSchema } from "../_domain/staff.schema";
import {
  getByOrderInputSchema,
  getInputSchema,
  getListOutputSchema,
  searchInputSchema,
  searchOutputSchema,
} from "../_domain/validator.schema";
import { StaffListService } from "../_service/staffList.service";
import { StaffListSearchService } from "../_service/staffListSearch.service";
import { StaffRelationGetByOrderService } from "../_service/staffRelationGetByOrder.service";
import { staffSchema } from "@/kernel/domain/staff/staff.schema";
import { StaffGetService } from "../_service/staffGet.service";

@injectable()
export class StaffController extends Controller {
  constructor(
    private readonly getStaffService: StaffGetService,
    private readonly getStaffRelationByOrderService: StaffRelationGetByOrderService,
    private readonly getStaffListService: StaffListService,
    private readonly searchStaffListService: StaffListSearchService,
  ) {
    super();
  }

  public router = router({
    staff: {
      get: publicProcedure.input(getInputSchema).query(async ({ input }) => {
        const result = await this.getStaffService.execute(input);
        return staffSchema.parse(result);
      }),
      getList: publicProcedure.query(async () => {
        const result = await this.getStaffListService.execute();
        return getListOutputSchema.parse(result);
      }),
      getRelationByOrder: publicProcedure
        .input(getByOrderInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getStaffRelationByOrderService.execute(input);
          return staffRelationSchema.parse(result);
        }),
      search: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
          const result = await this.searchStaffListService.execute(input);
          return searchOutputSchema.parse(result);
        }),
    },
  });
}
