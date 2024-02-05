import { $Enums } from "@prisma/client";

export const ADMIN = {
  id: "admin_fdsfsddfew789879",
  email: "admin@gmail.com",
  name: "ADMIN",
  testPassword: "1234",
  role: $Enums.ROLE.ADMIN,
};

export const USER = {
  id: "user_fdseojeioui54645678",
  email: "user@gmail.com",
  testPassword: "1234",
  role: $Enums.ROLE.USER,
};

export const USER_2 = {
  id: "user_2_fdfoer56468dfsdf",
  email: "user2@gmail.com",
  testPassword: "1234",
  role: $Enums.ROLE.USER,
};
