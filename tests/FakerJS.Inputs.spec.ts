import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Home', () => {
    test('Testing Faker.js with Web Inputs Page', async ({ page }) => {
        //Open the homepage url
        await page.goto('https://practice.expandtesting.com/inputs');

        //Verify Page Title
        await expect(page).toHaveTitle("Web inputs page for Automation Testing Practice");

        // Using Faker to generate a random name
        const randomName = faker.person.firstName();
        console.log("Generated Random Name: " + randomName);

        // Using Faker to generate a random telephone number
        const randomNumber = faker.number.int({ min: 100, max: 10000 });
        console.log("Generated Random Phone Number: " + randomNumber);

        // Using Faker to generate a random password
        const randomPassword = faker.internet.password();
        console.log("Generated Random Password: " + randomPassword);

        // Using Faker to generate a random date
        const randomDate = faker.date.past();
        console.log("Generated Random Date: " + randomDate);

        // enter the generated random data into the input fields
        await page.fill('#input-text', randomName);
        await page.fill('#input-number', randomNumber.toString());
        await page.fill('#input-password', randomPassword);
        await page.fill('#input-date', randomDate.toISOString().split('T')[0]);
        
        // Verify that the input fields have been filled with the generated data
        await expect(page.locator('#input-text')).toHaveValue(randomName);
        await expect(page.locator('#input-number')).toHaveValue(randomNumber.toString());
        await expect(page.locator('#input-password')).toHaveValue(randomPassword);
        await expect(page.locator('#input-date')).toHaveValue(randomDate.toISOString().split('T')[0]);

        // Create "Display Inputs" button
        const inputsButton = page.getByRole('button', { name: 'Display inputs' });

        // Submit the form
        await inputsButton.click();

        // Verify that subission was successful & Output fields are not empty
        await expect(page.locator('#output-text')).not.toBeEmpty();
        await expect(page.locator('#output-number')).not.toBeEmpty();
        await expect(page.locator('#output-password')).not.toBeEmpty();
        await expect(page.locator('#output-date')).not.toBeEmpty();

           // Create "Clear Inputs" button
        const clearButton = page.getByRole('button', { name: 'Clear inputs' });

        // Submit the form
        await clearButton.click();

        // Verify that the input fields have been cleared
        await expect(page.locator('#input-text')).toHaveValue('');
        await expect(page.locator('#input-number')).toHaveValue('');
        await expect(page.locator('#input-password')).toHaveValue('');
        await expect(page.locator('#input-date')).toHaveValue('');

    });
});
