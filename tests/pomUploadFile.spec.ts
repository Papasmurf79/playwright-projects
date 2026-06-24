import { test, expect } from '@playwright/test';
import CartPage from '../Pages (POM)/cart.page';
const path = require('path');

test.describe('Upload File', () => {
    // Parameterized Test with file upload
    const fileUploads = [
        'Sgt_Hefty_Smurf.jpg',
        'Intro_Probability.pdf'
    ];

    // For Loop to iterate through multiple files via parameterized test
    // For running multiple tests in terminal type npx playwright test (name of test)
    
    for (const file of fileUploads) {
        test(`should upload a test file: ${file}`, async ({ page }) => {
            // Initialize CartPage object inside the test for proper isolation
            const cartPage = new CartPage(page);
            
            // Open the upload file page url
            await page.goto('https://practice.sdetunicorns.com/cart/');
            
            // Upload a file - store test file path
            const filePath = path.join(__dirname, `../data/${file}`);

            // DOM Manipulation to make the hidden file input visible
            await page.evaluate(() => {
                const selector = document.querySelector('input#upfile_1') as HTMLInputElement;
                if (selector) {
                    selector.className = '';
                }
            });

            // Upload test file using POM Upload Component method
            await cartPage.uploadcomponent().uploadFile(filePath);
            
            // Click submit button using POM
            await cartPage.uploadcomponent().uploadBtn.click();
            
            // Assert file is uploaded using POM
            await expect(cartPage.uploadcomponent().uploadMessage).toBeVisible();
            // OR if you want to check specific text:
            // await expect(cartPage.uploadcomponent().uploadMessage).toContainText('uploaded successfully');
        });
    }
});
    