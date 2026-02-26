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
        searchInput?:string,
        status?:'ใช้งาน' | 'ไม่ใช้งาน',
        facultyName?:string,
    }){

        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหารหัสหรือชื่อสาขาวิชา' })
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const filterButton = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const facultyNameDropdown = this.page.locator('.react-select__input-container')
        

        if(data.searchInput){
            await searchBox.pressSequentially(data.searchInput , {delay:100})
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


    async clickAddSubjectButton(){
        const AddSubjectButton = this.page.getByRole('button', { name: 'เพิ่มสาขาวิชา' })
        await AddSubjectButton.click()
    }



    async fillAddSubjectPage(data: {
        id?: string, 
        status?:'ใช้งาน' | 'ไม่ใช้งาน',
        faculty?: string, 
        subjectTH?: string, 
        subjectEN?: string, 
        subjectCN?: string,
        majorSubjectStatus?:string,
        majorSubject?:string,

    }){
        const subjectID = this.page.getByRole('textbox', { name: 'รหัสสาขาวิชา*' })
        const statusContainer = this.page.locator('span.label')
        const statusButton = this.page.locator('label').filter({ hasText: 'สถานะ' })
        .locator('xpath=./parent::div/following-sibling::div//button[@role="switch"] | ./ancestor::div[contains(@class,"form-item")]//button[@role="switch"] | //span[contains(@class,"ant-switch")]')
        .first();
        const selectFacultyDropdown = this.page.locator('.react-select__input-container')
        const majorSubjectTH = this.page.getByRole('textbox', { name: 'ชื่อสาขาวิชา (ภาษาไทย)*' })
        const majorSubjectEN = this.page.getByRole('textbox', { name: 'ชื่อสาขาวิชา (ภาษาอังกฤษ)' })
        const majorSubjectCN = this.page.getByRole('textbox', { name: 'ชื่อสาขาวิชา (ภาษาจีน)' })

        if(data.id){
            await subjectID.pressSequentially(data.id)
        }

        if (data.status) {
            const currentText = await statusContainer.textContent()
            if (!currentText?.includes(data.status)) {
                await statusContainer.click()
            }
            await expect(statusContainer).toContainText(data.status)
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

        if(data.majorSubjectStatus){
            const majorsubject = this.page.getByText('มี', { exact: true })
            await majorsubject.click()
            if(data.majorSubjectStatus == 'มี' && data.majorSubject){
                const expandDropdown = this.page.locator('#major_subject_code > .unext-form-control > .react-select__indicators')
                const majorsubjectOption = this.page.getByRole('option', { name: data.majorSubject })
                await expandDropdown.click()
                await majorsubjectOption.click()
            }
        }
    }


    async clickSaveButton(){
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        await saveBtn.click()
    }

    async clickEditSubjectCardByName(subjectID:string){
        const card = this.page.locator('div').filter({ hasText: subjectID }).nth(1)
        const editButton = card.getByRole('button').nth(4)
        await editButton.click()
    }

    async fillEditMajorSubjectPage(data:{
        faculty?: string, 
        subjectTH?: string, 
        subjectEN?: string, 
        subjectCN?: string,
        majorSubjectStatus?:string,
        majorSubject?:string,
    }){
        const selectFacultyDropdown = this.page.locator('.react-select__input-container')
        const majorSubjectTH = this.page.getByRole('textbox', { name: 'ชื่อสาขาวิชา (ภาษาไทย)*' })
        const majorSubjectEN = this.page.getByRole('textbox', { name: 'ชื่อสาขาวิชา (ภาษาอังกฤษ)' })
        const majorSubjectCN = this.page.getByRole('textbox', { name: 'ชื่อสาขาวิชา (ภาษาจีน)' })

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

        if(data.majorSubjectStatus){
                const majorsubject = this.page.getByText('มี', { exact: true })
                await majorsubject.click()
                if(data.majorSubjectStatus == 'มี' && data.majorSubject){
                    const expandDropdown = this.page.locator('#major_subject_code > .unext-form-control > .react-select__indicators')
                    const majorsubjectOption = this.page.getByRole('option', { name: data.majorSubject })
                    await expandDropdown.click()
                    await majorsubjectOption.click()
            }
        }
    }
}