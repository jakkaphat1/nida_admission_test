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

}