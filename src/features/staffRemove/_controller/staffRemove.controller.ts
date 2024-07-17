import { createStaffAbility } from "@/entities/staff/server";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { removeInputSchema } from "../_domain/validator.schema";
import { staffRemoveSchema } from "../_domain/schema";
import { StaffRemoveService } from "../_service/staffRemove.service";

@injectable()
export class StaffRemoveController extends Controller {
  constructor(private readonly staffRemoveService: StaffRemoveService) {
    super();
  }

  public router = router({
    staffRemove: {
      remove: checkAbilityProcedure({
        create: createStaffAbility,
        check: (ability) => {
          return ability.canRemoveStaff();
        },
      })
        .input(removeInputSchema)
        .mutation(async ({ input }) => {
          const staff = await this.staffRemoveService.execute(input);
          return staffRemoveSchema.parse(staff);
        }),
    },
  });
}
