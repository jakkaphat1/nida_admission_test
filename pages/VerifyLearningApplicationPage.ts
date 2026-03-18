import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class VerifyLearningApplicationPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    applynedBtn
    draftApplicationBtn
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
        this.applynedBtn = this.page.getByRole('button', { name: 'ใบสมัคร', exact: true })
        this.draftApplicationBtn = this.page.getByRole('button', { name: 'ฉบับร่าง' })
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoVerifyLearningApplicationMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const learningApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครเรียน' })
        const verifyLearningApplicationMenu = this.page.getByRole('link', { name: 'ตรวจสอบใบสมัคร' })
        await applicationWork.click()
        await basicInfoButton.click()
        await learningApplicationListItem.click()
        await verifyLearningApplicationMenu.click()
    }

    
}