import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,   // 🔑 THIS FIXES YOUR ERROR
  });

  const page = await context.newPage();

  // Navigate to login page
  await page.goto("https://practice.automationbro.com/my-account", {
    waitUntil: "domcontentloaded",
  });

  // Optional: save pre-login state (usually unnecessary)
  await context.storageState({ path: "notLoggedInState.json" });

  // Login steps
  await page.locator("#username").fill("practiceuser1");
  await page.locator("#password").fill("PracticePass1!");
  await page.locator('[value="Log in"]').click();

  // Wait for successful login signal (important!)
  await page.waitForURL("**/my-account", { timeout: 10000 });

  // Save logged-in state
  await context.storageState({ path: "loggedInState.json" });

  await browser.close();
}

export default globalSetup;
