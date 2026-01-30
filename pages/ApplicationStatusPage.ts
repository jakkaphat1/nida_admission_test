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
    expandDetailsButton : Locator;
    payApplicationButton : Locator;
    cancelApplicationButton : Locator;
    confirmCancelButton : Locator;


/**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor (page:Page) {
        this.page = page;
        this.checkApplicationMenu = page.locator('div.cursor-pointer').filter({ hasText: 'ตรวจสอบใบสมัคร' });
        this.checkApplyMenu = page.locator('a[href="/application-status/apply-study"]').filter({ hasText : 'สมัครเรียน' });
        
        const cardHeader = page.locator('div.border-success')
            .filter({ hasText: /ใบสมัครฉบับร่าง|นำส่งใบสมัครแล้ว|รอชำระเงิน/ })
            .first();
        this.draftApplicationForm = cardHeader.locator('xpath=..');
        this.editInfoButton = this.draftApplicationForm
            .locator('button.bg-primary')
            .filter({ hasText: /แก้ไขข้อมูล/ })
            .nth(1);
        this.expandDetailsButton = page.locator('div')
            .filter({ hasText: 'นำส่งใบสมัครแล้ว' })
            .locator('xpath=..')
            .locator('div[aria-label="collapse-toggle"]')
            .nth(0);
        this.payApplicationButton = this.draftApplicationForm
            .locator('button')
            .filter({ hasText: 'ชำระเงินค่าสมัคร' });
        this.cancelApplicationButton = this.draftApplicationForm
            .locator('button')
            .filter({ hasText: 'ยกเลิกใบสมัคร' });
        this.confirmCancelButton = page.locator('.modalAlert_container button')
            .filter({ hasText: 'ยืนยัน' });
        
        
    
    
    
    
    
    
    
    
    
    
    
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

    async clickExpandDetailsButton() {
        await this.expandDetailsButton.scrollIntoViewIfNeeded();

        await this.expandDetailsButton.waitFor({ state: 'visible' });

        await this.expandDetailsButton.evaluate(el => el.style.border = '2px solid orange');
        await this.page.waitForTimeout(500);

        await this.expandDetailsButton.click();
    }
    
    async clickPaymentButton() {
        await this.payApplicationButton.scrollIntoViewIfNeeded();

        await this.payApplicationButton.waitFor({ state: 'visible', timeout: 5000 });

        await this.payApplicationButton.evaluate(el => el.style.border = '3px solid red')
            .catch(() => {}); 
        await this.page.waitForTimeout(2000);
        await this.payApplicationButton.click();
        await this.page.waitForTimeout(2000);
    }

    async clickCancelApplicationButton() {
        await this.cancelApplicationButton.scrollIntoViewIfNeeded();

        await this.cancelApplicationButton.waitFor({ state: 'visible' });

        await this.cancelApplicationButton.evaluate(el => el.style.border = '3px solid red');
        await this.page.waitForTimeout(500);
        await this.cancelApplicationButton.click();
    }

    async confirmCancelApplication() {
        await this.confirmCancelButton.waitFor({ state: 'visible' });

        await this.confirmCancelButton.evaluate(el => el.style.border = '3px solid green');
        await this.page.waitForTimeout(500);

        await this.confirmCancelButton.click();
        
        await this.confirmCancelButton.waitFor({ state: 'hidden' });
    }



}