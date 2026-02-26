import { Page, Locator , expect } from '@playwright/test'; 

export class EducationCenterInformationPage{
    page : Page;

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

    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }

    async fillUsernameAndPassword(username:string , password:string){
        await expect(this.usernameBox).toBeVisible()
        await this.usernameBox.pressSequentially(username ,{ delay : 100 })

        await expect(this.passwordBox).toBeVisible()
        await this.passwordBox.pressSequentially(password ,{ delay : 100 })
    }

    async gotoEducationCenterMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        const educationCenterButton = this.page.getByRole('link', { name: 'ข้อมูลศูนย์การศึกษา' })
        await applicationWork.click()
        await basicInfoButton.click()
        await educationCenterButton.click()
    }

    async fillSearchAndFilterBox(data:{
        searchInput?:string,
        status?:'ใช้งาน' | 'ไม่ใช้งาน',
        provinceName?:string,
        facultyName?:string,
    }){

        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหารหัสหรือชื่อศูนย์การศึกษา' })
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const filterButton = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const provinceDropdown = this.page.locator('div').filter({ hasText: /^เลือกจังหวัด$/ }).nth(3)
        const facultyNameDropdown = this.page.locator('div').filter({ hasText: /^เลือกคณะ$/ }).nth(3)
        

        if(data.searchInput){
            await searchBox.pressSequentially(data.searchInput , {delay:100})
        }

        if(data.status){
            const statusOption = this.page.getByRole('option', { name: data.status, exact: true })
            await statusDropdown.click()
            await statusOption.click()
            await expect(this.page.getByText(data.status, { exact: true })).toBeVisible();
        }

        if(data.provinceName){
            const provinceOption = this.page.getByRole('option', { name: data.provinceName })
            await filterButton.click()
            await provinceDropdown.click()
            await provinceOption.click()

        }

        if(data.facultyName){
            await facultyNameDropdown.click()
            const facultyNameOption = this.page.getByRole('option' , {name: data.facultyName})
            await facultyNameOption.click()
        }
    }

}