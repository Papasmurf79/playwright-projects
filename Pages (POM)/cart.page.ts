import { Page } from '@playwright/test';
import  UploadComponent from './components/upload.page';

class CartPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    // Adding Upload Component from upload.page.ts
    uploadcomponent(){
        return new UploadComponent(this.page);
    }
}

export default CartPage;