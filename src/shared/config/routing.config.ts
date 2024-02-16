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

  OPTIONS = "/options",
  OPTION_UPDATE = "/options/update",
  OPTION_CREATE = "/options/create",

  USERS = "/users",
  SETTINGS = "/settings",

  SIGN_IN = "/auth/sign-in",
  NEW_USER = "/auth/new-user",
  VERIFY_REQUEST = "/auth/verify-request",
}

enum RouteNameEnum {
  HOME = "Home",

  CATEGORIES = "Categories",
  PRODUCTS = "Products",

  OPTIONS = "Options",

  SETTINGS = "Settings",
  USERS = "Users",
  // SIZES = "Sizes",
  // COLORS = "Colors",
  // OPTIONS = "Options",
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
    href: `${RoutePathEnum.OPTIONS}`,
    label: RouteNameEnum.OPTIONS,
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
  //   href: `${RoutePathEnum.OPTIONS}`,
  //   label: RouteNameEnum.OPTIONS,
  // },
];
