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

    async clickAddMajorSubjectButton(){
        const AddMajorSubjectButton = this.page.getByRole('button', { name: 'เพิ่มวิชาเอก' })
        await AddMajorSubjectButton.click()
    }

    async checkAddMajorSubjectPage(){
        const locators = {
            majorSubjectID : this.page.getByRole('textbox', { name: 'รหัสวิชาเอก* รหัสวิชาเอก' }),
            status : this.page.locator('span').nth(4),
            selectFacultyDropdown : this.page.locator('div').filter({ hasText: /^เลือกคณะ$/ }).nth(3),
            majorSubjectTH : this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาไทย)*' }),
            majorSubjectEN : this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาอังกฤษ)' }),
            majorSubjectCN : this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาจีน)' })
        };   

        for (const [name, locator] of Object.entries(locators)) {
            await expect(locator, `พบ Element: ${name}`).toBeVisible({ timeout: 5000 });
        }
    }

    async fillAddMajorSubjectPage(data: {
        id?: string, 
        status?: string, 
        faculty?: string, 
        subjectTH?: string, 
        subjectEN?: string, 
        subjectCN?: string
    }){
        const majorSubjectID = this.page.getByRole('textbox', { name: 'รหัสวิชาเอก* รหัสวิชาเอก' })
        const statusContainer = this.page.locator('div').filter({ hasText: /^สถานะ :$/ }).first();
        const statusButton = this.page.locator('label').filter({ hasText: 'สถานะ' })
        .locator('xpath=./parent::div/following-sibling::div//button[@role="switch"] | ./ancestor::div[contains(@class,"form-item")]//button[@role="switch"] | //span[contains(@class,"ant-switch")]')
        .first();
        const selectFacultyDropdown = this.page.locator('.react-select__input-container')
        const majorSubjectTH = this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาไทย)*' })
        const majorSubjectEN = this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาอังกฤษ)' })
        const majorSubjectCN = this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาจีน)' })

        if(data.id){
            await majorSubjectID.pressSequentially(data.id)
        }

        if (data.status) {
            const currentStateText = await statusContainer.innerText();
            if (!currentStateText.includes(data.status)) {
                await statusButton.click();
                await expect(statusContainer).toContainText(data.status);
            }
        }

        if(data.faculty){
            const facultyOption = this.page.getByRole('option', { name: data.faculty })
            await selectFacultyDropdown.click()
            await facultyOption.click()
        }

        if(data.subjectTH){
            await majorSubjectTH.fill(data.subjectTH)
        }
        if(data.subjectEN){
            await majorSubjectEN.fill(data.subjectEN)
        }
        if(data.subjectCN){
            await majorSubjectCN.fill(data.subjectCN)
        }
    }

    async clickSaveButton(){
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        await saveBtn.click()
    }

    async clickEditMajorSubjectCardByName(subjectID:string){
        const card = this.page.locator('div').filter({ hasText: subjectID }).first()
        const editButton = card.getByRole('button').nth(4)
        await editButton.click()
    }

    async fillEditMajorSubjectPage(data:{
        faculty?: string, 
        subjectTH?: string, 
        subjectEN?: string, 
        subjectCN?: string
    }){
        const selectFacultyDropdown = this.page.locator('.react-select__input-container')
        const majorSubjectTH = this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาไทย)*' })
        const majorSubjectEN = this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาอังกฤษ)' })
        const majorSubjectCN = this.page.getByRole('textbox', { name: 'ชื่อวิชาเอก (ภาษาจีน)' })

        if(data.faculty){
            const facultyOption = this.page.getByRole('option', { name: data.faculty })
            await selectFacultyDropdown.click()
            await facultyOption.click()
        }

        if(data.subjectTH){
            await majorSubjectTH.fill(data.subjectTH)
        }
        if(data.subjectEN){
            await majorSubjectEN.fill(data.subjectEN)
        }
        if(data.subjectCN){
            await majorSubjectCN.fill(data.subjectCN)
        }
    }
}