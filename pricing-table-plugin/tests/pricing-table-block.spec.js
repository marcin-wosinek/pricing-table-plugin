// @ts-check
import { test, expect } from "@playwright/test";
import { loginToWordPress } from "./helpers/wordpress-login.js";
import { hideWelcomePopup, searchForBlock, getEditorFrame } from "./helpers/block-editor.js";

test.describe("Pricing Table Block", () => {
  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await loginToWordPress(page);

    // Go to create new post
    await page.goto("/wp-admin/post-new.php");

    // Hide welcome popup if it appears
    await hideWelcomePopup(page);
  });

  test("should be available in WordPress block editor", async ({ page }) => {
    // Get the editor frame
    const editorFrame = await getEditorFrame(page);

    // Click the block inserter button
    await editorFrame.locator('[aria-label="Add block"]').click();

    // Search for the pricing table block
    const pricingTableBlock = await searchForBlock(page, "Pricing Table");
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
