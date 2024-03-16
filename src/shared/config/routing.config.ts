import { ROLE } from "@prisma/client";

export enum RoutePathEnum {
  HOME = "/",

  CATEGORIES = "/categories",
  // CATEGORY = "/categories/:slug",
  CATEGORY_UPDATE = "/categories/update",
  CATEGORY_CREATE = "/categories/create",

  PRODUCTS = "/products",
  PRODUCT_UPDATE = "/products/update",
  PRODUCT_CREATE = "/products/create",

  PROPERTIES = "/properties",
  PROPERTY_UPDATE = "/properties/update",
  PROPERTY_CREATE = "/properties/create",

  USERS = "/users",
  SETTINGS = "/settings",

  ORDERS = "/orders",
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

  SETTINGS = "Settings",
  USERS = "Users",
  ORDERS = "Orders",
  // SIZES = "Sizes",
  // COLORS = "Colors",
  // PROPERTIES = "properties",
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
    href: `${RoutePathEnum.USERS}`,
    label: RouteNameEnum.USERS,
    role: [ROLE.ADMIN],
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
