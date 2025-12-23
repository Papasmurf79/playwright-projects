import { test, expect, Page } from '@playwright/test';

/**
 * Helper function for test 3 to get a value from Yahoo Finance's key-value stats table
 * Example labels: "Market Cap", "52 Week Range"
 */
async function getStatValue(page: Page, label: string): Promise<string> {
  const row = page
    .locator(`span:has-text("${label}")`)
    .first()
    .locator('xpath=ancestor::li | ancestor::div[contains(@class,"item")]')
    .first();
  // The value is always the last span in the row
  const value = row.locator('span').last();
  // Verify the value is visible before returning it
  await expect(value).toBeVisible();
  // Return the trimmed text content of the value element
  return (await value.innerText()).trim();
}

 // Test suite for Yahoo Finance: Four Test Cases
test.describe('Yahoo Finance Test Cases', () => {
    
    // Test Case 1: Verify the Yahoo Finance homepage
    test('Homepage should have the correct Logo & URL', async ({ page }) => {
        //Open the homepage url
        await page.goto('https://finance.yahoo.com/');

        // Verify the Yahoo Finance URL
        const currentURL = await page.url();
        expect(currentURL).toBe('https://finance.yahoo.com/');

        // Verify the Yahoo Finance Logo Text
        const logoText = page.locator('#ybar-logo');
        await expect(logoText).toBeVisible();

    });
    // Test Case 2: Verify the search functionality on Yahoo Finance
    test('Search for a stock symbol & verify the search results', async ({ page }) => {
        await page.goto('https://finance.yahoo.com/');
        
        // Search for a stock symbol
        await page.locator('#ybar-sbq').fill('AAPL');
        await page.getByRole('button', { name: 'search' }).click()
        
        // Verify the search results page URL
        await expect(page).toHaveURL(/\/(quote|lookup)\//);
});

// Test Case 3: Verify Stock Price, Market Cap, & 52 Week Range on Yahoo Finance
    test('Verify stock price, market cap, and 52-week range using regex', async ({ page }) => {
        // Navigate to Yahoo Finance 
        await page.goto('https://finance.yahoo.com/');
        // Search for a stock symbol
        await page.locator('#ybar-sbq').fill('AAPL');
        await page.getByRole('button', { name: 'search' }).click();

        // Confirm we landed on a quote page (not search results)
        await expect(page).toHaveURL(/\/quote\//);

                  // ---- DATA EXTRACTION ----

        // Current stock price (top of the page)
        const priceText = await page
        .locator('[data-field="regularMarketPrice"]').first().innerText();

        // Market Cap & 52 Week Range via helper function
        const marketCapText = await getStatValue(page, 'Market Cap');
        const range52Text = await getStatValue(page, '52 Week Range');

                  // ---- REGEX VALIDATION ----

        const priceRegex = /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/;
        const marketCapRegex = /^\d+(\.\d+)?[TBM]$/;
        const range52Regex = /^\d+(\.\d+)?\s*-\s*\d+(\.\d+)?$/;

        expect(priceRegex.test(priceText.trim())).toBeTruthy();
        expect(marketCapRegex.test(marketCapText)).toBeTruthy();
        expect(range52Regex.test(range52Text)).toBeTruthy();
});

    // Test Case 4: Update page refreshes and Verify the stock price changes, market cap, and 52-week range for a given stock symbol
    test('Verify stock price refreshes and remains valid', async ({ page }) => {
        await page.goto('https://finance.yahoo.com/');
        
        // Search for a stock symbol
        await page.locator('#ybar-sbq').fill('AAPL');
        await page.getByRole('button', { name: 'search' }).click();
        await expect(page).toHaveURL(/\/quote\//);

        const priceLocator = page.locator('[data-field="regularMarketPrice"]').first();

        // Regex for a valid stock price
        const priceRegex = /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/;

        // ---- Capture price BEFORE refresh ----

        // Verify the price is visible <fin-streamer> is Hidden
        await expect(priceLocator).toHaveAttribute('value', /\d+(\.\d+)?/); 
        const priceBefore = Number(await priceLocator.getAttribute('value'));

        // ---- Refresh page ----
        await page.reload();
        await expect(page).toHaveURL(/\/quote\//);

        // ---- Capture price AFTER refresh ----
        await expect(priceLocator).toHaveAttribute('value', /\d+(\.\d+)?/, { timeout: 15000 });
        const priceAfter = Number(await priceLocator.getAttribute('value'));
        expect(priceAfter).toBeGreaterThan(0);

        // ---- Soft assertion: detect change without forcing failure ----
        if (priceBefore !== priceAfter) {
            console.log(`Price changed: ${priceBefore} → ${priceAfter}`);
        } else {
            console.log(`Price unchanged after refresh: ${priceBefore}`);
        }
    });
});
