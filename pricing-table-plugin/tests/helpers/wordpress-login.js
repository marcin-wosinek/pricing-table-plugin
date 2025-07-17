/**
 * Helper function to login to WordPress admin
 * @param {import('@playwright/test').Page} page
 */
export async function loginToWordPress( page ) {
	await page.goto( '/wp-admin' );

	// Fill in login credentials
	await page.fill( '#user_login', 'admin' );
	await page.fill( '#user_pass', 'admin123' );

	// Click login button
	await page.click( '#wp-submit' );

	// Wait for dashboard to load
	await page.waitForURL( '**/wp-admin/' );
}
