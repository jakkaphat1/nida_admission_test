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

    //method ค้นหาในกล่องค้นหา
    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อวิชา' })
        await searchBox.pressSequentially(searchKeyword)
    }

    // filter อื่น ๆ
    async filterMoreOption(data:{
        eduYear?:string
        semester?:string
        eduLevel?:string
        studentType?:string
        round?:string
        status?:string
    }){
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backfilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()
        if(data.eduYear){
            const eduYearDropdown = this.page.locator('div').filter({ hasText: /^ปีการศึกษา$/ }).nth(3)
            const eduYearOption = this.page.getByRole('option', { name: data.eduYear })
            await eduYearDropdown.click()
            await eduYearOption.click()
        }
        if(data.semester){
            const semesterDropdown = this.page.locator('div').filter({ hasText: /^ภาคการศึกษา$/ }).nth(3)
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
        if(data.studentType){
            const studentTypeDropdown = this.page.locator('div').filter({ hasText: /^ประเภทนักศึกษา$/ }).nth(3)
            const studentTypeOption = this.page.getByRole('option', { name: data.studentType })
            await studentTypeDropdown.click()
            await studentTypeOption.click()
        }
        if(data.round){
            const roundDropdown = this.page.locator('div').filter({ hasText: /^ครั้งที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }
        if(data.status){
            const statusTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกสถานะทั้งหมด$/ }).nth(3)
            const statusTypeOption = this.page.getByRole('option', { name: data.status ,exact:true }).first()
            await statusTypeDropdown.click()
            await statusTypeOption.click()
        }
        await backfilterBtn.click()
    }

    async clickExpandDetailButtonByName(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const expandDetailBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await expandDetailBtn.click()
    }

    async clickVerifyDetailButtonByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const verifyDetailBtn = card.getByRole('button', { name: 'ตรวจสอบข้อมูล' })
        await verifyDetailBtn.click()
    }

    async checkEligibleStudentDetailPage(...texts: string[]){
        const eligibleStudentTextBox = this.page.getByRole('textbox', { name: 'ค้นหาใบสมัคร, ชื่อ-นามสกุล' })
        await expect(eligibleStudentTextBox).toBeVisible()

        for (const text of texts) {
            const element = this.page.getByText(text)
            await element.highlight()
            await expect(element).toBeVisible()
        }
    }

    async fillSearchEligibleWrittenExamStudent(studentName:string){
        const texBox = this.page.getByRole('textbox', { name: 'ค้นหาใบสมัคร, ชื่อ-นามสกุล' })
        await texBox.pressSequentially(studentName)
    }

    async clickExpandDetailButtonBySubject(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const expandDetailBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await expandDetailBtn.click()
    }

    async filterEligibleSearchOption(subject?:string , annouce?:string){
        const subjectDropdown = this.page.locator('.react-select__indicators').first()
        const subjectOption = this.page.getByRole('option', { name: subject })
        const annouceDropdown = this.page.locator('#search-select-announceStatus > .unext-form-control > .react-select__indicators')
        const annouceOption = this.page.getByRole('option', { name: annouce })
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const filterBackBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()
        if(subject){
            await subjectDropdown.click()
            await subjectOption.click()
        }
        if(annouce){
            await annouceDropdown.click()
            await annouceOption.click()
        }
        await filterBackBtn.click()
    }

    async clickCheckboxBySubject(subjectName:string){
        const card = this.page.locator('.input-and-title').filter({hasText:subjectName})
        const checkbox = card.locator('#appication_form')
        await checkbox.click()
    }

    async clickExportButton(){
        const exportBtn = this.page.getByRole('button', { name: 'EXPORT' })
        await exportBtn.click()
    }

    async handleExportType(type:string){
        const heading = this.page.getByRole('heading', { name: 'ประเภทไฟล์การนำออกข้อมูล' })
        const typeRadio = this.page.getByRole('radio', { name: type })
        const confirm = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(heading).toBeVisible()
        await expect(typeRadio).toBeVisible()
        await typeRadio.click()
        await confirm.click()
    }




















    
}