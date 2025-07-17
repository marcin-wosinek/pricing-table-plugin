/**
 * Helper function to hide welcome popup if it appears
 * @param {import('@playwright/test').Page} page
 */
export async function hideWelcomePopup( page ) {
	const welcomePopup = page.locator( '.components-modal__content' );
	if ( await welcomePopup.isVisible() ) {
		await page
			.locator( '[aria-label="Close"], .components-modal__header button' )
			.click();
	}
}

/**
 * Helper function to search for a block in the block inserter
 * @param {import('@playwright/test').Page} page
 * @param {string} blockName - Name of the block to search for
 */
export async function searchForBlock( page, blockName ) {
	// Search for the block
	await page.locator( '[placeholder="Search"]' ).fill( blockName );

	// Wait for search results
	await page.waitForTimeout( 1000 );

	return page
		.locator( '.components-button' )
		.locator( `text=${ blockName }` );
}

/**
 * Helper function to get the editor frame
 * @param {import('@playwright/test').Page} page
 */
export async function getEditorFrame( page ) {
	// Wait for the block editor iframe to load
	await page.waitForSelector( 'iframe[name="editor-canvas"]' );

	// Get the iframe context
	return page.frameLocator( 'iframe[name="editor-canvas"]' );
}
