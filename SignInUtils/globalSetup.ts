// Global Setup file for Playwright (Signed-In State)
// https://playwright.dev/docs/test-configuration

import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage()

  // Website URL for login
  await page.goto('https://practice.automationbro.com/my-account')
  await page.context().storageState({ path: 'notLoggedInState.json' });

  // Login Steps
  await page.locator('#username').fill('practiceuser1')
  await page.locator('#password').fill('PracticePass1!')
  await page.locator('[value="Log in"]').click() 

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'loggedInState.json' });
  await browser.close();
}

export default globalSetup