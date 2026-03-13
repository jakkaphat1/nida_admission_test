import { Page, Locator , expect } from '@playwright/test'; 

export class SubjectWrittenExamPage {
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
    async gotoSubjectWrittenExamMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const subjectWritten = this.page.getByRole('link', { name: 'วิชาที่เปิดสอบข้อเขียน' })
        await applicationWork.click()
        await basicInfoButton.click()
        await subjectWritten.click()
    }

    async checkSubjectWrittenExamMenu(){
        const notOpen = this.page.getByRole('button', { name: 'ยังไม่ประกาศเปิดรับสมัคร' })
        const opened = this.page.getByRole('button', { name: 'ประกาศเปิดรับสมัครแล้ว' })
        await expect(notOpen).toBeVisible()
        await expect(opened).toBeVisible()
    }

    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อวิชา' })
        await searchBox.pressSequentially(searchKeyword)
    }

    async clickStatusByKeyword(status:string){
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const statusOption = this.page.getByRole('option', { name: status, exact: true })
        await statusDropdown.click()
        await statusOption.click()
    }

    async filterMoreOption(data:{
        eduYear?:string
        semester?:string
        round?:string
        eduLevel?:string
        studentType?:string
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

        if(data.round){
            const roundDropdown = this.page.locator('div').filter({ hasText: /^ครั้งที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
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

        if(data.status){
            const statusTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกสถานะทั้งหมด$/ }).nth(3)
            const statusTypeOption = this.page.getByRole('option', { name: data.status ,exact:true }).first()
            await statusTypeDropdown.click()
            await statusTypeOption.click()
        }
        await backfilterBtn.click()
    }
}