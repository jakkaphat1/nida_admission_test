import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class AnnouceWriitenExamScorePage {
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
    async gotoVerifyWrittenExamMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const writtenApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครสอบวิชาเฉพาะ' })
        const verifyWrittenExamMenu = this.page.getByRole('link', { name: 'ตรวจสอบใบสมัครสอบข้อเขียน' })
        await applicationWork.click()
        await basicInfoButton.click()
        await writtenApplicationListItem.click()
        await verifyWrittenExamMenu.click()
    }

    
}