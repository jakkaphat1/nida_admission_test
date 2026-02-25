import { Page, Locator , expect } from '@playwright/test'; 

export class MajorSubjectPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    usernameBox
    passwordBox

    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor (page:Page){
        this.page = page;
        this.usernameBox = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' })
        this.passwordBox = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' })
        
    }




    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }


    async fillUsernameAndPassword(username:string , password:string){
        await expect(this.usernameBox).toBeVisible()
        await this.usernameBox.pressSequentially(username ,{ delay : 100 })

        await expect(this.passwordBox).toBeVisible()
        await this.passwordBox.pressSequentially(password ,{ delay : 100 })
    }

    async gotoMajorSubjectMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        const majorSubeject = this.page.getByRole('link', { name: 'ข้อมูลวิชาเอก' })
        await applicationWork.click()
        await basicInfoButton.click()
        await majorSubeject.click()
    }

    async fillSearchAndFilterBox(subjectName:string , status:string ,faculty?:string ){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหารหัสหรือชื่อวิชาเอก' })
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const filterButton = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const selectFacultyDropdown = this.page.locator('div').filter({ hasText: /^เลือกคณะ$/ }).nth(4)

        await searchBox.pressSequentially(subjectName)
        
        if(status){
            const statusOption = this.page.getByRole('option', { name: status, exact: true })
            await statusDropdown.click()
            await statusOption.click()
        }

        if(faculty){
            const facultyOption = this.page.getByRole('option', { name: faculty })
            await filterButton.click() 
            await selectFacultyDropdown.click()
            await facultyOption.click()
        }

    }
}