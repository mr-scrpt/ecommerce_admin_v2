import { createStaffAbility } from "@/entities/staff/server";
import { staffSchema } from "@/kernel/domain/staff/staff.schema";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { StaffUpdateService } from "../_service/staffUpdate.service";

@injectable()
export class StaffUpdateController extends Controller {
  constructor(private readonly staffUpdateService: StaffUpdateService) {
    super();
  }

  public router = router({
    staffUpdate: {
      update: checkAbilityProcedure({
        create: createStaffAbility,
        check: (ability) => ability.canUpdateStaff(),
      })
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const staff = await this.staffUpdateService.execute(input);

          return staffSchema.parse(staff);
        }),
    },
  });
}
