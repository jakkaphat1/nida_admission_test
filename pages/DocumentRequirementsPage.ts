import { Page, Locator , expect } from '@playwright/test'; 

export class DocumentRequirementPage {
    page:Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */

    ApplicationWork : Locator;
    InitialData
    DocumentAttachmentMenu 
    SearchBox
    filterMoreInfo
    selectEducationLevel
    facultyDropdown
    studentTypeDropdown
    educationDropdown






    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;

        this.ApplicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        this.InitialData = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        this.DocumentAttachmentMenu  = this.page.getByRole('link', { name: 'กำหนดการแนบเอกสาร' })
        this.SearchBox = this.page.getByRole('textbox', { name: 'ค้นหารหัสหรือชื่อกำหนดเอกสาร' })

        this.filterMoreInfo = this.page.getByRole('button', { name: 'ตัวกรอง' })

        this.selectEducationLevel = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ })
        this.facultyDropdown = this.page.locator('div').filter({ hasText: /^เลือกคณะ$/ }).nth(3)
        this.studentTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
        this.educationDropdown = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ }).last();












    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async clickDocumentAttachmentMenu(){
        await this.ApplicationWork.click()
        await this.InitialData.click()
        await this.DocumentAttachmentMenu.click()
    }

    async searchingInsearchBox(indexOfDocument:string){
        await this.page.waitForTimeout(500)
        const searchingWord = this.SearchBox
        await searchingWord.fill(indexOfDocument)
    }

    async clearSearchingBox(){
        await this.page.waitForTimeout(500)
        const searchingBox = this.SearchBox
        await searchingBox.clear()
    }

    async clickFilterMoreInfo(){
        await this.page.waitForTimeout(500)
        await this.filterMoreInfo.click()
    }
    
    async searchByfilterBtn(edulevelName : string , facultyName :string , studentType : string){
        await this.page.waitForTimeout(500)
        await this.educationDropdown.click();
        const edu_option = this.page.getByRole('option', { name: edulevelName });
        await edu_option.waitFor({ state: 'visible' });
        await edu_option.click();

        await this.page.waitForTimeout(200)
        await this.facultyDropdown.click()
        const faculty_option = this.page.getByRole('option', { name: facultyName });
        await faculty_option.waitFor({ state: 'visible' });
        await faculty_option.click();

        await this.page.waitForTimeout(200)
        await this.studentTypeDropdown.click()
        const student_option = this.page.getByRole('option', { name: studentType });
        await student_option.waitFor({ state: 'visible' });
        await student_option.click();

    }
}
