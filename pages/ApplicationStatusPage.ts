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


    // สมัครสอบข้อเขียน
    writtenExamButton : Locator;
    cancelWrittenApplyExamButton : Locator;
    draftWrittenExamForm : Locator;
    editWrittenExamInfoButton : Locator;
    editWrittenExamInfoButton3 : Locator;
    payWrittenExamButton : Locator;
    selectPaymentGateWayWording : Locator;
    clickWrittenExamPaymentGateway : Locator;
    payButton: Locator;
    confirmButton: Locator;


    // ปรับปรุงใบสมัคร
    updateApplicationButton : Locator;





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
        
        
        //สมัครสอบข้อเขียน
        this.writtenExamButton = page.locator('a[href="/application-status/apply-exam"]').filter({ hasText : 'สมัครสอบข้อเขียน' });
        
        const writtenExamcardHeader = page.locator('div.border-success')
            .filter({ hasText: 'ยังไม่ได้รับเลขที่ใบสมัคร' })
            .first();

        this.draftWrittenExamForm = writtenExamcardHeader.locator('xpath=../..');    
        this.cancelWrittenApplyExamButton = this.draftWrittenExamForm
            .locator('button')
            .filter({ hasText: 'ยกเลิกใบสมัคร' });

        this.editWrittenExamInfoButton = this.draftWrittenExamForm
            .locator('div.bg-\\[\\#FAFBFD\\]')
            .locator('button.bg-primary')
            .filter({ hasText: 'แก้ไขข้อมูล' })
            .first();

        this.editWrittenExamInfoButton3 = this.draftWrittenExamForm
            .locator('div.bg-\\[\\#FAFBFD\\]')
            .locator('button.bg-primary')
            .filter({ has: page.locator('svg') })
            .filter({ hasText: 'แก้ไขข้อมูล' })
            .first();    
        this.payWrittenExamButton = this.draftWrittenExamForm
            .locator('button.bg-primary')
            .filter({ has: page.locator('svg') })
            .filter({ hasText: 'ชำระเงินค่าสมัคร' });    
        this.selectPaymentGateWayWording = page.locator('h5').filter({ hasText : 'เลือกช่องทางการชำระเงิน'});
        this.clickWrittenExamPaymentGateway = page.locator('p.text_level_2').filter({ hasText: 'Bill Payment' });
        this.payButton = page.locator('button').filter({ hasText: 'ชำระเงิน' });
        this.confirmButton = page.locator('button').filter({ hasText: 'ยืนยัน' });
    
        // ปรับปรุงใบสมัคร
        this.updateApplicationButton = page.locator('a[href="/application-status/check"]').filter({ hasText : 'ปรับปรุงใบสมัคร' });


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


    // สมัครสอบข้อเขียน //
    async clickWrittenExamButtom(){
        
        await this.writtenExamButton.evaluate((el) => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '3px solid red';
        })
        await this.writtenExamButton.click();
        await this.page.waitForTimeout(1000);
    }

    async clickCancelWrittenExamButton() {
        await this.cancelWrittenApplyExamButton.scrollIntoViewIfNeeded();

        await this.cancelWrittenApplyExamButton.waitFor({ state: 'visible' });

        await this.cancelWrittenApplyExamButton.evaluate(el => el.style.border = '3px solid red');
        await this.page.waitForTimeout(500);
        await this.cancelWrittenApplyExamButton.click();
    }

    async clickEditDraftWrittenExamInfo() {
        await this.draftWrittenExamForm.scrollIntoViewIfNeeded();

        await this.draftWrittenExamForm
            .locator('span.text-danger')
            .filter({ hasText: 'ยังไม่ได้รับเลขที่ใบสมัคร' })
            .evaluate(el => el.style.outline = '3px solid lime')
            .catch(() => {});

        const editButton = this.draftWrittenExamForm
            .locator('div.bg-\\[\\#FAFBFD\\]')
            .locator('button.bg-primary')
            .filter({ hasText: 'แก้ไขข้อมูล' })
            .first();

        await editButton.waitFor({ state: 'visible', timeout: 10000 });

        await editButton.evaluate(el => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
        }).catch(() => {});

        await editButton.click();
        await this.page.waitForTimeout(1000)
    }

    async clickEditDraftWrittenExamInfo3() {
        await this.draftWrittenExamForm.scrollIntoViewIfNeeded();

        await this.draftWrittenExamForm
            .locator('span.text-danger')
            .filter({ hasText: 'ยังไม่ได้รับเลขที่ใบสมัคร' })
            .evaluate(el => el.style.outline = '3px solid lime')
            .catch(() => {});

        // รอให้ปุ่มพร้อม
        await this.editWrittenExamInfoButton3.waitFor({ 
            state: 'visible', 
            timeout: 10000 
        });

        // Highlight ปุ่ม
        await this.editWrittenExamInfoButton3.evaluate(el => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
        }).catch(() => {});

        // กดปุ่ม
        await this.editWrittenExamInfoButton3.click();
        await this.page.waitForTimeout(1000);
    }

    async clickPayWrittenExamButton() {
        await this.draftWrittenExamForm.scrollIntoViewIfNeeded();
        await this.payWrittenExamButton.waitFor({ 
            state: 'visible', 
            timeout: 10000 
        });

        // Highlight ปุ่ม
        await this.payWrittenExamButton.evaluate(el => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
        }).catch(() => {});

        // กดปุ่ม
        await this.payWrittenExamButton.click();
        await this.page.waitForTimeout(1000);
    }

    async highlightPaymentWording() {
        await this.selectPaymentGateWayWording.waitFor({ state: 'visible' });

        await this.selectPaymentGateWayWording.evaluate((el) => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
            el.style.padding = '5px';
            el.scrollIntoView();
        });
        
        await this.page.waitForTimeout(1000); 
    }

    async clickWrittenExamBillPayment() {
        console.log('Select Bill Payment');

        await this.clickWrittenExamPaymentGateway.waitFor({ state: 'visible', timeout: 10000 });

        await this.clickWrittenExamPaymentGateway.scrollIntoViewIfNeeded();

        await this.clickWrittenExamPaymentGateway.evaluate(el => el.style.border = '2px solid red');

        await this.clickWrittenExamPaymentGateway.click();
    }

    async confirmPaymentFlow() {
        console.log('กดปุ่มชำระเงิน');
        
        await this.payButton.waitFor({ state: 'visible' });
        await this.payButton.evaluate(el => el.style.border = '2px solid blue');
        await this.payButton.click();

        console.log('กดยืนยันใน popup');
        
        await this.confirmButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.confirmButton.evaluate(el => el.style.border = '2px solid red');
        await this.confirmButton.click();
    }

    async clickupdateApplicationButton(){
        await this.updateApplicationButton.click();
    }
}