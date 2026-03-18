import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class EligibleLearningPage {
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
    async gotoEligibleLearningMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const learningApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครเรียน' })
        const eligibleLearningApplicationMenu = this.page.getByRole('link', { name: 'ข้อมูลรายชื่อผู้มีสิทธิ์สอบประจำโครงการ', exact: true })
        await applicationWork.click()
        await basicInfoButton.click()
        await learningApplicationListItem.click()
        await eligibleLearningApplicationMenu.click()
    }

    async checkLearningEligibleMenu(){
        const notAnnouce = this.page.getByRole('button', { name: 'ยังไม่ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' })
        const annouced = this.page.getByRole('button', { name: 'ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' }).nth(1)
        await expect(notAnnouce).toBeVisible();
        await expect(annouced).toBeVisible()
    }

    //method ค้นหาในกล่องค้นหา
    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อหลักสูตรและโครงการ' })
        await searchBox.pressSequentially(searchKeyword)
    }

    async filterMoreOption(data:{
        eduYear?:string
        semester?:string
        eduLevel?:string
        studentType?:string
        round?:string

    }){
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backfilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()
        if(data.eduYear){
            const eduYearDropdown = this.page.locator('div').filter({ hasText: /^เลือกปีการศึกษา$/ }).nth(3)
            const eduYearOption = this.page.getByRole('option', { name: data.eduYear })
            await eduYearDropdown.click()
            await eduYearOption.click()
        }
        if(data.semester){
            const semesterDropdown = this.page.locator('div').filter({ hasText: /^เลือกภาคการศึกษา$/ }).nth(3)
            const semesterOption = this.page.getByRole('option', { name: data.semester })
            await semesterDropdown.click()
            await semesterOption.click()
        }
        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ }).nth(3)
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }
        if(data.studentType){
            const studentTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
            const studentTypeOption = this.page.getByRole('option', { name: data.studentType })
            await studentTypeDropdown.click()
            await studentTypeOption.click()
        }
        if(data.round){
            const roundDropdown = this.page.locator('div').filter({ hasText: /^เลือกรอบที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }
        await backfilterBtn.click()
    }

    async clickExpandDetailButtonByName(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const expandDetailBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await expandDetailBtn.click()
    }

    async clickStatusByKeyword(status:string){
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const statusOption = this.page.getByRole('option', { name: status, exact: true })
        await statusDropdown.click()
        await statusOption.click()
    }

}