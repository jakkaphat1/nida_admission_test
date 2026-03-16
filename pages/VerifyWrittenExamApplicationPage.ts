import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class VerifyWrittenExamApplicationPage {
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

    async checkVerifyWrittenExamMenu(){
        await expect(this.applynedBtn).toBeVisible();
        await expect(this.draftApplicationBtn).toBeVisible()
    }

    async clickApplicationFormTab(){
        await this.applynedBtn.click()
    }

    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ระบุรหัสใบสมัครสอบ, เลขที่บัตรประชาชน, เลขที่หนังสือเดินทาง หรือชื่อ-นามสกุล' })
        await searchBox.pressSequentially(searchKeyword)
    }

    // filter อื่น ๆ
    async filterMoreOption(data:{
        subject?:string
        round?:string
        eduYear?:string
        semester?:string
        eduLevel?:string
        status?:string
        payStatus?:string
        applicationStatus?:string
    }){
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backfilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()

        if(data.subject){
            const subjectDropdown = this.page.locator('div').filter({ hasText: /^วิชาที่สมัคร$/ }).nth(3)
            const subjectOption = this.page.getByRole('option', { name: data.subject })
            await subjectDropdown.click()
            await subjectOption.click()
        }

        if(data.round){
            const roundInputBox = this.page.getByRole('textbox', { name: 'รอบที่' })
            await roundInputBox.pressSequentially(data.round)
        }

        if(data.eduYear){
            const eduYearDropdown = this.page.locator('div').filter({ hasText: /^ปีที่สมัคร$/ }).nth(3)
            const eduYearOption = this.page.getByRole('option', { name: data.eduYear })
            await eduYearDropdown.click()
            await eduYearOption.click()
        }

        if(data.semester){
            const semesterDropdown = this.page.locator('div').filter({ hasText: /^ภาคที่สมัคร$/ }).nth(3)
            const semesterOption = this.page.getByRole('option', { name: data.semester })
            await semesterDropdown.click()
            await semesterOption.click()
        }

        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('div').filter({ hasText: /^ระดับการศึกษา$/ }).nth(3)
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }

        if(data.status){
            const statusTypeDropdown = this.page.locator('div').filter({ hasText: /^สถานะตรวจสอบข้อมูลผู้สมัคร$/ }).nth(3)
            const statusTypeOption = this.page.getByRole('option', { name: data.status ,exact:true }).first()
            await statusTypeDropdown.click()
            await statusTypeOption.click()
        }
        
        if(data.payStatus){
            const payStatusDropdown = this.page.locator('div').filter({ hasText: /^สถานะการชำระเงิน$/ }).nth(3)
            const payStatusOption = this.page.getByRole('option', { name: data.payStatus })
            await payStatusDropdown.click()
            await payStatusOption.click()
        }

        if(data.applicationStatus){
            const applicationStatusDropdown = this.page.locator('#search-select-statusForm > .unext-form-control > .react-select__indicators')
            const applicationStatusOption = this.page.getByRole('option', { name: data.applicationStatus })
            await applicationStatusDropdown.click()
            await applicationStatusOption.click()
        }

        
        await backfilterBtn.click()
    }

    async clickStatusByKeyword(status:string){
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const statusOption = this.page.getByRole('option', { name: status, exact: true })
        await statusDropdown.click()
        await statusOption.click()
    }

    async clickResetAllFilter(){
        const resetFilterBtn = this.page.getByRole('button', { name: 'ล้างข้อมูลทั้งหมด' })
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backfilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()
        await resetFilterBtn.click()
        await backfilterBtn.click()
    }
}