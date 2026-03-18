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
        const verifyLearningApplicationMenu = this.page.getByRole('link', { name: 'ตรวจสอบใบสมัคร', exact: true })
        await applicationWork.click()
        await basicInfoButton.click()
        await learningApplicationListItem.click()
        await verifyLearningApplicationMenu.click()
    }

    async checkVerifyLearningApplicationMenu(){
        const draftApplicationTab = this.page.getByRole('button', { name: 'ฉบับร่าง' })
        const applicationTab = this.page.getByRole('button', { name: 'ใบสมัคร', exact: true })
        const confirmRegisTab = this.page.getByRole('button', { name: 'ยืนยันสิทธิ์' })
        await expect(draftApplicationTab).toBeVisible();
        await expect(applicationTab).toBeVisible()
        await expect(confirmRegisTab).toBeVisible()
    }

    async clickAnyTabByKeyword(tab:string){
        const tabBtn = this.page.getByRole('button', { name: tab })
        await tabBtn.click()
    }
    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ระบุรหัสใบสมัครเรียน, เลขที่บัตรประชาชน, เลขที่หนังสือเดินทาง หรือชื่อ-นามสกุล' })
        await searchBox.pressSequentially(searchKeyword)
    }

    // filter อื่น ๆ
    async filterMoreOption(data:{
        eduYear?:string
        semester?:string
        round?:string
        faculty?:string
        eduLevel?:string
        course?:string
        program?:string
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
            const roundInputBox = this.page.locator('div').filter({ hasText: /^รอบที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round })
            await roundInputBox.click()
            await roundOption.click()
        }
        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('div').filter({ hasText: /^ระดับการศึกษา$/ }).nth(3)
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }
        if(data.faculty){
            const facultyInputBox = this.page.locator('div').filter({ hasText: /^คณะ$/ }).nth(3)
            const facultyOption = this.page.getByRole('option', { name: data.faculty })
            await facultyInputBox.click()
            await facultyOption.click()
        }
        if(data.course){
            const courseDropdown = this.page.locator('div').filter({ hasText: /^หลักสูตร$/ }).nth(3)
            const courseOption = this.page.getByRole('option', { name: data.course })
            await courseDropdown.click()
            await courseOption.click()
        }
        if(data.program){
            const programDropdown = this.page.locator('div').filter({ hasText: /^โครงการ$/ }).nth(3)
            const programOption = this.page.getByRole('option', { name: data.program ,exact:true }).first()
            await programDropdown.click()
            await programOption.click()
        }
        
        if(data.status){
            const statusDropdown = this.page.locator('div').filter({ hasText: /^สถานะการสมัคร$/ }).nth(3)
            const statusOption = this.page.getByRole('option', { name: data.status })
            await statusDropdown.click()
            await statusOption.click()
        }


        
        await backfilterBtn.click()
    }
}