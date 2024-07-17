import { staffSchema } from "@/kernel/domain/staff/staff.schema";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getInputSchema,
  getListOutputSchema,
  searchInputSchema,
  searchOutputSchema,
} from "../_domain/validator.schema";
import { StaffGetService } from "../_service/staffGet.service";
import { StaffListService } from "../_service/staffList.service";
import { StaffListSearchService } from "../_service/staffListSearch.service";

@injectable()
export class StaffController extends Controller {
  constructor(
    private readonly getStaffService: StaffGetService,
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
      search: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
          const result = await this.searchStaffListService.execute(input);
          return searchOutputSchema.parse(result);
        }),
    },
  });
}
