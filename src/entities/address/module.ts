import { IAddressRepository } from "@/kernel/domain/address/repository.type";
import { AddressRepository } from "./_repository/address.repo";
import { AddressListGetByUserService } from "./_service/addressListGetByUser.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { AddressController } from "./_controller/address.controller";
import { ContainerModule } from "inversify";
import { AddressListGetByUserAndSettlementRefService } from "./_service/addressListGetByUserAndSettlementRef.service";

export const AddressModule = new ContainerModule((bind) => {
  bind(IAddressRepository).to(AddressRepository);
  bind(AddressListGetByUserService).toSelf();
  bind(AddressListGetByUserAndSettlementRefService).toSelf();

  bind(Controller).to(AddressController);
});
