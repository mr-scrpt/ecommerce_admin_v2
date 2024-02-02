import { test, expect } from "@playwright/test";
import { adminFile, userFile } from "./constants";
import { ADMIN } from "./stabs/users";

test.describe("update-profile as admin", () => {
  test.use({ storageState: adminFile });
  test("update username", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "AD" }).click();
    await page.getByRole("menuitem", { name: "Profile" }).click();
    await page.waitForURL(`/profile/${ADMIN.id}`);
    await page.getByLabel("Name").click();
    await page.getByLabel("Name").fill("Admin");
    await page.getByRole("button", { name: "Save change" }).click();
    await expect(
      page.getByRole("img", { name: "Profile updating..." }),
    ).not.toBeVisible();
    await page.getByRole("banner").getByRole("button", { name: "AD" }).click();
    await expect(page.getByText("My accountAdmin")).toBeVisible();
    await page.locator("html").click();
    await page.getByLabel("Name").click();
    await page.getByLabel("Name").fill("");
    await page.getByRole("button", { name: "Save change" }).click();
    await expect(
      page.getByRole("img", { name: "Profile updating..." }),
    ).not.toBeVisible();
    await page.getByRole("banner").getByRole("button", { name: "AD" }).click();
    await expect(page.getByText("My accountadmin@gmail.com")).toBeVisible();
  });

  test("can update anouther user", async ({ page }) => {
    await page.goto("/profile/user-2");
    await page.getByLabel("Name").click();
    await page.getByLabel("Name").fill("User");
    await page.getByRole("button", { name: "Save change" }).click();
    await expect(
      page.getByRole("img", { name: "Profile updating..." }),
    ).not.toBeVisible();
    await page.reload();

    await expect(page.getByLabel("Name")).toHaveValue("User");
    await page.getByLabel("Name").click();
    await page.getByLabel("Name").fill("");
    await page.getByRole("button", { name: "Save change" }).click();
  });
});

test.describe("update-profile as user", () => {
  test.use({ storageState: userFile });
  test("update username", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "US" }).click();
    await page.getByRole("menuitem", { name: "Profile" }).click();
    await page.waitForURL("/profile/user");
    await page.getByLabel("Name").click();
    await page.getByLabel("Name").fill("User");
    await page.getByRole("button", { name: "Save change" }).click();
    await expect(
      page.getByRole("img", { name: "Profile updating..." }),
    ).not.toBeVisible();
    await page.getByRole("banner").getByRole("button", { name: "US" }).click();
    await expect(page.getByText("My accountUser")).toBeVisible();
    await page.locator("html").click();
    await page.getByLabel("Name").click();
    await page.getByLabel("Name").fill("");
    await page.getByRole("button", { name: "Save change" }).click();
    await expect(
      page.getByRole("img", { name: "Profile updating..." }),
    ).not.toBeVisible();
    await page.getByRole("banner").getByRole("button", { name: "US" }).click();
    await expect(page.getByText("My accountuser@gmail.com")).toBeVisible();
  });

  test("can not update anouther user", async ({ page }) => {
    await page.goto("/profile/admin");
    await expect(
      page.getByText("Failed to load profile, you may not have permissions"),
    ).toBeVisible();
  });
});
