import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { useMemo } from "react";

export const useConsumerDefaultValues = (consumer: Consumer | null) => {
  return useMemo(() => {
    if (!consumer) {
      return {
        name: "",
        lastName: "",
        email: "",
        phone: "",
      };
    }

    return {
      name: consumer.name,
      lastName: consumer.lastName,
      email: consumer.email,
      phone: consumer.phone,
    };
  }, [consumer]);
};
