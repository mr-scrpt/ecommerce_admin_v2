import { ReplaceDateWithString } from "@/shared/type/operation.type";
import { Order } from "./order.type";

export type OrderWithStringDate = ReplaceDateWithString<Order>;
