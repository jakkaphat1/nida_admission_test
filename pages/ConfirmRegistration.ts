import { Page, Locator , expect } from '@playwright/test'; 

export class ConfirmRegistration {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
   confirmEnrollmentButton
   confirmEnrollmentTextLabel
   nextStepEnrollment
   confirmEnrollmentPolicyPopup

    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor (page:Page){
      this.page = page;
      this.confirmEnrollmentButton = this.page.getByRole('link', { name: 'ยืนยันสิทธิ์' })
      this.confirmEnrollmentTextLabel = this.page.getByRole('main').getByText('ยืนยันสิทธิ์', { exact: true })
      this.nextStepEnrollment = this.page.getByRole('button', { name: 'ไปขั้นตอนการรายงานตัวต่อ' })
      this.confirmEnrollmentPolicyPopup = this.page.getByText('ระเบียบข้อตกลงในการยืนยันสิทธิ์ผู้สมัครจำเป็นจะต้องยอมรับระเบียบก่อนเริ่มการยืนยันสิทธิ์')
    }




    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async clickConfirmEnrollmentBtn(){
      await this.confirmEnrollmentButton.click()
      await expect(this.confirmEnrollmentTextLabel).toBeVisible()
    }

    async clickNextStepEnrollment(){
      await this.nextStepEnrollment.click()
    }

    async checkConfirmEnrollmentPolicyPopup(){
      await expect(this.confirmEnrollmentPolicyPopup).toBeVisible()
    }

    async clickCheckboxInPolicyPopup(firstTextBox:string , secondTextBox:string){
      const box1 = this.page.getByText(firstTextBox)
      const box2 = this.page.getByText(secondTextBox)
      await box1.click()
      await this.page.waitForTimeout(1000)
      await box2.click()
      await this.page.waitForTimeout(1000)
    }

    async clickAcceptEnrollmentPolicy(){
      await this.page.getByRole('button', { name: 'ยอมรับระเบียบข้อตกลง' }).click()
    }
}