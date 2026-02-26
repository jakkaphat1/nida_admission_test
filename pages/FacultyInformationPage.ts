import { Page , expect } from "@playwright/test";
import path from 'path';

export class FacultyInformationPage {
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

    async gotoFacultyInformationMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        const majorSubeject = this.page.getByRole('link', { name: 'ข้อมูลคณะ' })
        await applicationWork.click()
        await basicInfoButton.click()
        await majorSubeject.click()
    }

    async clickEditCampusInfoByCardName(campusName:string ,){
        const campusCard = this.page.locator('div').filter({ hasText: campusName }).first()
        const editButton = campusCard.locator('button.buttonAction_button').first()
        await editButton.click()
    }

    async clickAddFacultyButtonByCampusName(campusName:string){
        const campusCard = this.page.locator('div').filter({ hasText: campusName }).first()
        const addButton = campusCard.getByRole('button', { name: 'เพิ่มคณะ' }).first()
        await addButton.click()
    }

    async clickEditFacultyInCampus(campusName: string, facultyName: string) {
        const campusCard = this.page.locator('.ant-card, div').filter({ hasText: campusName }).first();
        const facultyRow = campusCard.locator('tr').filter({ hasText: facultyName });
        const kebabMenu = facultyRow.locator('.menuAction_button').first();
        await kebabMenu.click();
        await this.page.getByRole('button', { name: 'แก้ไข' }).click();
    }


    // Fill Add Process
    async fillAddFacultyInfoPage(data:{
        facultyID? : string,
        facultyIntial? : string,
        facultyNameTH? : string,
        facultyNameEN? : string,
        facultyColour? : string,
        
    }){
        if(data.facultyID){
            const facultyIDBox = this.page.getByRole('textbox', { name: 'รหัสคณะ*' })
            await facultyIDBox.fill(data.facultyID)
        }

        if(data.facultyIntial){
            const facultyIntialBox = this.page.getByRole('textbox', { name: 'ชื่อย่อคณะ*' })
            await facultyIntialBox.fill(data.facultyIntial)
        }

        if(data.facultyNameTH){
            const facultyNameTHBox = this.page.getByRole('textbox', { name: 'ชื่อคณะ (ภาษาไทย)*' })
            await facultyNameTHBox.fill(data.facultyNameTH)
        }

        if(data.facultyNameEN){
            const facultyNameENBox = this.page.getByRole('textbox', { name: 'ชื่อคณะ (ภาษาอังกฤษ)*' })
            await facultyNameENBox.fill(data.facultyNameEN)
        }

        if(data.facultyColour){
            const facultyColourBox = this.page.getByRole('textbox', { name: 'ระบุ HEX code เช่น #FFFFFF' })
            await facultyColourBox.fill(data.facultyColour)
        }
    }

    async fillAddFacultyImageInfo(fileName: string){
        const filePath = path.resolve(process.cwd(), 'downloads', fileName);
        const chooseFileButton = this.page.getByRole('button', { name: 'เลือกไฟล์' });
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await chooseFileButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
    }

    async fillAddFacultyAddressInfo(data:{
        campusLocation? : 'สถานที่เดียวกับวิทยาเขต'|'กำหนดเอง',
        campusAddress? : string,
        campusProvince? : string,
        campusDistrict? : string,
        campusSubDistrict? : string,
        campusZipCode? : string,
        campusLatitude? : string,
        campusLongitude? : string,
    }){
        if(data.campusLocation == 'กำหนดเอง' && data.campusAddress){
            const facultyPlace = this.page.getByText('กำหนดเอง')
            await facultyPlace.click()

            if(data.campusAddress){
                const address = this.page.getByRole('textbox', { name: 'ที่อยู่' })
                await address.fill(data.campusAddress)
            }
            if(data.campusProvince){
                const provinceDropdown = this.page.locator('.react-select__input-container').first()
                const provinceOption = this.page.getByRole('option', { name: data.campusProvince })
                await provinceDropdown.click()
                await provinceOption.click()
            }
            if(data.campusDistrict){
                const districtDropdown = this.page.locator('#district_code > .unext-form-control > .react-select__value-container > .react-select__input-container')
                const districtOption = this.page.getByRole('option', { name: data.campusDistrict })
                await districtDropdown.click()
                await districtOption.click()
            }
            if(data.campusSubDistrict){
                const campusSubDistrictDropdown = this.page.locator('#subdistrict_code > .unext-form-control > .react-select__value-container > .react-select__input-container')
                const camputSubDistrictOption = this.page.getByRole('option', { name: data.campusSubDistrict })
                await campusSubDistrictDropdown.click()
                await camputSubDistrictOption.click()
            }
            if(data.campusZipCode){
                const zipcodeDropdown = this.page.locator('#zipcode > .unext-form-control > .react-select__indicators')
                const zipcodeOption = this.page.getByRole('option', { name: data.campusZipCode })
                await zipcodeDropdown.click()
                await zipcodeOption.click()
            }
            if(data.campusLatitude){
                const latitudeBox = this.page.getByRole('textbox', { name: 'Latitude' })
                await latitudeBox.fill(data.campusLatitude)
            }
            if(data.campusLongitude){
                const longitudeBox = this.page.getByRole('textbox', { name: 'Longitude' })
                await longitudeBox.fill(data.campusLongitude)
            }
        }

    }

    async fillAddFacultyContactInfo(data:{
        campusTel? : string,
        campusLineID? : string,
        campusFacebook? : string,
        campusEmail? : string,
        campusWebsite? : string,
        campusFirstOfficerName? : string,
        campusFirstOfficerTel? : string,
        campusSecondOfficerName? : string,
        campusSecondOfficerTel? : string,
    }){
        if(data.campusTel){
            const telphoneBox = this.page.getByRole('textbox', { name: 'เบอร์โทรสำนักงาน' })
            await telphoneBox.fill(data.campusTel)
        }
        if(data.campusLineID){
            const lineIDBox = this.page.getByRole('textbox', { name: 'line ID' })
            await lineIDBox.fill(data.campusLineID)
        }
        if(data.campusFacebook){
            const faceboolBox = this.page.getByRole('textbox', { name: 'Facebook' })
            await faceboolBox.fill(data.campusFacebook)
        }
        if(data.campusEmail){
            const inputBox = this.page.getByRole('textbox', { name: 'Email' })
            await inputBox.fill(data.campusEmail)
        }
        if(data.campusWebsite){
            const inputBox = this.page.getByRole('textbox', { name: 'Website' })
            await inputBox.fill(data.campusWebsite)
        }
        if(data.campusFirstOfficerName && data.campusFirstOfficerTel ){
            const inputNameBox = this.page.locator('[id="officers[0].contact_name"]')
            const inputTelBox = this.page.locator('[id="officers[0].contact_tel"]')
            await inputNameBox.fill(data.campusFirstOfficerName)
            await inputTelBox.fill(data.campusFirstOfficerTel)
        }
        if(data.campusSecondOfficerName && data.campusSecondOfficerTel){
            const inputNameBox = this.page.locator('[id="officers[1].contact_name"]')
            const inputTelBox = this.page.locator('[id="officers[1].contact_tel"]')
            await inputNameBox.fill(data.campusSecondOfficerName)
            await inputTelBox.fill(data.campusSecondOfficerTel)
        }
    }


    // Fill Edit Process
    async fillEditFacultyInfoPage(data:{
        facultyID? : string,
        facultyIntial? : string,
        facultyNameTH? : string,
        facultyNameEN? : string,
        facultyColour? : string,
        
    }){
        if(data.facultyID){
            const facultyIDBox = this.page.getByRole('textbox', { name: 'รหัสคณะ*' })
            await facultyIDBox.fill(data.facultyID)
        }

        if(data.facultyIntial){
            const facultyIntialBox = this.page.getByRole('textbox', { name: 'ชื่อย่อคณะ*' })
            await facultyIntialBox.fill(data.facultyIntial)
        }

        if(data.facultyNameTH){
            const facultyNameTHBox = this.page.getByRole('textbox', { name: 'ชื่อคณะ (ภาษาไทย)*' })
            await facultyNameTHBox.fill(data.facultyNameTH)
        }

        if(data.facultyNameEN){
            const facultyNameENBox = this.page.getByRole('textbox', { name: 'ชื่อคณะ (ภาษาอังกฤษ)*' })
            await facultyNameENBox.fill(data.facultyNameEN)
        }

        if(data.facultyColour){
            const facultyColourBox = this.page.getByRole('textbox', { name: 'ระบุ HEX code เช่น #FFFFFF' })
            await facultyColourBox.fill(data.facultyColour)
        }
    }

    async fillEditFacultyAddressInfo(data:{
        campusLocation? : 'สถานที่เดียวกับวิทยาเขต'|'กำหนดเอง',
        campusAddress? : string,
        campusProvince? : string,
        campusDistrict? : string,
        campusSubDistrict? : string,
        campusZipCode? : string,
        campusLatitude? : string,
        campusLongitude? : string,
    }){
        if(data.campusLocation == 'กำหนดเอง' && data.campusAddress){
            const facultyPlace = this.page.getByText('กำหนดเอง')
            await facultyPlace.click()

            if(data.campusAddress){
                const address = this.page.getByRole('textbox', { name: 'ที่อยู่' })
                await address.fill(data.campusAddress)
            }
            if(data.campusProvince){
                const provinceDropdown = this.page.locator('.react-select__input-container').first()
                const provinceOption = this.page.getByRole('option', { name: data.campusProvince })
                await provinceDropdown.click()
                await provinceOption.click()
            }
            if(data.campusDistrict){
                const districtDropdown = this.page.locator('#district_code > .unext-form-control > .react-select__value-container > .react-select__input-container')
                const districtOption = this.page.getByRole('option', { name: data.campusDistrict })
                await districtDropdown.click()
                await districtOption.click()
            }
            if(data.campusSubDistrict){
                const campusSubDistrictDropdown = this.page.locator('#subdistrict_code > .unext-form-control > .react-select__value-container > .react-select__input-container')
                const camputSubDistrictOption = this.page.getByRole('option', { name: data.campusSubDistrict })
                await campusSubDistrictDropdown.click()
                await camputSubDistrictOption.click()
            }
            if(data.campusZipCode){
                const zipcodeDropdown = this.page.locator('#zipcode > .unext-form-control > .react-select__indicators')
                const zipcodeOption = this.page.getByRole('option', { name: data.campusZipCode })
                await zipcodeDropdown.click()
                await zipcodeOption.click()
            }
            if(data.campusLatitude){
                const latitudeBox = this.page.getByRole('textbox', { name: 'Latitude' })
                await latitudeBox.fill(data.campusLatitude)
            }
            if(data.campusLongitude){
                const longitudeBox = this.page.getByRole('textbox', { name: 'Longitude' })
                await longitudeBox.fill(data.campusLongitude)
            }
        }

    }

    async fillEditFacultyContactInfo(data:{
        campusTel? : string,
        campusLineID? : string,
        campusFacebook? : string,
        campusEmail? : string,
        campusWebsite? : string,
        campusFirstOfficerName? : string,
        campusFirstOfficerTel? : string,
        campusSecondOfficerName? : string,
        campusSecondOfficerTel? : string,
    }){
        if(data.campusTel){
            const telphoneBox = this.page.getByRole('textbox', { name: 'เบอร์โทรสำนักงาน' })
            await telphoneBox.fill(data.campusTel)
        }
        if(data.campusLineID){
            const lineIDBox = this.page.getByRole('textbox', { name: 'line ID' })
            await lineIDBox.fill(data.campusLineID)
        }
        if(data.campusFacebook){
            const faceboolBox = this.page.getByRole('textbox', { name: 'Facebook' })
            await faceboolBox.fill(data.campusFacebook)
        }
        if(data.campusEmail){
            const inputBox = this.page.getByRole('textbox', { name: 'Email' })
            await inputBox.fill(data.campusEmail)
        }
        if(data.campusWebsite){
            const inputBox = this.page.getByRole('textbox', { name: 'Website' })
            await inputBox.fill(data.campusWebsite)
        }
        if(data.campusFirstOfficerName && data.campusFirstOfficerTel ){
            const inputNameBox = this.page.locator('[id="officers[0].contact_name"]')
            const inputTelBox = this.page.locator('[id="officers[0].contact_tel"]')
            await inputNameBox.fill(data.campusFirstOfficerName)
            await inputTelBox.fill(data.campusFirstOfficerTel)
        }
        if(data.campusSecondOfficerName && data.campusSecondOfficerTel){
            const inputNameBox = this.page.locator('[id="officers[1].contact_name"]')
            const inputTelBox = this.page.locator('[id="officers[1].contact_tel"]')
            await inputNameBox.fill(data.campusSecondOfficerName)
            await inputTelBox.fill(data.campusSecondOfficerTel)
        }
    }

    async clickSaveButton(){
        const saveButton = this.page.getByRole('button', { name: 'บันทึก' })
        await saveButton.click()
    }
}