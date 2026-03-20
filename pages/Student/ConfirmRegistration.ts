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
      // this.confirmEnrollmentTextLabel = this.page.getByRole('main').getByText('ยืนยันสิทธิ์', { exact: true })
      this.confirmEnrollmentTextLabel = this.page.locator('div').filter({ hasText: /^ยืนยันสิทธิ์$/ }).nth(1)

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

    async selectCourseInConfirmEnrollPageByName(courseName:string){
      const courseCard = this.page.locator('label').filter({hasText:courseName})
      await expect(courseCard).toBeVisible()
      await courseCard.click()
    }

    async clickEditContactInfo(){
      const editButton = this.page.getByRole('button').filter({ hasText: /^$/ })
      await expect(editButton).toBeVisible()
      await editButton.click()
    }

    async fillContactInfo(telephone:string , email:string){
      const telNumber = this.page.getByRole('textbox', { name: 'กรุณากรอกหมายเลขโทรศัพท์มือถือ' })
      const emailAddress = this.page.getByRole('textbox', { name: 'อีเมล (ที่ใช้สำหรับการติดต่อ)' })
      const correctInfo = this.page.getByRole('button').nth(3)
      await telNumber.pressSequentially(telephone)
      await emailAddress.fill(email)
      await correctInfo.click()
    }


    async clickConfirmEnrollmentAfterSelectOrFillData(){
      const confirmEnrollmentButton = this.page.getByRole('button', { name: 'ยืนยันสิทธิ์' })
      await expect(confirmEnrollmentButton).toBeVisible()
      await confirmEnrollmentButton.click()
    }

    async clickConfirmPopup(){
      const confirmPopupHeading = this.page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })
      const confirmPopupButton = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
      await expect(confirmPopupHeading).toBeVisible()
      await expect(confirmPopupButton).toBeVisible()
      await confirmPopupButton.click()
      await this.page.waitForTimeout(2000)
    }
}