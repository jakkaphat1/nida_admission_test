import { Page, Locator , expect } from '@playwright/test'; 

export class ExamAnnoucePage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    examAnnouce
    applicationTab
    examinationTab




    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor (page:Page){
        this.page = page;
        this.examAnnouce = this.page.getByRole('link', { name: 'สถานะสิทธิ์การสอบ' })
        this.applicationTab = this.page.getByRole('tab', { name: 'สมัครเรียน' })
        this.examinationTab = this.page.getByRole('tab', { name: 'สมัครสอบข้อเขียน' })
    }




    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async clickExamAnnouce(){
        await this.examAnnouce.click()
    }

    async checkExamAnnouce(){
        await expect(this.applicationTab).toBeVisible()
        await expect(this.examinationTab).toBeVisible()
    }

    async clickExamAnnouceTab(){
        await this.examinationTab.click()
    }

    async checkAnnouceCard(ApplicationNumber:string,ApplicationType : string ,courseName:string , result:string ){
        const card = this.page.locator('div').filter({ hasText: ApplicationNumber }).first();
        const applicationType = card.getByText(ApplicationType).first()
        const course = card.getByText(courseName).first()
        const applicationResult = card.getByText(result).first()

        await expect(card).toBeVisible()
        await expect(applicationType).toBeVisible()
        await expect(course).toBeVisible()
        await expect(applicationResult).toBeVisible()

    }

    async checkAnnouceExpandDetail(ApplicationNumber:string,location:string,date:string,seat:string){
        const card = this.page.locator('div').filter({ hasText: ApplicationNumber }).first();
        // const expandIcon = card.locator(`.rotate-${degree}`);
        const station = card.getByText(location)
        const day = card.getByText(date)
        const seatNumber = card.getByText(seat).nth(4)
        await expect(station).toBeVisible()
        await expect(day).toBeVisible()
        await expect(seatNumber).toBeVisible()

    }

}