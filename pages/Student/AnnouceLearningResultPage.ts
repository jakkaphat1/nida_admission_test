import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class AnnouceLearningResultPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    notAnnouceScoreTab
    annoucedScoreTab
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
        this.notAnnouceScoreTab = this.page.getByRole('button', { name: 'ยังไม่ประกาศผลคะแนน' })
        this.annoucedScoreTab = this.page.getByRole('button', { name: 'ประกาศผลคะแนนแล้ว' })
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoAnnouceLearningResultMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const learningApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครเรียน' })
        const annouceLearningApplicationMenu = this.page.getByRole('link', { name: 'ตรวจสอบและประกาศผลการคัดเลือก', exact: true })
        await applicationWork.click()
        await basicInfoButton.click()
        await learningApplicationListItem.click()
        await annouceLearningApplicationMenu.click()
    }

}