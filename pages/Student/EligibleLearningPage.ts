import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class EligibleLearningPage {
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
    async gotoEligibleLearningMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const learningApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครเรียน' })
        const eligibleLearningApplicationMenu = this.page.getByRole('link', { name: 'ข้อมูลรายชื่อผู้มีสิทธิ์สอบประจำโครงการ', exact: true })
        await applicationWork.click()
        await basicInfoButton.click()
        await learningApplicationListItem.click()
        await eligibleLearningApplicationMenu.click()
    }

    async checkLearningEligibleMenu(){
        const notAnnouce = this.page.getByRole('button', { name: 'ยังไม่ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' })
        const annouced = this.page.getByRole('button', { name: 'ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' }).nth(1)
        await expect(notAnnouce).toBeVisible();
        await expect(annouced).toBeVisible()
    }
}