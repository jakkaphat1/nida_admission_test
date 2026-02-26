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

    async clickAddEducationCentralButton(){
        const addButton = this.page.getByRole('button', { name: 'เพิ่มข้อมูลศูนย์การศึกษา' })
        await addButton.click()
    }

    async fillAddCentralEduInfoPage(data:{
        centralEduID? : string,
        centralEduNameTH? : string,
        centralEduNameEN? : string,
        centralEduNameCN? : string,
        facultyName? : string
        
    }){
        if(data.centralEduID){
            const centralEduIDBox = this.page.getByRole('textbox', { name: 'รหัสศูนย์การศึกษา*' })
            await centralEduIDBox.fill(data.centralEduID)
        }

        if(data.centralEduNameTH){
            const centralEduNameTHBox = this.page.getByRole('textbox', { name: 'ชื่อศูนย์การศึกษา (ภาษาไทย)*' })
            await centralEduNameTHBox.fill(data.centralEduNameTH)
        }

        if(data.centralEduNameEN){
            const centralEduNameENBox = this.page.getByRole('textbox', { name: 'ชื่อศูนย์การศึกษา (ภาษาอังกฤษ)' })
            await centralEduNameENBox.fill(data.centralEduNameEN)
        }

        if(data.centralEduNameCN){
            const centralEduNameCNBox = this.page.getByRole('textbox', { name: 'ชื่อศูนย์การศึกษา (ภาษาจีน)' })
            await centralEduNameCNBox.fill(data.centralEduNameCN)
        }

        if(data.facultyName){
            const facultyDropdown = this.page.locator('.react-select__input-container').first()
            const facultyOption = this.page.getByRole('option' , { name : data.facultyName})
            await facultyDropdown.click()
            await facultyOption.click()
            await facultyDropdown.click()
        }
    }

    async fillAddFacultyAddressInfo(data:{
        centralEduAddress? : string,
        centralEduProvince? : string,
        centralEduDistrict? : string,
        centralEduSubDistrict? : string,
        centralEduZipCode? : string,
        centralEduLatitude? : string,
        centralEduLongitude? : string,
    }){
        if(data.centralEduAddress){
            const address = this.page.getByRole('textbox', { name: 'ที่อยู่' })
            await address.fill(data.centralEduAddress)
        }
        if(data.centralEduProvince){
            const provinceDropdown = this.page.locator('#province_code > .unext-form-control > .react-select__indicators')
            const provinceOption = this.page.getByRole('option', { name: data.centralEduProvince })
            await provinceDropdown.click()
            await provinceOption.click()
        }
        if(data.centralEduDistrict){
            const districtDropdown = this.page.locator('#district_code > .unext-form-control > .react-select__value-container > .react-select__input-container')
            const districtOption = this.page.getByRole('option', { name: data.centralEduDistrict })
            await districtDropdown.click()
            await districtOption.click()
        }
        if(data.centralEduSubDistrict){
            const centralEduSubDistrictDropdown = this.page.locator('#subdistrict_code > .unext-form-control > .react-select__indicators')
            const camputSubDistrictOption = this.page.getByRole('option', { name: data.centralEduSubDistrict })
            await centralEduSubDistrictDropdown.click()
            await camputSubDistrictOption.click()
        }
        if(data.centralEduZipCode){
            const zipcodeDropdown = this.page.locator('#zipcode > .unext-form-control > .react-select__indicators')
            const zipcodeOption = this.page.getByRole('option', { name: data.centralEduZipCode })
            await zipcodeDropdown.click()
            await zipcodeOption.click()
        }
        if(data.centralEduLatitude){
            const latitudeBox = this.page.getByRole('textbox', { name: 'Latitude' })
            await latitudeBox.fill(data.centralEduLatitude)
        }
        if(data.centralEduLongitude){
            const longitudeBox = this.page.getByRole('textbox', { name: 'Longitude' })
            await longitudeBox.fill(data.centralEduLongitude)
        }
    }

    async fillAddFacultyContactInfo(data:{
        centralEduTel? : string,
        centralEduLineID? : string,
        centralEduFacebook? : string,
        centralEduEmail? : string,
        centralEduWebsite? : string,
        centralEduFirstOfficerName? : string,
        centralEduFirstOfficerTel? : string,
        centralEduSecondOfficerName? : string,
        centralEduSecondOfficerTel? : string,
    }){
        if(data.centralEduTel){
            const telphoneBox = this.page.getByRole('textbox', { name: 'เบอร์โทรสำนักงาน' })
            await telphoneBox.fill(data.centralEduTel)
        }
        if(data.centralEduLineID){
            const lineIDBox = this.page.getByRole('textbox', { name: 'line ID' })
            await lineIDBox.fill(data.centralEduLineID)
        }
        if(data.centralEduFacebook){
            const faceboolBox = this.page.getByRole('textbox', { name: 'Facebook' })
            await faceboolBox.fill(data.centralEduFacebook)
        }
        if(data.centralEduEmail){
            const inputBox = this.page.getByRole('textbox', { name: 'Email' })
            await inputBox.fill(data.centralEduEmail)
        }
        if(data.centralEduWebsite){
            const inputBox = this.page.getByRole('textbox', { name: 'Website' })
            await inputBox.fill(data.centralEduWebsite)
        }
        if(data.centralEduFirstOfficerName && data.centralEduFirstOfficerTel ){
            const inputNameBox = this.page.locator('[id="officers[0].contact_name"]')
            const inputTelBox = this.page.locator('[id="officers[0].contact_tel"]')
            await inputNameBox.fill(data.centralEduFirstOfficerName)
            await inputTelBox.fill(data.centralEduFirstOfficerTel)
        }
        if(data.centralEduSecondOfficerName && data.centralEduSecondOfficerTel){
            const inputNameBox = this.page.locator('[id="officers[1].contact_name"]')
            const inputTelBox = this.page.locator('[id="officers[1].contact_tel"]')
            await inputNameBox.fill(data.centralEduSecondOfficerName)
            await inputTelBox.fill(data.centralEduSecondOfficerTel)
        }
    }

    async handleStatusSlider(status:string){
        const statusContainer = this.page.locator('span.label')
        if (status) {
            const currentText = await statusContainer.textContent()
            if (!currentText?.includes(status)) {
                await statusContainer.click()
            }
            await expect(statusContainer).toContainText(status)
        }
    }

    async clickSaveButton(){
        const saveButton = this.page.getByRole('button', { name: 'บันทึก' })
        await saveButton.click()
    }
}