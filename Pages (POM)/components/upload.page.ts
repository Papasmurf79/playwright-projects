import { Locator, Page } from '@playwright/test';

class UploadComponent {
   private page: Page;
    uploadBtn: Locator;
    fileInput: string;
    uploadMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadBtn = this.page.locator('#upload_1');
        this.fileInput = 'input#upfile_1';
        this.uploadMessage = this.page.locator('#wfu_messageblock_header_1_1');
    }

    async uploadFile(filePath: string) {
        // Upload test file
         await this.page.setInputFiles(this.fileInput, filePath);
        // Click submit button
        await this.uploadBtn.click();}
}

export default UploadComponent;