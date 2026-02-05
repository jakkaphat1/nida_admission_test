import { Page, Locator , expect } from '@playwright/test'; 

export class DocumentRequirementPage {
    page:Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */

    ApplicationWork : Locator;
    InitialData
    DocumentAttachmentMenu 






    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;

        this.ApplicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        this.InitialData = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        this.DocumentAttachmentMenu  = this.page.getByRole('link', { name: 'กำหนดการแนบเอกสาร' })






















    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async clickDocumentAttachmentMenu(){
        await this.ApplicationWork.click()
        await this.InitialData.click()
        await this.DocumentAttachmentMenu.click()
    }

}