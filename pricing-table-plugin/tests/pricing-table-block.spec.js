// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * Helper function to login to WordPress admin
 * @param {import('@playwright/test').Page} page
 */
async function loginToWordPress(page) {
  await page.goto("/wp-admin");

  // Fill in login credentials
  await page.fill("#user_login", "admin");
  await page.fill("#user_pass", "admin123");

  // Click login button
  await page.click("#wp-submit");

  // Wait for dashboard to load
  await page.waitForURL("**/wp-admin/");
}

test.describe("Pricing Table Block", () => {
  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await loginToWordPress(page);

    // Go to create new post
    await page.goto("/wp-admin/post-new.php");

    // Hide welcome popup if it appears
    const welcomePopup = page.locator('.components-modal__content');
    if (await welcomePopup.isVisible()) {
      await page.locator('[aria-label="Close"], .components-modal__header button').click();
    }
  });

  test("should be available in WordPress block editor", async ({ page }) => {
    // Wait for the block editor iframe to load
    await page.waitForSelector('iframe[name="editor-canvas"]');

    // Get the iframe context
    const editorFrame = page.frameLocator('iframe[name="editor-canvas"]');

    // Click the block inserter button
    await editorFrame.locator('[aria-label="Add block"]').click();

    // Search for the pricing table block
    await page.locator('[placeholder="Search"]').fill("pricing table");

    // Wait for search results
    await page.waitForTimeout(1000);

    // Check if the pricing table block is available
    const pricingTableBlock = page
      .locator(".components-button")
      .locator("text=Pricing Table");
    await expect(pricingTableBlock).toBeVisible();

    // Click on the pricing table block to insert it
    await pricingTableBlock.click();

    // Verify the block was inserted
    const insertedBlock = editorFrame.locator(".pricing-table-placeholder");
    await expect(insertedBlock).toBeVisible();

    // Verify the block contains the expected placeholder text
    await expect(insertedBlock).toContainText("Pricing Table");
  });
});
