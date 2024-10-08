import { ORDER_STATUS, ORDER_PAYMENT_STATUS } from "@prisma/client";

export const orderListSeed = [
  {
    id: "order_id_1",
    userId: "consumer_id_3",

    receiverId: "receiver_id_1",
    orderNo: "20240614-6526-103650",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.NOT_PAID,
    priceTotal: 56558,
  },
  {
    id: "order_id_2",
    userId: "consumer_id_3",

    orderNo: "20240615-3333-083611",

    receiverId: "receiver_id_2",

    orderStatus: ORDER_STATUS.COMPLETED,
    paymentStatus: ORDER_PAYMENT_STATUS.PAID,
    priceTotal: 7854,
  },
  {
    id: "order_id_3",
    userId: "consumer_id_4",

    orderNo: "20240616-4444-015822",

    receiverId: "receiver_id_5",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.CONTACT_PAID,
    priceTotal: 3421,
  },
  {
    id: "order_id_4",
    userId: "consumer_id_5",

    orderNo: "20240617-6666-124201",

    receiverId: "receiver_id_5",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.POSTAL_PAID,
    priceTotal: 8423,
  },
  {
    id: "order_id_5",
    userId: "consumer_id_4",

    receiverId: "receiver_id_6",
    orderNo: "20240513-7777-098759",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.POSTAL_PAID,
    priceTotal: 0,
  },
  {
    id: "order_id_6",
    receiverId: "receiver_id_3",
    orderNo: "20240513-8888-15759",

    userId: "consumer_id_3",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.PAID,
    priceTotal: 1000,
  },
];
