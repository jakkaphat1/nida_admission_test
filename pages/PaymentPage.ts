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

}