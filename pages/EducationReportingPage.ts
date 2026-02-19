import { Page, Locator , expect } from '@playwright/test'; 

export class EducationReportingPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    reportingMenu

    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor (page:Page){
        this.page = page;
        this.reportingMenu = this.page.getByRole('link', { name: 'รายงานตัว', exact: true })
    }




    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
   async clickReportingMenu(){
        await this.reportingMenu.click()
   }

   async checkReportingFirstTimePopup(){
        const heading = this.page.getByRole('heading', { name: 'ยินยอมเปิดเผยข้อมูลส่วนบุคคล' })
        await expect(heading).toBeVisible()
   }

   async clickAcceptTermPolicy(){
        const acceptTermPolicyLabel = this.page.getByText('เงื่อนไขการเก็บใช้ และเปิดเผยข้อมูลส่วนตัวบุคคลดังกล่าว และยินยอมตามเงื่อนไขดังกล่าวทุกประการ')
        await expect(acceptTermPolicyLabel).toBeVisible()
        await acceptTermPolicyLabel.click()
   }

   async clickAcceptTermPolicyButton(){
        const acceptTermPolicyButton = this.page.getByRole('button', { name: 'ยอมรับระเบียบข้อตกลง' })
        await expect(acceptTermPolicyButton).toBeVisible()
        await acceptTermPolicyButton.click()
   }

   async clickProcessByLabel(processName:string){
        const card = this.page.locator('div').filter({ hasText: processName }).nth(3)
        const processButton = card.getByRole('button', { name: 'ดำเนินการ' }).first()
        await processButton.click()
   }

   async clickVerifyForForeigner(){
        const foreignerButton = this.page.locator('div').filter({ hasText: 'Verify for Foreigner' }).nth(4)
        await expect(foreignerButton).toBeVisible()
        await foreignerButton.click()
   }

   async selectFileForVerifyForeigner(fileNames: string[]){
        const attachFile = this.page.getByText('Attach file')
        const chooseFile = this.page.getByRole('button', { name: 'เลือกไฟล์' })
        await expect(attachFile).toBeVisible()
        await expect(chooseFile).toBeVisible()
        await attachFile.click()

        const filePaths = fileNames.map(file => `downloads/${file}`)

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            chooseFile.click()
        ])

        await fileChooser.setFiles(filePaths)
   }

   async clickConfirmVerification(){
        const confirmButton = this.page.getByRole('button', { name: 'Confirm verification' })
        await expect(confirmButton).toBeVisible()
        await confirmButton.click()
   }

   async clickConfirmPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })
        const confirmButton = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(heading).toBeVisible()
        await expect(confirmButton).toBeVisible()
        await confirmButton.click()
   }
}