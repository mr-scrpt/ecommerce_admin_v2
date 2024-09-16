import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getByUserAndSettlementRefInputSchema,
  getByUserInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { AddressListGetByUserService } from "../_service/addressListGetByUser.service";
import { AddressListGetByUserAndSettlementRefService } from "../_service/addressListGetByUserAndSettlementRef.service";

@injectable()
export class AddressController extends Controller {
  constructor(
    private readonly getAddressListByUserService: AddressListGetByUserService,
    private readonly getAddressListByUserAndSettlementRefService: AddressListGetByUserAndSettlementRefService,
  ) {
    super();
  }

  public router = router({
    address: {
      getListByUser: publicProcedure
        .input(getByUserInputSchema)
        .query(async ({ input }) => {
          const result = await this.getAddressListByUserService.execute(input);

          return getListOutputSchema.parse(result);
        }),
      getListByUserAndSettlementRef: publicProcedure
        .input(getByUserAndSettlementRefInputSchema)
        .query(async ({ input }) => {
          console.log("output_log: INPUT =>>>", input);
          const result =
            await this.getAddressListByUserAndSettlementRefService.execute(
              input,
            );

          return getListOutputSchema.parse(result);
        }),
    },
  });
}
