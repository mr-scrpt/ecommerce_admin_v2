import { $Enums } from "@prisma/client";

export const userListSeed = [
  {
    id: "admin_id_1",
    name: "Admnin",
    lastName: "Lastname",
    email: "admin@gmail.com",
    phone: "+380993282451",
    role: $Enums.ROLE.ADMIN,
    emailVerified: new Date(),
  },

  {
    id: "manager_id_2",
    name: "Manager",
    lastName: "",
    email: "manager@gmail.com",
    phone: "+46701234567",
    role: $Enums.ROLE.MANAGER,
    emailVerified: new Date(),
  },
  {
    id: "consumer_id_3",
    name: "Consumer User Name",
    lastName: "Consumer Last Name",
    email: "consumer@gmail.com",
    phone: "+4915112345678",
    role: $Enums.ROLE.CONSUMER,
  },
  {
    id: "consumer_id_4",
    email: "consumer_without_name@gmail.com",
    name: "",
    lastName: "Consumer Last Name",
    phone: "+4915112345678",
    role: $Enums.ROLE.CONSUMER,
  },
  {
    id: "consumer_id_5",
    name: "Consumer5",
    lastName: "Last Name",
    email: "long_name@gmail.com",
    phone: "+3809987889987",
    role: $Enums.ROLE.CONSUMER,
  },
];
