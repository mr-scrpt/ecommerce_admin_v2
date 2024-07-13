export enum WSEventEnum {
  CONNECT = "connect",
  DISCONNECTD = "disconnectd",

  USER_CREATE = "user_create",
  USER_UPDATE = "user_update",
  USER_REMOVE = "user_remove",
  USER_REFRESH = "user_refresh",
  USER_LIST_REFRESH = "user_list_refresh",

  RECEIVER_CREATE = "receiver_create",
  RECEIVER_UPDATE = "receiver_update",
  RECEIVER_REMOVE = "receiver_remove",
  RECEIVER_REFRESH = "receiver_refresh",
  RECEIVER_LIST_REFRESH = "receiver_list_refresh",

  PROFILE_UPDATE = "profile_update",
  PROFILE_REFRESH = "profile_refresh",
  PROFILE_LIST_REFRESH = "profile_list_refresh",

  CATEGORY_CREATE = "category_create",
  CATEGORY_UPDATE = "category_update",
  CATEGORY_REMOVE = "category_remove",
  CATEGORY_REFRESH = "category_refresh",
  CATEGORY_LIST_REFRESH = "category_list_refresh",

  PRODUCT_CREATE = "product_create",
  PRODUCT_UPDATE = "product_update",
  PRODUCT_REMOVE = "product_remove",
  PRODUCT_REFRESH = "product_refresh",
  PRODUCT_LIST_REFRESH = "product_list_refresh",

  PROPERTY_CREATE = "property_create",
  PROPERTY_UPDATE = "property_update",
  PROPERTY_REMOVE = "property_remove",
  PROPERTY_REFRESH = "property_refresh",
  PROPERTY_LIST_REFRESH = "property_list_refresh",

  CART_REFRESH = "cart_refresh",

  ORDER_CREATE = "order_create",
  ORDER_UPDATE = "order_update",
  ORDER_REFRESH = "order_refresh",
  ORDER_REMOVE = "order_remove",
  ORDER_LIST_REFRESH = "order_list_refresh",

  DELIVERY_CREATE = "delivery_create",
  DELIVERY_UPDATE = "delivery_update",
  DELIVERY_REFRESH = "delivery_refresh",
  DELIVERY_REMOVE = "delivery_remove",
  DELIVERY_LIST_REFRESH = "delivery_list_refresh",

  STORE_CREATE = "store_create",
  STORE_UPDATE = "store_update",
  STORE_REMOVE = "store_remove",
  STORE_REFRESH = "store_refresh",
  STORE_LIST_REFRESH = "store_list_refresh",

  ADDRESS_CREATE = "address_create",
  ADDRESS_UPDATE = "address_update",
  ADDRESS_REFRESH = "address_refresh",
  ADDRESS_REMOVE = "address_remove",
  ADDRESS_LIST_REFRESH = "address_list_refresh",
}
