import { DELIVERY_TYPE } from "@prisma/client";

export const deliveryListSeed = [
  {
    id: "delivery_id_1",
    orderId: "order_id_1",
    userId: "consumer_id_3",
    // receiverId: "receiver_id_1",
    deliveryTypeId: "deliveryType_id_1",
    // deliveryType: DELIVERY_TYPE.POST,
    settlementRef: "0e834da5-4b3a-11e4-ab6d-005056801329",
    postOfficeId: "b9b5a97b-a2fe-11e9-b790-005056b24375",
    addressId: null,
    storeId: null,
  },

  {
    id: "delivery_id_2",
    orderId: "order_id_2",
    userId: "consumer_id_3",
    // receiverId: "receiver_id_2",
    deliveryTypeId: "deliveryType_id_1",
    // deliveryType: DELIVERY_TYPE.POST,
    settlementRef: "e71f8842-4b33-11e4-ab6d-005056801329",
    postOfficeId: "169227f4-e1c2-11e3-8c4a-0050568002cf",
    addressId: null,
    storeId: null,
  },
  {
    id: "delivery_id_3",
    orderId: "order_id_6",
    userId: "consumer_id_3",
    // receiverId: "receiver_id_3",
    deliveryTypeId: "deliveryType_id_2",
    // deliveryType: DELIVERY_TYPE.PICKUP,
    settlementRef: "e71f8842-4b33-11e4-ab6d-005056801329",
    postOfficeId: "",
    addressId: null,
    storeId: "store_id_1",
  },
  {
    id: "delivery_id_4",
    orderId: "order_id_3",
    userId: "consumer_id_4",
    // receiverId: "receiver_id_4",
    deliveryTypeId: "deliveryType_id_3",
    // deliveryType: DELIVERY_TYPE.COURIER,
    settlementRef: "e71c2a15-4b33-11e4-ab6d-005056801329",
    postOfficeId: "",
    addressId: "address_id_3",
    storeId: null,
  },
  {
    id: "delivery_id_5",
    orderId: "order_id_4",
    userId: "consumer_id_4",
    // receiverId: "receiver_id_5",
    deliveryTypeId: "deliveryType_id_1",
    // deliveryType: DELIVERY_TYPE.POST,
    settlementRef: "e71c2a15-4b33-11e4-ab6d-005056801329",
    postOfficeId: "7b422fc4-e1b8-11e3-8c4a-0050568002cf",
    addressId: null,
    storeId: null,
  },
  {
    id: "delivery_id_6",
    orderId: "order_id_5",
    userId: "consumer_id_4",
    // receiverId: "receiver_id_6",
    deliveryTypeId: "deliveryType_id_1",
    // deliveryType: DELIVERY_TYPE.POST,
    settlementRef: "e71f8e8f-4b33-11e4-ab6d-005056801329",
    postOfficeId: "1692286c-e1c2-11e3-8c4a-0050568002cf",
    addressId: null,
    storeId: null,
  },
];
