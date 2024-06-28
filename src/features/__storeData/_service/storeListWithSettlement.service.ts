import { injectable } from "inversify";
import { StoreGetBySettlementRefDTO } from "@/entities/store/server";
import { StoreWithSettlementName } from "@/entities/store";
import { Store } from "@/kernel/domain/store/store.type";
import { UserEntity } from "@/kernel/domain/user/user.type";

@injectable()
export class StoreListWithSettlementService {
  constructor(private readonly storeDataGetByOrderTx: IStoreDataGetByOrderTx) {}

  async execute(
    selector: StoreGetBySettlementRefDTO,
  ): Promise<StoreWithSettlementName> {
    const result =
      await this.storeDataGetByOrderTx.getStoreDataByOrder(selector);

    return this.checkStore(result);
  }

  mapUserEntityToStore(user: UserEntity): Store {
    const { id, name, phone, email, role, emailVerified, image, createdAt } =
      user;

    if (!name || !phone || !email || !emailVerified) {
      throw new Error("Store invalid data");
    }

    return {
      id,
      name,
      phone,
      email,
      role,
      emailVerified,
      image,
      createdAt,
    };
  }

  checkStore(data: StoreDataEntity): StoreData {
    const { storeData, orderListData } = data;

    if (!storeData) {
      throw new Error("Store not found");
    }

    const store = this.mapUserEntityToStore(storeData);

    return {
      storeData: store,
      orderListData,
    };
  }
}
