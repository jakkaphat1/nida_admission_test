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
}