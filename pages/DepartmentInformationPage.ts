import {Page , expect} from '@playwright/test'

export class DepartmentInformationPage {
    page:Page;

    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    usernameBox
    passwordBox





 /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page){
        this.page = page;
        this.usernameBox = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' })
        this.passwordBox = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' })
    }




    /**
 * Method SECTION
 * ---------------------------------------------------------------- */ 

    async fillUsernameAndPassword(username:string , password:string){
        await expect(this.usernameBox).toBeVisible()
        await this.usernameBox.pressSequentially(username ,{ delay : 100 })

        await expect(this.passwordBox).toBeVisible()
        await this.passwordBox.pressSequentially(password ,{ delay : 100 })
    }

    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }

    async gotoSubjectFieldMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        const subjectField = this.page.getByRole('link', { name: 'ข้อมูลสาขาวิชา' }).nth(1)
        await applicationWork.click()
        await basicInfoButton.click()
        await subjectField.click()
    }

    async fillSearchAndFilterBox(data:{
        searchRole?:string,
        status?:'ใช้งาน' | 'ไม่ใช้งาน',
        facultyName?:string,
    }){

        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหารหัสหรือชื่อสาขาวิชา' })
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const filterButton = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const facultyNameDropdown = this.page.locator('.react-select__input-container')
        

        if(data.searchRole){
            await searchBox.pressSequentially(data.searchRole , {delay:100})
        }

        if(data.status){
            const statusOption = this.page.getByRole('option', { name: data.status, exact: true })
            await statusDropdown.click()
            await statusOption.click()
            await expect(this.page.getByText(data.status, { exact: true })).toBeVisible();
        }

        if(data.facultyName){
            await filterButton.click()
            await facultyNameDropdown.click()

            const facultyNameOption = this.page.getByRole('option' , {name: data.facultyName})
            await facultyNameOption.click()
        }
    }
}