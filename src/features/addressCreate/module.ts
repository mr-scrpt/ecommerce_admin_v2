import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { AddressCreateController } from "./_controller/addressCreate.controller";
import { IAddressCreateTx } from "./_domain/transaction.type";
import { AddressCreateService } from "./_service/addressCreate.service";
import { AddressCreateTx } from "./_tx/addressCreate.transaction";

export const AddressCreateModule = new ContainerModule((bind) => {
  bind(IAddressCreateTx).to(AddressCreateTx);

  bind(AddressCreateService).toSelf();

  bind(Controller).to(AddressCreateController);
});
