export type SessionEntity = {
  user: {
    id: string;
    email: string;
    role: Role;
    cartId: string;
    name?: string | null;
    image?: string | null;
  };
  expires: string;
};
