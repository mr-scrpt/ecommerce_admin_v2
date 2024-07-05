import { DELIVERY_TYPE } from "@prisma/client";

export const deliveryListSeed = [
  {
    id: "delivery_id_1",
    orderId: "order_id_1",
    deliveryType: DELIVERY_TYPE.PICKUP,
    settlementRef: "0e8cc768-4b3a-11e4-ab6d-005056801329",
    storeRef: "store_1",
  },

  {
    id: "delivery_id_2",
    orderId: "order_id_2",
    deliveryType: DELIVERY_TYPE.POST,
    settlementRef: "e71f8842-4b33-11e4-ab6d-005056801329",
    postOffice: "169227f4-e1c2-11e3-8c4a-0050568002cf",
  },
  {
    id: "delivery_id_3",
    orderId: "order_id_3",
    deliveryType: DELIVERY_TYPE.COURIER,
    settlementRef: "0ddbfc76-4b3a-11e4-ab6d-005056801329",
  },
  {
    id: "delivery_id_4",
    orderId: "order_id_4",
    deliveryType: DELIVERY_TYPE.POST,
    settlementRef: "e71c2a15-4b33-11e4-ab6d-005056801329",
    postOffice: "7b422fc4-e1b8-11e3-8c4a-0050568002cf",
  },
  {
    id: "delivery_id_5",
    orderId: "order_id_5",
    deliveryType: DELIVERY_TYPE.POST,
    settlementRef: "e71f8e8f-4b33-11e4-ab6d-005056801329",
    postOffice: "1692286c-e1c2-11e3-8c4a-0050568002cf",
  },
];
