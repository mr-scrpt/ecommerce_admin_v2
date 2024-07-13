import { ReceiverBase } from "./receiver.type";

// NOTE: Queries
export type ReceiverGetDTO = {
  id: string;
};

export type ReceiverGetByUserDTO = {
  userId: string;
};

// NOTE: Mutations
export type ReceiverCreateDTO = {
  data: ReceiverBase;
};

export type ReceiverUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<ReceiverBase>;
};

export type ReceiverRemoveDTO = {
  selector: {
    id: string;
  };
};

// NOTE: Bindings
export type ReceiverBindToOrderDTO = {
  target: {
    id: string;
  };
  data: {
    orderId: string;
  };
};
