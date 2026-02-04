import { Page, Locator , expect } from '@playwright/test'; 

export class BackOffice {
    page : Page;    

/**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    backOfficeURL = 'https://backoffice-uat.nida.ac.th/login';
    backOfficeLandingURL = 'https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission';
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    ApplicationWork : Locator; // ปุ่มงานรับสมัคร
    InitialData : Locator; //ปุ่มข้อมูลตั้งต้น
    curriculumAndprogram : Locator;
    searchCurriculumBox : Locator;
    fillCurriculumBox : Locator;
/**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;

        this.usernameInput = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' });
        this.loginButton = this.page.getByRole('button', { name: 'เข้าสู่ระบบ' });

        this.ApplicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        this.InitialData = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        this.curriculumAndprogram  = this.page.getByRole('link', { name: 'ข้อมูลหลักสูตรและโครงการ' })

        this.searchCurriculumBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อหลักสูตรและโครงการ' })
        this.fillCurriculumBox =  this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อหลักสูตรและโครงการ' })
    }

/**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async gotoBackOfficeLogin() {
        await this.page.goto(this.backOfficeURL);
    }

    async gotoBackOffice(){
        await this.page.goto(this.backOfficeLandingURL);
    }

    async fillUsernameANDfillPassword(username: string , password: string) {
        await this.usernameInput.scrollIntoViewIfNeeded();
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.evaluate(el => el.style.border = '3px solid red');
        await this.page.waitForTimeout(500);
        await this.usernameInput.click();
        await this.usernameInput.fill(username);

        await this.passwordInput.scrollIntoViewIfNeeded();
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }

    async clickToFacultyInformation(fillCurriculum : string){
        await this.ApplicationWork.click()
        await this.InitialData.click()
        await this.curriculumAndprogram.click()
        await this.searchCurriculumBox.fill(fillCurriculum);
        
        await this.page.getByRole('button', { name: 'ตัวกรอง' }).click();
    
        // เลือก ระดับการศึกษา
        await this.page.getByText('เลือกระดับการศึกษา').click();
        await this.page.getByRole('option', { name: 'ปริญญาโท' }).click();
        
        // เลือก ประเภทนักศึกษา
        await this.page.getByText('เลือกประเภทนักศึกษา').click();
        await this.page.getByRole('option', { name: 'ภาคปกติ' }).click();
        
        // เลือก ประเภทการสอบ
        await this.page.getByText('เลือกประเภทการสอบ').click();
        await this.page.getByRole('option', { name: 'สอบข้อเขียนและสอบสัมภาษณ์' }).click();

        await this.page.getByRole('button', { name: 'ล้างข้อมูลทั้งหมด' }).click();
    }
}