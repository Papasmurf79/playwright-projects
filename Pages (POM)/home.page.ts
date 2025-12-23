import { Page, Locator } from '@playwright/test';

// Create a Page Object Model (POM) for the Home Page will all locators and methods related to the Home Page
// This POM is for all testcases 
class HomePage {
    // Typescript property declarations (no need for Javascript)
    // Define all the pages and locators used in the testcases
    page: Page;
    getStartedBtn: Locator;
    homeText: Locator;
    contactLink: Locator;
    constructor(page: Page) {
        this.page = page;
        this.getStartedBtn = page.locator('#get-started');
        this.homeText = page.locator('#menu-bar:has-text=("nav-home")');
        this.contactLink = page.locator('#menu-bar:has-text=("nav-contact")');  
    }

    // Create a class of for weblinks
    async navigate() {
        await this.page.goto('https://practicesoftwaretesting.com/');;
    }
    
    // Method to get all contact link texts on the page at the same time
    async getContactLinksText() {
        return this.contactLink.allInnerTexts();
        // dont need to add async and/or await if just returning the value
    }

}

export default HomePage;