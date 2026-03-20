import { Page, Locator , expect } from '@playwright/test'; 

export class MyAnnoucement {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    myAnnoucement 
    applicationTab
    examinationTab
    seeAnnoucement
    confirmStudying
    writtenExaminationAnnouce

    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor (page:Page){
        this.page = page;
        this.myAnnoucement = this.page.getByRole('link', { name: 'ประกาศผลของฉัน' })
        this.applicationTab = this.page.getByRole('tab', { name: 'สมัครเรียน' })
        this.examinationTab = this.page.getByRole('tab', { name: 'สมัครสอบข้อเขียน' })
        this.seeAnnoucement = this.page.getByRole('button', { name: 'ดูประกาศ' }).first()
        this.confirmStudying = this.page.getByRole('button', { name: 'ยืนยันสิทธิ์เข้าศึกษา' }).first()
        this.writtenExaminationAnnouce = this.page.getByRole('tab', { name: 'สมัครสอบข้อเขียน' })
    }




    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async clickMyAnnoucement(){
        await this.myAnnoucement.click()
    }

    async clickWrittenExamTab(){
        await this.writtenExaminationAnnouce.click()
    }

    async checkMyAnnouce(){
        await expect(this.applicationTab).toBeVisible()
        await expect(this.examinationTab).toBeVisible()
    }

    async checkAnnouceCard(ApplicationNumber:string,ApplicationType : string ,courseName:string , result:string ){
        const card = this.page.locator('div').filter({ hasText: ApplicationNumber }).first();
        const applicationType = card.getByText(ApplicationType).first()
        const course = card.getByText(courseName).first()
        const applicationResult = card.getByText(result).first()
        const seeAnnoucement = card.getByRole('button', { name: 'ดูประกาศ' }).first()
        const confirmStudying = card.getByRole('button', { name: 'ยืนยันสิทธิ์เข้าศึกษา' }).first()

        await expect(card).toBeVisible()
        await expect(applicationType).toBeVisible()
        await expect(course).toBeVisible()
        await expect(applicationResult).toBeVisible()
        await expect(seeAnnoucement).toBeVisible()
        await expect(confirmStudying).toBeVisible()
    }

    async checkWritenExamAnnouceCard(ApplicationNumber: string, ApplicationType: string, courseName: string, result: string ,annoucement?:boolean) {
        const card = this.page.locator('.relative.overflow-hidden.rounded-xl').filter({ 
            hasText: ApplicationNumber 
        }).first();

        const applicationType = card.getByText(ApplicationType).first();
        const course = card.getByText(courseName).first();
        const applicationResult = card.getByText(result).first();
        const scoreLabel = card.getByText('คะแนนที่ได้');
        const seeAnnoucement = card.getByRole('button', { name: 'ดูประกาศ' })

        await expect(card).toBeVisible();
        await expect(applicationType).toBeVisible();
        await expect(course).toBeVisible();
        await expect(applicationResult).toBeVisible();

        if(annoucement){
            await expect(seeAnnoucement).toBeVisible();
        }
    }

    async checkWritenExamAnnouceDetail(ApplicationNumber: string,examDate:string,examExpiredDate:string){
        const card = this.page.locator('.relative.overflow-hidden.rounded-xl').filter({ 
            hasText: ApplicationNumber 
        }).first();

        const examday = card.getByText(examDate).first()
        const expiredDate = card.getByText(examExpiredDate)

        await expect(card).toBeVisible();
        await expect(examday).toBeVisible();
        await expect(expiredDate).toBeVisible();
    }

    async clickSeeAnnoucementByCard(ApplicationNumber:string){
        const card = this.page.locator('div').filter({ hasText: ApplicationNumber }).first();
        const seeAnnoucement = card.getByRole('button', { name: 'ดูประกาศ' }).first()
        const pagePromise = this.page.context().waitForEvent('page');
        await seeAnnoucement.click()

        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        await newPage.close();
        await this.page.waitForTimeout(2000)
    }

    async clickConfirmEnrollmentByCard(ApplicationNumber:string){
        const card = this.page.locator('div').filter({ hasText: ApplicationNumber }).first();
        const confirmEnrollment = card.getByRole('button', { name: 'ยืนยันสิทธิ์เข้าศึกษา' }).first()
        await confirmEnrollment.click()
    }

}