export enum WSEventEnum {
  CONNECT = "connect",
  DISCONNECTD = "disconnectd",
  USER_CREATE = "user_create",
  USER_UPDATE = "user_update",
  USER_REMOVE = "user_remove",
  USER_REFRESH = "user_refresh",
  USER_LIST_REFRESH = "user_list_refresh",

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
}
