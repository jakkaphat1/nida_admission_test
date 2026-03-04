import { Page, Locator , expect } from '@playwright/test'; 

export class AdmissionCalendarInformationPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    usernameBox
    passwordBox
    backOfficeLandingURL = 'https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission';

    constructor(page:Page) {
        this.page = page;
        

        this.usernameBox = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' })
        this.passwordBox = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' })
    }
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoBackOffice(){
        await this.page.goto(this.backOfficeLandingURL);
    }

    async fillUsernameAndPassword(username:string , password:string){
        await expect(this.usernameBox).toBeVisible()
        await this.usernameBox.pressSequentially(username ,{ delay : 100 })

        await expect(this.passwordBox).toBeVisible()
        await this.passwordBox.pressSequentially(password ,{ delay : 100 })
    }

    async gotoAdmissionCalendarInformationMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        const admissionCalendarInformationButton = this.page.getByRole('link', { name: 'ข้อมูลปฏิทินการรับสมัคร' })
        await applicationWork.click()
        await basicInfoButton.click()
        await admissionCalendarInformationButton.click()
    }

    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }

    
}