import { Page, Locator , expect } from '@playwright/test'; 

export class CommonPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    usernameBox
    passwordBox
    backOfficeLandingURL = 'https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission';
    backOfficeLoginURL = 'https://backoffice-uat.nida.ac.th/login/'
    
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
        

        this.usernameBox = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' })
        this.passwordBox = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' })
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoBackOfficeLogin(){
        await this.page.goto(this.backOfficeLandingURL);
    }

    async gotoBackOfficeLandingPage(){
        await this.page.goto(this.backOfficeLandingURL);
    }

    async fillUsernameAndPassword(username:string , password:string){
        const signInButton = this.page.getByRole('button', { name: 'เข้าสู่ระบบ' })
        await expect(this.usernameBox).toBeVisible()
        await this.usernameBox.pressSequentially(username ,{ delay : 100 })

        await expect(this.passwordBox).toBeVisible()
        await this.passwordBox.pressSequentially(password ,{ delay : 100 })
        await signInButton.click()
    }

    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }
}