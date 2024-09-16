import { ORDER_STATUS_PAYMENT, ORDER_STATUS_STATE } from "@prisma/client";

export const orderStatusStateListSeed = [
  {
    id: "orderStatusState_id_1",
    status: ORDER_STATUS_STATE.TEMP,
  },

  {
    id: "orderStatusState_id_2",
    status: ORDER_STATUS_STATE.NEW,
  },
  {
    id: "orderStatusState_id_3",
    status: ORDER_STATUS_STATE.PENDING,
  },
  {
    id: "orderStatusState_id_4",
    status: ORDER_STATUS_STATE.CALLED,
  },
  {
    id: "orderStatusState_id_5",
    status: ORDER_STATUS_STATE.NOT_CONTACTED,
  },
  {
    id: "orderStatusState_id_6",
    status: ORDER_STATUS_STATE.DELIVERED,
  },
  {
    id: "orderStatusState_id_7",
    status: ORDER_STATUS_STATE.RECEIVED,
  },
  {
    id: "orderStatusState_id_8",
    status: ORDER_STATUS_STATE.COMPLETED,
  },
  {
    id: "orderStatusState_id_9",
    status: ORDER_STATUS_STATE.CANCELED,
  },
];

export const orderStatusPaymentListSeed = [
  {
    id: "orderStatusPayment_id_1",
    status: ORDER_STATUS_PAYMENT.TEMP,
  },

  {
    id: "orderStatusPayment_id_2",
    status: ORDER_STATUS_PAYMENT.PAID,
  },
  {
    id: "orderStatusPayment_id_3",
    status: ORDER_STATUS_PAYMENT.NOT_PAID,
  },
  {
    id: "orderStatusPayment_id_4",
    status: ORDER_STATUS_PAYMENT.POSTAL_PAID,
  },
  {
    id: "orderStatusPayment_id_5",
    status: ORDER_STATUS_PAYMENT.CONTACT_PAID,
  },
];
