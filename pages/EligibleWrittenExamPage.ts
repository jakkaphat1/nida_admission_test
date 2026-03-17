import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class EligibleWrittenExamPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    notAnnouceTab
    annoucedTab
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
        this.notAnnouceTab = this.page.getByRole('button', { name: 'ยังไม่ประกาศรายชื่อผู้มีสิทธิ์สอบ' })
        this.annoucedTab = this.page.getByRole('button', { name: 'ประกาศรายชื่อผู้มีสิทธิ์สอบแล้ว' })
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoEligibleWrittenExamListMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const writtenApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครสอบวิชาเฉพาะ' })
        const eligibleWrittenExamMenu = this.page.getByRole('link', { name: 'ข้อมูลรายชื่อผู้มีสิทธิ์สอบประจำวิชาเฉพาะ' })
        await applicationWork.click()
        await basicInfoButton.click()
        await writtenApplicationListItem.click()
        await eligibleWrittenExamMenu.click()
    }

    async checkEligibleWrittenExamMenu(){
        await expect(this.notAnnouceTab).toBeVisible();
        await expect(this.annoucedTab).toBeVisible()
    }
}