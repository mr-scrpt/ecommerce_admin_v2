import { ReceiverCreateDTO } from "@/kernel/domain/receiver/receiver.dto";
import { ReceiverBase } from "@/kernel/domain/receiver/receiver.type";

type ReceiverCreatePayload = ReceiverBase;

export type ReceiverCreateTxPayload = {
  receiverData: ReceiverCreatePayload;
};

export type ReceiverCreateTxDTO = {
  receiverData: ReceiverCreateDTO["data"];
};
