import { Page, Locator , expect } from '@playwright/test'; 

export class ApplicationStatusPage {
    page : Page;
/**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    checkApplicationMenu: Locator;
    checkApplyMenu : Locator;

/**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor (page:Page) {
        this.page = page;
        this.checkApplicationMenu = page.locator('div.cursor-pointer').filter({ hasText: 'ตรวจสอบใบสมัคร' });
        this.checkApplyMenu = page.locator('a[href="/application-status/apply-study"]').filter({ hasText : 'สมัครเรียน' });
    
    
    
    
    
    
    
    
    
    
    
    
    }


    /**
 * Method SECTION
 * ---------------------------------------------------------------- */
    async clickCheckApplicationStatus() {
        await this.checkApplicationMenu.click();
        await expect(this.checkApplicationMenu).toBeVisible();
        await this.page.waitForTimeout(1000)
    }

    async clickCheckApplyMenu(){
        //higtlight
        await this.checkApplyMenu.evaluate((el) => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '3px solid red';
        })
        await this.page.waitForTimeout(1000);
        await this.checkApplyMenu.click();
        await expect(this.checkApplyMenu).toBeVisible();
        await this.page.waitForTimeout(2000);
    }
    






}