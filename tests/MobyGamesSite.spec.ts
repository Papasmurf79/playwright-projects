import { test, expect } from '@playwright/test';
import { chromium as extraChromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Apply stealth plugin
extraChromium.use(StealthPlugin());

test.describe('MobyGames – Stealth Tests', () => {

  test('Verify MobyGames logo appears', async () => {

    // Create Variables for Playwright Extra Chromium Stealth
    const browser = await extraChromium.launch({
      headless: true,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 }
    });

    const page = await context.newPage();

    await page.goto('https://www.mobygames.com/', { waitUntil: 'domcontentloaded' });

    const logo = page.locator('.navbar-logo');
    await expect(logo).toBeVisible();

    await browser.close();
  });

  test('Verify Jonathan Cage profile page', async () => {
    const browser = await extraChromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.mobygames.com/person/425064/jonathan-cage/', {
      waitUntil: 'domcontentloaded'
    });

    // Verify name
    await expect(page.locator('h1')).toHaveText(/Jonathan Cage/);

    // Verify profile image loaded correctly
    const profileImage = page.locator('#developerPortrait img');
    await expect(profileImage).toBeVisible();

    const naturalWidth = await profileImage.evaluate(
      (img: HTMLImageElement) => img.naturalWidth
    );
    expect(naturalWidth).toBeGreaterThan(0);

    await browser.close();
  });

  test('Verify Moby+ Subscribe button appears', async () => {
    const browser = await extraChromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.mobygames.com/');

    // Click the MobyPlus Button with CSS selector & anchor tag (a.)
    await page.locator('a.navbar-mobypro-link[href="/mobyplus/"]').click();
  
    // Verify updated URL loaded correctly
    await expect(page).toHaveURL('https://www.mobygames.com/mobyplus/');

    // Create variable for Subscribe button
    const subscribeButton = page.getByRole('button', { name: 'Subscribe' });

    await expect(subscribeButton).toBeVisible();

    await browser.close();
  });

});
