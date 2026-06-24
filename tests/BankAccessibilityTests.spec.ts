import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Bank Accessibility Tests', () => {
  test('Check accessibility of the bank website', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);

    // Log the accessibility violations to the console
    console.log('Accessibility Violations:', accessibilityScanResults.violations);
  });
});

// A simple test to check for specific WCAG, A, or AA accessibility violations
test('Check for WCAG, A, or AA Violations', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
    console.log('Accessibility Violations:', accessibilityScanResults.violations);
});