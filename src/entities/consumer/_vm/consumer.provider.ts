import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { ConsumerRelation } from "../_domain/consumer.type";

// NOTE: Single Consumer
export const ConsumerContext = createStrictContext<ConsumerRelation>();
export const useConsumerData = () => useStrictContext(ConsumerContext);

// NOTE: List Consumer
export const ConsumerListContext =
  createStrictContext<Array<ConsumerRelation>>();
export const useConsumerListData = () => useStrictContext(ConsumerListContext);
