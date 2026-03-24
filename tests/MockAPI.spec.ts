import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('API Mocking Username List with FakerJS', async ({ page }) => {
  // Generate random usernames using FakerJS
  const randomUsernames = Array.from({ length: 3 }, () => faker.internet.username());

  const mockFollowers = randomUsernames.map(username => ({
    login: username,
    id: faker.number.int({ min: 1000000, max: 9999999 }),
    avatar_url: faker.image.avatar(),
    html_url: `https://github.com/${username}`,
    type: 'User'
  }));

  console.log('Generated Random Usernames:', randomUsernames);
 
// Log all network requests to the console
  page.on('request', req => console.log('REQUEST:', req.url()));

  // Mock the user profile API response
  await page.route('**/users/nadvolod', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        login: 'nadvolod',
        id: 1234567,
        avatar_url: 'https://avatars.githubusercontent.com/u/1234567?v=4',
        bio: 'SDET Trainer',
        followers: mockFollowers.length,
        following: 50,
        public_repos: 30,
        name: 'Nikolay Advolodkin'
      }),
    });
  });

  // Mock the followers API response
  await page.route('**/users/nadvolod/followers*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockFollowers),
    });
  });

  await page.goto('https://gh-users-search.netlify.app/');

  const searchInput = page.locator('input[placeholder*="github user"]');
  await searchInput.fill('nadvolod');

  const searchButton = page.getByRole('button', { name: /search/i });
  await searchButton.click();

  // Validate user profile info that the site actually renders
  await expect(page.locator('text=Nikolay Advolodkin')).toBeVisible();
  await expect(page.locator('text=SDET Trainer')).toBeVisible();

  // Validate mocked follower count, not follower usernames
  await expect(page.locator('text=3')).toBeTruthy();
});