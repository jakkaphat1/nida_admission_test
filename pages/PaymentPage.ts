import { Page, Locator , expect } from '@playwright/test'; 

export class PaymentPage{
    page : Page;

/**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    paymentModule
    toBePaid
    historyPaid
    changePayment
    paidButton
    confirmPopupButton
    studentApplicationHistoryPaid
    examApplicationHistoryPaid
/**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor (page:Page){
        this.page = page;
        this.paymentModule = this.page.locator('div').filter({ hasText: 'การชำระเงิน' }).nth(3)
        this.toBePaid = this.page.getByRole('link', { name: 'ที่ต้องชำระ' })
        this.historyPaid = this.page.getByRole('link', { name: 'ประวัติการชำระ' })
        this.changePayment = this.page.getByRole('button', { name: 'เปลี่ยนช่องทางการชำระเงิน' })
        this.paidButton = this.page.getByRole('button', { name: 'ชำระเงิน' })
        this.confirmPopupButton = this.page.getByRole('button', { name: 'ยืนยัน' })

        this.studentApplicationHistoryPaid = this.page.getByRole('button', { name: 'สมัครเรียน' })
        this.examApplicationHistoryPaid = this.page.getByRole('button', { name: 'สมัครสอบข้อเขียน' })
    }

 /**
 * Method SECTION
 * ---------------------------------------------------------------- */
    async clickPaymentModule(){
        await this.paymentModule.click()
    }

    async clickToBePaid(){
        await this.toBePaid.click()
    }

    async clickHistoryPaid(){
        await this.historyPaid.click()
    }

    async checkPaymentModule(){
        await expect(this.paymentModule).toBeVisible()
        await expect(this.toBePaid).toBeVisible()
        await expect(this.historyPaid).toBeVisible()
    }

    async checkPaymentCard(PaymentNumber:string){
        const card = this.page.locator('div').filter({ hasText: PaymentNumber }).nth(5)
        await expect(card).toBeVisible()
    }

    async clickChangePaymentGateWayByCard(PaymentNumber:string){
        const card = this.page.locator('div').filter({ hasText: PaymentNumber }).nth(5)
        await expect(card).toBeVisible()

        await card.locator(this.changePayment).click()
    }

    async clickPaymentWay(paymentType:string){
        const paymentCard = this.page.getByText(paymentType, { exact: true })
        await expect(paymentCard).toBeVisible()
        await paymentCard.click()
    }
    
    async clickPaidBtn(){
        await this.paidButton.click()
    }

    async clickConfirmPopupBtn(){
        await this.confirmPopupButton.click()
    }

    async checkHistoryPaid(){
        await expect(this.studentApplicationHistoryPaid).toBeVisible()
        await expect(this.examApplicationHistoryPaid).toBeVisible()
        await expect(this.page.getByLabel('page-list')).toBeVisible()
    }

    async checkPaidStatus(paidNumber:string,paidstatus:string){
        // const invoiceNumber = this.page.locator('.p-4 ').filter({hasText : `เลขที่ใบแจ้งหนี้ : ${paidNumber}` })
        // const paidStatus = this.page.getByText('ชำระเงินแล้ว')

        // const isInvoiceVisible = await invoiceNumber.isVisible();
        // const isPaidStatusVisible = await paidStatus.isVisible();
        // if (isInvoiceVisible && isPaidStatusVisible) {
        //     console.log(` ตรวจพบเลขที่ใบแจ้งหนี้: ${paidNumber} และชำระเงินเรียบร้อยแล้ว`);
        // } else {
        //     console.log(` ไม่พบข้อมูลการชำระเงินสำหรับเลขที่: ${paidNumber}`);
        // }

        const card = this.page.locator('.p-4').filter({ 
            hasText: `เลขที่ใบแจ้งหนี้ : ${paidNumber}` 
        });

        await expect(card.getByText(paidstatus)).toBeVisible();
        console.log(`Verification Passed for ${paidNumber}`);
    }

    async clickExpand(paidNumber:string){
        const card = this.page.locator('.p-4').filter({ 
            hasText: `เลขที่ใบแจ้งหนี้ : ${paidNumber}` 
        });
        const expandBtn = card.locator('.cursor-pointer');
        await expandBtn.click();
        console.log(`Clicked expand for ${paidNumber}`);
        await this.page.waitForTimeout(1000)
    }

    async checkExpandCardDetail(paidNumber:string, amount:string,payment:string,owner:string){
        const card = this.page.locator('.p-4').filter({ 
            hasText: `เลขที่ใบแจ้งหนี้ : ${paidNumber}` 
        });

        const applyAmount = card.locator('div').filter({ hasText: `จำนวนเงิน:${amount} บาท` }).first()
        const paymentWay = card.locator('div').filter({ hasText: `รูปแบบการชำระ:${payment}` }).first()
        const transactionBy = card.locator('div').filter({ hasText: `ทำรายการโดย:${owner}` }).first()

        await expect(applyAmount).toBeVisible()
        await expect(paymentWay).toBeVisible()
        await expect(transactionBy).toBeVisible()
    }
}