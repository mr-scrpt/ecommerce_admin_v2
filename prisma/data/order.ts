import { ORDER_STATUS, ORDER_PAYMENT_STATUS } from "@prisma/client";

export const orderListSeed = [
  {
    id: "orderId_d58Johoj_ORDER_AdminUser",

    userId: "admin_fdsfsddfew789879",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.NOT_PAID,
    priceTotal: 56558,
  },
  {
    id: "orderId_2158FFFF8_ORDER_2_AdminUser",

    userId: "admin_fdsfsddfew789879",

    orderStatus: ORDER_STATUS.COMPLETED,
    paymentStatus: ORDER_PAYMENT_STATUS.PAID,
    priceTotal: 7854,
  },
  {
    id: "orderId_FEohd84667_ORDER_User",

    userId: "user_fdseojeioui54645678",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.CONTACT_PAID,
    priceTotal: 3421,
  },
  {
    id: "orderId_didonhfff557642fd_ORDER_User2",

    userId: "user_2_fdfoer56468dfsdf",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.POSTAL_PAID,
    priceTotal: 8423,
  },
  {
    id: "orderId5_ssiwwwff55ee5573PP_ORDER_User2",

    userId: "user_2_fdfoer56468dfsdf",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.POSTAL_PAID,
    priceTotal: 8423,
  },
];
