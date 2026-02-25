import { Page, Locator , expect } from '@playwright/test'; 

export class MajorSubjectPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    usernameBox
    passwordBox

    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor (page:Page){
        this.page = page;
        this.usernameBox = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' })
        this.passwordBox = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' })
        
    }




    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }


    async fillUsernameAndPassword(username:string , password:string){
        await expect(this.usernameBox).toBeVisible()
        await this.usernameBox.pressSequentially(username ,{ delay : 100 })

        await expect(this.passwordBox).toBeVisible()
        await this.passwordBox.pressSequentially(password ,{ delay : 100 })
    }

    async gotoMajorSubjectMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        const majorSubeject = this.page.getByRole('link', { name: 'ข้อมูลวิชาเอก' })
        await applicationWork.click()
        await basicInfoButton.click()
        await majorSubeject.click()
    }
}