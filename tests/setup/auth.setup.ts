import { test as setup, expect } from "@playwright/test";
import { ADMIN, USER } from "../stabs/users";
import { adminFile, userFile } from "../constants";

setup.describe.configure({ mode: "serial" });
setup.describe("auth", () => {
  setup("authenticate as admin", async ({ page }) => {
    // await page.goto("/auth/sign-in?callbackUrl=/");
    // await page.getByLabel("Email").fill(ADMIN.email);
    // await page.getByRole("button", { name: "Loggin by email" }).click();
    //
    // await expect(
    //   page.getByRole("button", { name: "Loggin by email" }),
    // ).not.toHaveAttribute("disabled");
    //
    // await page
    //   .getByRole("link", { name: "Simple login only for testing" })
    //   .click();
    // await page.waitForURL("/");
    // await expect(page.getByRole("button", { name: "AD" })).toBeVisible();

    // await page.goto("http://localhost:3000/");
    await page.goto("/auth/sign-in?callbackUrl=/");
    await page.getByPlaceholder("name@example.com").click();
    await page.getByPlaceholder("name@example.com").fill("admin@gmail.com");
    await page.getByRole("button", { name: "Loggin by email" }).click();
    await page
      .getByRole("link", { name: "Simple login only for testing" })
      .click();
    await expect(page.getByRole("button", { name: "AD" })).toBeVisible();

    await page.context().storageState({ path: adminFile });
  });

  setup("authenticate as user", async ({ page }) => {
    await page.goto("/auth/sign-in?callbackUrl=/");
    await page.getByLabel("Email").fill(USER.email);
    await page.getByRole("button", { name: "Loggin by email" }).click();

    await expect(
      page.getByRole("button", { name: "Loggin by email" }),
    ).not.toHaveAttribute("disabled");

    // To handle verification emails
    await page
      .getByRole("link", { name: "Simple login only for testing" })
      .click();
    await page.waitForURL("/");
    await expect(page.getByRole("button", { name: "US" })).toBeVisible();

    await page.context().storageState({ path: userFile });
  });
});
