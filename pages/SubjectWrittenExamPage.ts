import { Page, Locator , expect } from '@playwright/test'; 

export class SubjectWrittenExamPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */

    
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
        
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoSubjectWrittenExamMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const subjectWritten = this.page.getByRole('link', { name: 'วิชาที่เปิดสอบข้อเขียน' })
        await applicationWork.click()
        await basicInfoButton.click()
        await subjectWritten.click()
    }

    async checkSubjectWrittenExamMenu(){
        const notOpen = this.page.getByRole('button', { name: 'ยังไม่ประกาศเปิดรับสมัคร' })
        const opened = this.page.getByRole('button', { name: 'ประกาศเปิดรับสมัครแล้ว' })
        await expect(notOpen).toBeVisible()
        await expect(opened).toBeVisible()
    }
}