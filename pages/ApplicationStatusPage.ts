import { Page, Locator , expect } from '@playwright/test'; 

export class ApplicationStatusPage {
    page : Page;
/**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    checkApplicationMenu: Locator;
    checkApplyMenu : Locator;
    draftApplicationForm : Locator;
    editInfoButton : Locator;

/**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor (page:Page) {
        this.page = page;
        this.checkApplicationMenu = page.locator('div.cursor-pointer').filter({ hasText: 'ตรวจสอบใบสมัคร' });
        this.checkApplyMenu = page.locator('a[href="/application-status/apply-study"]').filter({ hasText : 'สมัครเรียน' });
        
        const cardHeader = page.locator('div.border-success')
            .filter({ hasText: 'ใบสมัครฉบับร่าง' })
            .first();
        this.draftApplicationForm = cardHeader.locator('xpath=..');
        this.editInfoButton = this.draftApplicationForm
            .locator('button.bg-primary')
            .filter({ hasText: /แก้ไขข้อมูล/ })
            .nth(1);
        
    
    
    
    
    
    
    
    
    
    
    
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


    async clickEditDraftInfo() {
        await this.draftApplicationForm.scrollIntoViewIfNeeded();

        const statusTag = this.draftApplicationForm
            .locator('.tag_box')
            .filter({ hasText: 'ใบสมัครฉบับร่าง' })
            .first();

        await statusTag.evaluate(el => el.style.outline = '3px solid lime').catch(() => {});

        await this.editInfoButton.waitFor({ state: 'visible', timeout: 10000 });

        await this.editInfoButton.evaluate(el => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
        });

        await this.page.waitForTimeout(1000);
        await this.editInfoButton.click();
    }
    






}