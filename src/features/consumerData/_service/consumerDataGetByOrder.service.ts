import { Consumer, ConsumerGetByOrderSelector } from "@/entities/consumer";
import { UserEntity } from "@/entities/user/user";
import { injectable } from "inversify";
import { IConsumerDataGetByOrderTx } from "../_domain/transaction.type";
import { ConsumerData, ConsumerDataEntity } from "../_domain/types";

@injectable()
export class ConsumerDataGetByOrderService {
  constructor(
    private readonly consumerDataGetByOrderTx: IConsumerDataGetByOrderTx,
  ) {}

  async execute(selector: ConsumerGetByOrderSelector): Promise<ConsumerData> {
    const result =
      await this.consumerDataGetByOrderTx.getConsumerDataByOrder(selector);

    return this.checkConsumer(result);
  }

  mapUserEntityToConsumer(user: UserEntity): Consumer {
    const { id, name, phone, email, role, emailVerified, image, createdAt } =
      user;

    if (!name || !phone || !email || !emailVerified) {
      throw new Error("Consumer invalid data");
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

  checkConsumer(data: ConsumerDataEntity): ConsumerData {
    const { consumerData, orderListData } = data;

    if (!consumerData) {
      throw new Error("Consumer not found");
    }

    const consumer = this.mapUserEntityToConsumer(consumerData);

    return {
      consumerData: consumer,
      orderListData,
    };
  }
}
