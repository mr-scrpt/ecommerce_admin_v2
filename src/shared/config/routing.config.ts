import { RoleEnum } from "@/kernel/domain/role.type";

export enum RoutePathEnum {
  HOME = "/",

  CATEGORIES = "/categories",
  CATEGORY_UPDATE = "/categories/update",
  CATEGORY_CREATE = "/categories/create",

  PRODUCTS = "/products",
  PRODUCT_UPDATE = "/products/update",
  PRODUCT_CREATE = "/products/create",

  PROPERTIES = "/properties",
  PROPERTY_UPDATE = "/properties/update",
  PROPERTY_CREATE = "/properties/create",

  STORES = "/stores",
  STORE_UPDATE = "/stores/update",
  STORE_CREATE = "/stores/create",

  CONSUMERS = "/consumers",
  STAFF = "/staff",
  SETTINGS = "/settings",

  ORDERS = "/orders",
  ORDER_CREATE = "/orders/create",
  ORDER_UPDATE = "/orders/update",

  SIGN_IN = "/auth/sign-in",
  NEW_USER = "/auth/new-user",
  VERIFY_REQUEST = "/auth/verify-request",
}

enum RouteNameEnum {
  HOME = "Home",

  CATEGORIES = "Categories",
  PRODUCTS = "Products",

  PROPERTIES = "Properties",
  STORES = "Stores",

  SETTINGS = "Settings",
  CONSUMERS = "Consumers",
  STAFF = "Staff",
  ORDERS = "Orders",

  SIGN_IN = "Sign in",
  NEW_USER = "New user",
  VERIFY_REQUEST = "Verify request",
}

export const ROUTING_MAIN_MENU_DATA = [
  {
    href: `${RoutePathEnum.HOME}`,
    label: RouteNameEnum.HOME,
  },
  {
    href: `${RoutePathEnum.CATEGORIES}`,
    label: RouteNameEnum.CATEGORIES,
  },
  {
    href: `${RoutePathEnum.PRODUCTS}`,
    label: RouteNameEnum.PRODUCTS,
  },
  {
    href: `${RoutePathEnum.PROPERTIES}`,
    label: RouteNameEnum.PROPERTIES,
  },
  {
    href: `${RoutePathEnum.ORDERS}`,
    label: RouteNameEnum.ORDERS,
  },
  {
    href: `${RoutePathEnum.CONSUMERS}`,
    label: RouteNameEnum.CONSUMERS,
    role: [RoleEnum.ADMIN],
  },
  {
    href: `${RoutePathEnum.STAFF}`,
    label: RouteNameEnum.STAFF,
    role: [RoleEnum.ADMIN],
  },
  {
    href: `${RoutePathEnum.STORES}`,
    label: RouteNameEnum.STORES,
  },
  {
    href: `${RoutePathEnum.SETTINGS}`,
    label: RouteNameEnum.SETTINGS,
  },
  // {
  //   href: `${RoutePathEnum.SIGN_IN}`,
  //   label: RouteNameEnum.SIGN_IN,
  // },
  // {
  //   href: `${RoutePathEnum.NEW_USER}`,
  //   label: RouteNameEnum.NEW_USER,
  // },
  // {
  //   href: `${RoutePathEnum.VERIFY_REQUEST}`,
  //   label: RouteNameEnum.VERIFY_REQUEST,
  // },
  // {
  //   href: `${RoutePathEnum.SIZES}`,
  //   label: RouteNameEnum.SIZES,
  // },
  // {
  //   href: `${RoutePathEnum.COLORS}`,
  //   label: RouteNameEnum.COLORS,
  // },
  // {
  //   href: `${RoutePathEnum.PROPERTIES}`,
  //   label: RouteNameEnum.PROPERTIES,
  // },
];
