// NOTE: Base
export type ReceiverBase = {
  userId: string;
  name: string;
  lastName: string;
  phone: string;
};

// NOTE: Entity
export type ReceiverEntity = ReceiverBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Receiver = ReceiverBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
