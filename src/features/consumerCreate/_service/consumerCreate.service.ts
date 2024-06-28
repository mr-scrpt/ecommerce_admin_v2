import { ConsumerRelation } from "@/entities/consumer/_domain/consumer.type";
import { injectable } from "inversify";
import { merge } from "lodash";
import { IConsumerCreateTx } from "../_domain/transaction.type";
import { ConsumerCreateTxDTO, ConsumerCreateTxPayload } from "../_domain/types";

@injectable()
export class ConsumerCreateService {
  constructor(private readonly consumerCreateTx: IConsumerCreateTx) {}

  async execute(payload: ConsumerCreateTxPayload): Promise<ConsumerRelation> {
    const consumerCreateDTO = this.build(payload);
    return await this.consumerCreateTx.createConsumer(consumerCreateDTO);
  }

  private build(payload: ConsumerCreateTxPayload): ConsumerCreateTxDTO {
    const { consumerData } = payload;
    const { email, phone, name, image } = consumerData;

    return merge({}, payload, {
      consumerData: {
        name: name ?? "",
        phone: phone ?? "",
        image: image ?? "",
        email: email ?? "",
      },
    });
  }
}
