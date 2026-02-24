import { Page, Locator , expect } from '@playwright/test'; 

interface StudentName {
    firstTH: string
    lastTH: string
    firstEN: string
    lastEN: string
    midTH?: string
    midEN?: string
}


interface EducationData {
    curriculumCode?: string;
    curriculumName?: string;
    admissionYear?: string;
    degree?: string;
    faculty?: string;
    major?: string;
    status?: string;
}

interface WorkingData {
     workingStatus? : string;
     workingAfterEducationYear? : string;
     workingAfterEducationMonth? : string;
     workingAllExperienceYear? : string;
     workingAllExperienceMonth? : string;
     jobs? : string;

     workingPlacePresent? : string;
     salary? : string
     jobPosition? :string;
     workType? : string;
     workTelephone? : string;

     workingPlacePresent2? : string;
     salary2? : string
     jobPosition2? :string;
     workType2? : string;
     workTelephone2? : string;
}

interface ParentData {
     fatherAliveStatus? : string
     fatherPrefix? : string
     fatherName? : string
     fatherLastName? : string
     fatherPhoneNumber? : string
     fatherEmailContact? : string

     motherAliveStatus? : string
     motherPrefix? : string
     motherName? : string
     motherLastName? : string
     motherPhoneNumber? : string
     motherEmailContact? : string

     parentPerson? : string
     parentRelation? : string
     parentPrefix? : string
     parentName? : string
     parentLastName? : string
     parentPhoneNumber? : string
     parentEmailContact? : string

     emergencyParent? : string
     emergencyrelationshipWith? : string
     emergencyprefix? : string
     emergencyName? : string
     emergencyLastName? : string
     emergencyPhoneNumber? : string
     emergencyEmailContact? : string
}


interface HouseData{
     countryName?:string , addressNumber?:string , villageNumber?:string , buildingNumber?:string , 
     floorNumber?:string , alleyName?:string , roadName?:string , provinceName?:string , districtName?:string , subDistrictName?:string
}


export class EducationReportingPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
     reportingMenu
     nationalDropdown
     idNumber 
     birthDate
     prefix
     gender
     creatPassportDate
     expiredPassportDate
     firstTHName
     midTHName
     lastTHName
     firstENName
     midENName
     lastENName
     telNumber
     email
     birthplace
     religion
     educationCountryLabel
     educationLevelhasValue
     educatuinLevelPlaceholder
     educationQualification
     gpaTextBox
     educateDate
     educationQuantificationForApplication
     universityNamehasValue
     universityNamePlaceholder
     honorshasVelue
     honorsPlaceholder 

     //step4
     workingStatus
     workingAfterEduYear
     workingAfterEduMonth
     workingAllExpYear
     workingAllExpMonth
     jobs
     workingPlacePresent
     salary
     jobPosition
     workType
     workTelephone
     workingPlacePresent2
     salary2
     jobPosition2
     workType2
     workTelephone2

     //Step5 
     fatherAliveStatus
     fatherPrefix
     fatherName
     fatherLastName
     fatherPhoneNumber
     fatherEmailContact

     motherAliveStatus
     motherPrefix
     motherName
     motherLastName
     motherPhoneNumber
     motherEmailContact

     parentPerson
     parentRelation
     parentPrefix
     parentName
     parentLastName
     parentPhoneNumber
     parentEmailContact

     emergencyParent
     emergencyrelationshipWith
     emergencyprefix
     emergencyName
     emergencyLastName
     emergencyPhoneNumber
     emergencyEmailContact






    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor (page:Page){
     this.page = page;
     this.reportingMenu = this.page.getByRole('link', { name: 'รายงานตัว', exact: true })

     // Normal info
     this.nationalDropdown = this.page.locator('.react-select__input-container').first()
     this.idNumber = this.page.getByRole('textbox', { name: 'เลขที่บัตรประจำตัวประชาชน' })
     this.birthDate = this.page.getByRole('textbox', { name: 'วัน/เดือน/ปีเกิด (พ.ศ.)' })
     this.prefix = this.page.locator('.grid > div > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container').first()
     this.gender = page.locator('div').filter({ hasText: 'ชายหญิงไม่ระบุ' }).nth(5)
     this.creatPassportDate = this.page.getByRole('textbox', { name: 'วันออกหนังสือเดินทาง' })
     this.expiredPassportDate = this.page.getByRole('textbox', { name: 'วันหมดอายุหนังสือเดินทาง' })

     // Name info
     this.firstTHName = this.page.getByRole('textbox', { name: 'ชื่อ (ภาษาไทย)' })
     this.midTHName = this.page.getByRole('textbox', { name: 'นามสกุล (ภาษาไทย)' }).first()
     this.lastTHName = this.page.getByRole('textbox', { name: 'นามสกุล (ภาษาไทย)' }).nth(1)
     this.firstENName = this.page.getByRole('textbox', { name: 'ชื่อ (ภาษาอังกฤษ)' })
     this.midENName = this.page.getByRole('textbox', { name: 'นามสกุล (ภาษาอังกฤษ)' }).first()
     this.lastENName = this.page.getByRole('textbox', { name: 'นามสกุล (ภาษาอังกฤษ)' }).nth(1)

     //Contact Info
     this.telNumber = this.page.getByRole('textbox', { name: 'กรุณากรอกหมายเลขโทรศัพท์มือถือ' })
     this.email = this.page.getByRole('textbox', { name: 'อีเมล (ที่ใช้สำหรับการติดต่อ)' })
     this.birthplace = this.page.locator('div').filter({ hasText: /^ภูมิลำเนา$/ }).nth(3)
     this.religion = this.page.locator('div').filter({ hasText: /^ไม่ระบุศาสนา$/ }).nth(3)


     //Step3
     this.educationCountryLabel = this.page.locator('div').filter({ hasText: /^จบการศึกษาในประเทศจบการศึกษาต่างประเทศ$/ }).nth(1)
     this.educationLevelhasValue = this.page.locator('div').filter({ hasText: /^ปริญญาตรี$/ }).nth(3)
     this.educatuinLevelPlaceholder = this.page.locator('#react-select-16-placeholder')
     this.educationQualification = this.page.getByRole('textbox', { name: 'วุฒิการศึกษา' })
     this.gpaTextBox = this.page.getByRole('textbox', { name: 'GPA' })
     this.educateDate = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' })
     this.educationQuantificationForApplication = this.page.locator('.react-select__input-container').first()
     this.universityNamehasValue = this.page.locator('div:nth-child(6) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
     this.universityNamePlaceholder = this.page.locator('div').filter({ hasText: /^ชื่อสถาบันการศึกษา$/ }).nth(3)
     this.honorshasVelue = this.page.locator('div').filter({ hasText: /^เกียรตินิยมอันดับ 1$/ }).nth(3)
     this.honorsPlaceholder = this.page.locator('#react-select-19-placeholder')

     //Step 4
     this.workingStatus        = page.locator('div').filter({ hasText: /^ทำงานว่างงาน$/ }).nth(1)
     this.workingAfterEduYear  = page.locator('div').filter({ hasText: /^เลือกปี$/ }).nth(2)
     this.workingAfterEduMonth = page.locator('div').filter({ hasText: /^เลือกเดือน$/ }).nth(2)
     this.workingAllExpYear    = page.locator('div:nth-child(3) > .formItem_input > .grid > div > .css-nxiuxh-container > .unext-form-control').first()
     this.workingAllExpMonth   = page.locator('div:nth-child(3) > .formItem_input > .grid > div:nth-child(2) > .css-nxiuxh-container > .unext-form-control')
     this.jobs                 = page.locator('div').filter({ hasText: /^ประเภทอาชีพ$/ }).nth(3)
     this.workingPlacePresent  = page.getByRole('textbox', { name: 'สถานที่ทำงานปัจจุบัน' })
     this.salary               = page.getByRole('textbox', { name: 'เงินเดือน' })
     this.jobPosition          = page.getByRole('textbox', { name: 'ตำแหน่งงาน' })
     this.workType             = page.getByRole('textbox', { name: 'ประเภทธุรกิจ' })
     this.workTelephone        = page.getByRole('textbox', { name: 'โทรศัพท์' })

     this.workingPlacePresent2  = page.getByRole('textbox', { name: 'สถานที่ทำงานปัจจุบัน' }).nth(1)
     this.salary2               = page.getByRole('textbox', { name: 'เงินเดือน' }).nth(1)
     this.jobPosition2          = page.getByRole('textbox', { name: 'ตำแหน่งงาน' }).nth(1)
     this.workType2             = page.getByRole('textbox', { name: 'ประเภทธุรกิจ' }).nth(1)
     this.workTelephone2        = page.getByRole('textbox', { name: 'โทรศัพท์' }).nth(1)

     //step5
     this.fatherAliveStatus = page.locator('#father_info-alive')
     this.fatherPrefix = page.locator('.react-select__input-container').first()
     this.fatherName = page.locator('input[name="father_info.first_name_th"]')
     this.fatherLastName = page.locator('input[name="father_info.last_name_th"]')
     this.fatherPhoneNumber = page.locator('input[name="father_info.mobile_phone"]')
     this.fatherEmailContact = page.locator('input[name="father_info.email_contact"]')

     this.motherAliveStatus = page.locator('#mother_info-alive')
     this.motherPrefix = page.locator('div:nth-child(2) > .formLayout_container > div:nth-child(2) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
     this.motherName = page.locator('input[name="mother_info.first_name_th"]')
     this.motherLastName = page.locator('input[name="mother_info.last_name_th"]')
     this.motherPhoneNumber = page.locator('input[name="mother_info.mobile_phone"]')
     this.motherEmailContact = page.locator('input[name="mother_info.email_contact"]')

     this.parentPerson = page.locator('#parent_relation')
     this.parentRelation = page.locator('div').filter({ hasText: /^ความเกี่ยวข้อง$/ }).nth(3)
     this.parentPrefix = page.locator('div:nth-child(3) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container').first()
     this.parentName = page.locator('input[name="parent_info.first_name_th"]')
     this.parentLastName = page.locator('input[name="parent_info.last_name_th"]')
     this.parentPhoneNumber = page.locator('input[name="parent_info.mobile_phone"]')
     this.parentEmailContact = page.locator('input[name="parent_info.email_contact"]')

     this.emergencyParent = page.locator('#emergency_relation')
     this.emergencyrelationshipWith = page.locator('div:nth-child(4) > .formLayout_container > div:nth-child(2) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control')
     this.emergencyprefix = page.locator('div:nth-child(4) > .formLayout_container > div:nth-child(3) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
     this.emergencyName = page.locator('input[name="emergency_info.first_name_th"]')
     this.emergencyLastName = page.locator('input[name="emergency_info.last_name_th"]')
     this.emergencyPhoneNumber = page.locator('input[name="emergency_info.mobile_phone"]')
     this.emergencyEmailContact = page.locator('input[name="emergency_info.email_contact"]')

     }


    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
     async clickReportingMenu(){
        await this.reportingMenu.click()
     }

     async checkReportingFirstTimePopup(){
        const heading = this.page.getByRole('heading', { name: 'ยินยอมเปิดเผยข้อมูลส่วนบุคคล' })
        await expect(heading).toBeVisible()
     }

     async clickAcceptTermPolicy(){
        const acceptTermPolicyLabel = this.page.getByText('เงื่อนไขการเก็บใช้ และเปิดเผยข้อมูลส่วนตัวบุคคลดังกล่าว และยินยอมตามเงื่อนไขดังกล่าวทุกประการ')
        await expect(acceptTermPolicyLabel).toBeVisible()
        await acceptTermPolicyLabel.click()
     }

     async clickAcceptTermPolicyButton(){
        const acceptTermPolicyButton = this.page.getByRole('button', { name: 'ยอมรับระเบียบข้อตกลง' })
        await expect(acceptTermPolicyButton).toBeVisible()
        await acceptTermPolicyButton.click()
     }

     async clickProcessByLabel(processName:string){
        const card = this.page.locator('div').filter({ hasText: processName }).nth(3)
        const processButton = card.getByRole('button', { name: 'ดำเนินการ' }).first()
        await processButton.click()
     }

     async clickVerifyForForeigner(){
        const foreignerButton = this.page.locator('div').filter({ hasText: 'Verify for Foreigner' }).nth(4)
        await expect(foreignerButton).toBeVisible()
        await foreignerButton.click()
     }

     async selectFileForVerifyForeigner(fileNames: string[]){
        const attachFile = this.page.getByText('Attach file')
        const chooseFile = this.page.getByRole('button', { name: 'เลือกไฟล์' })
        await expect(attachFile).toBeVisible()
        await expect(chooseFile).toBeVisible()
        await attachFile.click()

        const filePaths = fileNames.map(file => `downloads/${file}`)

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            chooseFile.click()
        ])

        await fileChooser.setFiles(filePaths)
     }

     async clickConfirmVerification(){
        const confirmButton = this.page.getByRole('button', { name: 'Confirm verification' })
        await expect(confirmButton).toBeVisible()
        await confirmButton.click()
     }

     async clickConfirmPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })
        const confirmButton = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(heading).toBeVisible()
        await expect(confirmButton).toBeVisible()
        await confirmButton.click()
     }

     async clickAcceptTermOrPolicyForUniversityRule(){
        const acceptButton = this.page.getByText('ข้าพเจ้าได้อ่าน และเข้าใจถึงข้อกำหนดของทางสถาบัน และยินยอม ปฏิบัติตามเงื่อนไขดัง')
        await expect(acceptButton).toBeVisible()
        await acceptButton.click()
     }

     async clickConfirmButtonForUniversityRule(){
        const confirmButton = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(confirmButton).toBeVisible()
        await confirmButton.click()
     }

     async clickConfirmInPopupForUniversityRule(){
        const confirmButton = this.page.locator('#portal').getByRole('button', { name: 'ยืนยัน' })
        await expect(confirmButton).toBeVisible()
        await confirmButton.click()
     }

     async checkUpdateStudentRegirstrationInfo(){
          await expect(this.page.locator('div').filter({ hasText: 'ข้อมูลทั่วไป' }).nth(1)).toBeVisible()
          await expect(this.page.locator('div').filter({ hasText: 'ข้อมูลการศึกษา' }).nth(1)).toBeVisible()
          await expect(this.page.locator('div').filter({ hasText: 'ประวัติการศึกษาเดิม' }).nth(1)).toBeVisible()
          await expect(this.page.locator('div').filter({ hasText: 'ประวัติการทำงาน' }).nth(1)).toBeVisible()
          await expect(this.page.locator('div').filter({ hasText: 'ข้อมูลผู้ปกครอง' }).nth(1)).toBeVisible()
          await expect(this.page.locator('div').filter({ hasText: 'ที่อยู่' }).nth(1)).toBeVisible()
          await expect(this.page.locator('div').filter({ hasText: 'ข้อมูลอื่นๆ' }).nth(1)).toBeVisible()

          await expect(this.page.getByRole('textbox', { name: 'เลขที่บัตรประจำตัวประชาชน' })).toBeVisible()
          await expect(this.page.locator('.react-select__input-container').first()).toBeVisible()
          await expect(this.page.getByRole('textbox', { name: 'วัน/เดือน/ปีเกิด (พ.ศ.)' })).toBeVisible()
          await expect(this.page.getByRole('textbox', { name: 'วันออกหนังสือเดินทาง' })).toBeVisible()
          await expect(this.page.getByRole('textbox', { name: 'วันหมดอายุหนังสือเดินทาง' })).toBeVisible()
          await expect(this.page.locator('.grid > div > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container').first()).toBeVisible()
          await expect(this.page.locator('div').filter({ hasText: 'ชายหญิงไม่ระบุ' }).nth(5)).toBeVisible()
          await expect(this.page.getByRole('textbox', { name: 'ชื่อ (ภาษาไทย)' })).toBeVisible()
      
          await expect(this.page.getByRole('textbox', { name: 'นามสกุล (ภาษาไทย)' }).nth(1)).toBeVisible()
          await expect(this.page.getByRole('textbox', { name: 'ชื่อ (ภาษาอังกฤษ)' })).toBeVisible()

          await expect(this.page.getByRole('textbox', { name: 'นามสกุล (ภาษาอังกฤษ)' }).nth(1)).toBeVisible()
          await expect(this.page.getByRole('textbox', { name: 'กรุณากรอกหมายเลขโทรศัพท์มือถือ' })).toBeVisible()
          await expect(this.page.getByRole('textbox', { name: 'อีเมล (ที่ใช้สำหรับการติดต่อ)' })).toBeVisible()
          await expect(this.page.locator('div:nth-child(12) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')).toBeVisible()
          
          await expect(this.page.locator('label').filter({ hasText: 'วางรูปที่นี่เปลี่ยนรูป' })).toBeVisible()
          await expect(this.page.getByRole('button', { name: 'บันทึก' })).toBeVisible()
          await expect(this.page.getByRole('button', { name: 'ยกเลิกการแก้ไข' })).toBeVisible()

     }

     async handleStepNavigation() {
          const editBtn = this.page.getByRole('button', { name: 'แก้ไข' })
          const nextBtn = this.page.getByRole('button', { name: 'ถัดไป' })

          if (await editBtn.isVisible() && await nextBtn.isEnabled()) {
               await nextBtn.click()
               return  
          }
     }

     async chooseFacePhoto(fileName:string){
          const chooseFile = this.page.getByLabel('backdrop')
          await expect(chooseFile).toBeVisible()

          const [fileChooser] = await Promise.all([
               this.page.waitForEvent('filechooser'), //เปิด browser's file dialog
               chooseFile.click()
          ])
          await fileChooser.setFiles(`downloads/${fileName}`)
     }

     async fillStudentNormalInfo(nation:string , id:string ,date:string ,prefixType:string,passportDate:string,passportExpired:string){
          //nation
          const nationalOption = this.page.getByRole('option', { name: nation })
          await this.nationalDropdown.click()
          await nationalOption.click()
          //ID
          await this.idNumber.click()
          await this.idNumber.press('Control+a') 
          await this.idNumber.press('Backspace')
          await this.idNumber.fill(id)
          //Birthdate
          await this.birthDate.click()
          await this.birthDate.press('Control+a') 
          await this.birthDate.press('Backspace')
          await this.birthDate.pressSequentially(date , { delay: 200 })
          //prefix
          const prefixlOption = this.page.getByRole('option', { name: prefixType })
          await this.prefix.click()
          await prefixlOption.click()     
          // วันที่ออกหนังสือ
          await this.creatPassportDate.click()
          await this.creatPassportDate.press('Control+a') 
          await this.creatPassportDate.press('Backspace')
          await this.creatPassportDate.pressSequentially(passportDate , { delay: 200 })
          // วันที่หนังสือเดินทางหมดอายุ
          await this.expiredPassportDate.click()
          await this.expiredPassportDate.press('Control+a') 
          await this.expiredPassportDate.press('Backspace')
          await this.expiredPassportDate.pressSequentially(passportExpired , { delay: 200 })
     }

     async selectGender(genderType: 'ชาย' | 'หญิง' | 'ไม่ระบุ') {
          await this.gender.click()
          await this.gender.getByRole('radio', { name: genderType }).click()
     }

     async fillStudentNameInfo({ firstTH, midTH, lastTH, firstEN, midEN, lastEN }: StudentName){
          await this.firstTHName.fill(firstTH)

          if(midTH){
               await this.midTHName.fill(midTH)
          }

          await this.lastTHName.fill(lastTH)
          await this.firstENName.fill(firstEN)

          if(midEN){
               await this.midENName.fill(midEN)
          }

          await this.lastENName.fill(lastEN)
     }


     async fillStudentContactInfo(telephone:string , contactEmail:string , birtPlaces:string , religions?:string){
          await this.telNumber.click()
          await this.telNumber.press('Control+a') 
          await this.telNumber.press('Backspace')
          await this.telNumber.pressSequentially(telephone)

          await this.email.click()
          await this.email.press('Control+a') 
          await this.email.press('Backspace')     
          await this.email.pressSequentially(contactEmail)
          
          const birtplaceOption = this.page.getByRole('option', { name: birtPlaces })
          await this.birthplace.click()
          await birtplaceOption.click()

          if(religions){
               const religionOption = this.page.getByRole('option', { name: religions })
               await this.religion.click()
               await religionOption.click()
          }
     }

     async clickSaveInfoButton(){
          const saveButton = this.page.getByRole('button', { name: 'บันทึก' })
          await saveButton.click()
     }

     async clickNextStep(){
          const nextButton = this.page.getByRole('button', { name: 'ถัดไป' })
          await nextButton.click()
     }

     async checkStep2Verification(data: EducationData){
          if (data.curriculumCode) {
            await expect(this.page.getByText(data.curriculumCode)).toBeVisible();
          }
        
          if (data.admissionYear) {
               await expect(this.page.getByText(data.admissionYear)).toBeVisible();
          }

          const fieldsToVerify = Object.values(data).filter(value => value !== data.status);
        
          for (const value of fieldsToVerify) {
               if (value) {
                    await expect(this.page.getByText(value).first()).toBeVisible();
               }
          }

     
     }

     async checkStep3Verification(){
          const elements = [
               this.educationCountryLabel,
               this.educationLevelhasValue,
               this.educationQualification,
               this.gpaTextBox,
               this.educateDate,
               this.educationQuantificationForApplication,
               this.universityNamehasValue,
               this.honorshasVelue,
          ]
          for (const checkelement of elements) {
               await expect(checkelement).toBeVisible()
          }
     }

     async fillStep3(educationCountry: 'จบการศึกษาในประเทศ' | 'จบการศึกษาต่างประเทศ',educationLevel:string , eduQualification:string , gpa:string , graduate:string ,quantificationForApplication :string ,university:string ,honors:string){
          await this.educationCountryLabel.getByText(educationCountry).click()
          
          if(educationLevel){
               const educationLevelOption = this.page.getByRole('option', { name: educationLevel })
               await this.educationLevelhasValue.click()
               await educationLevelOption.click()
          }

          await this.educateDate.click()
          await this.educateDate.press('Control+a') 
          await this.educateDate.press('Backspace')
          await this.educateDate.pressSequentially(graduate , {delay:200})

          if(quantificationForApplication){
               const quantification = this.page.getByRole('option', { name: quantificationForApplication })
               await this.educationQuantificationForApplication.click()
               await quantification.click()
          }

          await this.gpaTextBox.fill(gpa)

          if(university){
               const universityOption = this.page.getByRole('option', { name: university , exact:true})
               await this.universityNamePlaceholder.click()
               await universityOption.click()
          }
          
          if(honors){
               const honorsOption = this.page.getByRole('option', { name: honors , exact:true }) 
               await this.honorshasVelue.click()
               await honorsOption.click()
          }
     }

     async fillStep4(data: WorkingData) {
          if (data.workingStatus) {
               // await this.workingStatus.click()
               await this.page.getByText(data.workingStatus, { exact: true }).click()
          }
          if (data.workingAfterEducationYear){
               await this.workingAfterEduYear.click()
               const workingAfterEduYearOption = this.page.getByRole('option', { name: data.workingAfterEducationYear, exact: true })
               await workingAfterEduYearOption.click()
          }  
               
          if (data.workingAfterEducationMonth){
               await this.workingAfterEduMonth.click()
               const workingAfterEduMonthOption = this.page.getByRole('option', { name: data.workingAfterEducationMonth , exact: true})
               await workingAfterEduMonthOption.click()
          }
               
          if (data.workingAllExperienceYear){
               await this.workingAllExpYear.click()
               const workingAllExpYearOption = this.page.getByRole('option', { name: data.workingAllExperienceYear, exact: true })
               await workingAllExpYearOption.click()
          }
               
          if (data.workingAllExperienceMonth) {
               await this.workingAllExpMonth.click()
               const workingAllExpMonthOption = this.page.getByRole('option', { name: data.workingAllExperienceMonth, exact: true })
               await workingAllExpMonthOption.click()
          }
          
          if (data.jobs){
               await this.jobs.click()
               const jobsOption = this.page.getByRole('option', { name: data.jobs, exact: true })
               await jobsOption.click()
          }

         

          if(data.workingPlacePresent){
               await this.workingPlacePresent.fill(data.workingPlacePresent)
          }

          if (data.salary)                
               await this.salary.fill(data.salary)
          if (data.jobPosition)                
               await this.jobPosition.fill(data.jobPosition)

          if(data.workType){
               await this.workType.fill(data.workType)
          }
          if (data.workTelephone)             
                await this.workTelephone.fill(data.workTelephone)
     }

     async clickAddHistoryWorkingButton(){
          const AddHistoryWorkingButton = this.page.getByRole('button', { name: 'เพิ่มข้อมูลการทำงาน' })
          await AddHistoryWorkingButton.click()
     }

     async fillHistoryWorking2(data:WorkingData){
          if(data.workingPlacePresent2){
               await this.workingPlacePresent.fill(data.workingPlacePresent2)
          }

          if (data.salary2)                
               await this.salary.fill(data.salary2)
          if (data.jobPosition2)                
               await this.jobPosition.fill(data.jobPosition2)

          if(data.workType2){
               await this.workType.fill(data.workType2)
          }
          if (data.workTelephone2)             
                await this.workTelephone.fill(data.workTelephone2)
     }

     async fillFatherInfo(data: ParentData) {
          if (data.fatherAliveStatus) {
               await this.fatherAliveStatus.getByText(data.fatherAliveStatus).click()
          }
          if (data.fatherPrefix) {
               await this.fatherPrefix.click()
               await this.page.getByRole('option', { name: data.fatherPrefix, exact: true }).click()
          }
          if (data.fatherName)        await this.fatherName.fill(data.fatherName)
          if (data.fatherLastName)    await this.fatherLastName.fill(data.fatherLastName)
          if (data.fatherPhoneNumber) await this.fatherPhoneNumber.fill(data.fatherPhoneNumber)
          if (data.fatherEmailContact) await this.fatherEmailContact.fill(data.fatherEmailContact)
          await this.page.waitForTimeout(2000)
     }

     async fillMotherInfo(data: ParentData) {
          if (data.motherAliveStatus) {
               await this.motherAliveStatus.getByText(data.motherAliveStatus).click()
          }
          if (data.motherPrefix) {
               await this.motherPrefix.click()
               await this.page.getByRole('option', { name: data.motherPrefix, exact: true }).click()
          }
          if (data.motherName)        await this.motherName.fill(data.motherName)
          if (data.motherLastName)    await this.motherLastName.fill(data.motherLastName)
          if (data.motherPhoneNumber) await this.motherPhoneNumber.fill(data.motherPhoneNumber)
          if (data.motherEmailContact) await this.motherEmailContact.fill(data.motherEmailContact)
          await this.page.waitForTimeout(2000)
     }

     async fillParentInfo(data: ParentData){
          if (data.parentPerson){
               await this.parentPerson.getByText(data.parentPerson).click()
          }

          if (data.parentRelation){
               await this.parentRelation.click()
               await this.page.getByRole('option', { name: data.parentRelation, exact: true }).click()
          }

          if (data.parentPrefix) {
               await this.parentPrefix.click()
               await this.page.getByRole('option', { name: data.parentPrefix, exact: true }).click()
          }

          if (data.parentName)        await this.parentName.fill(data.parentName)
          if (data.parentLastName)    await this.parentLastName.fill(data.parentLastName)
          if (data.parentPhoneNumber) await this.parentPhoneNumber.fill(data.parentPhoneNumber)
          if (data.parentEmailContact) await this.parentEmailContact.fill(data.parentEmailContact)
          await this.page.waitForTimeout(2000)
     }

     async fillEmergencyInfo(data: ParentData){
          if (data.emergencyParent){
               await this.emergencyParent.getByText(data.emergencyParent).click()
          }

          if (data.emergencyrelationshipWith){
               await this.emergencyrelationshipWith.click()
               await this.page.getByRole('option', { name: data.emergencyrelationshipWith, exact: true }).click()
          }

          if (data.emergencyprefix) {
               await this.emergencyprefix.click()
               await this.page.getByRole('option', { name: data.emergencyprefix, exact: true }).click()
          }

          if (data.emergencyName)        await this.emergencyName.fill(data.emergencyName)
          if (data.emergencyLastName)    await this.emergencyLastName.fill(data.emergencyLastName)
          if (data.emergencyPhoneNumber) await this.emergencyPhoneNumber.fill(data.emergencyPhoneNumber)
          if (data.emergencyEmailContact) await this.emergencyEmailContact.fill(data.emergencyEmailContact)
          await this.page.waitForTimeout(2000)
     }

     async clickTrainButtonByName(trainName:string){
          const TrainButton = this.page.getByRole('button', { name: trainName })
          await TrainButton.click()
          
     }

     async fillAddressInfo(data:HouseData){
          
          if(data.countryName){
               const countryDropdown = this.page.locator('.react-select__input-container').first()
               const countryOption = this.page.getByRole('option', { name: data.countryName })
               await countryDropdown.click()
               await countryOption.click()
          }

          if(data.addressNumber){
               const adressNumberBox = this.page.getByRole('textbox', { name: 'ระบุบ้านเลขที่' })
               await adressNumberBox.fill(data.addressNumber)
          }

          if(data.villageNumber){
               const villageNumberBox = this.page.getByRole('textbox', { name: 'ระบุหมู่ที่' })
               await villageNumberBox.fill(data.villageNumber)
          }

          if(data.buildingNumber){
               const buildingNumberBox = this.page.getByRole('textbox', { name: 'อาคาร' })
               await buildingNumberBox.fill(data.buildingNumber)
          }

          if(data.floorNumber){
               const floorNumberBox = this.page.getByRole('textbox', { name: 'ระบุชั้น' })
               await floorNumberBox.fill(data.floorNumber)
          }

          if(data.alleyName){
               const alleyNameBox = this.page.getByRole('textbox', { name: 'ระบุตรอก/ซอย' })
               await alleyNameBox.fill(data.alleyName)
          }

          if(data.roadName){
               const roadNameBox = this.page.getByRole('textbox', { name: 'ระบุถนน' })
               await roadNameBox.fill(data.roadName)
          }

          if(data.provinceName){
               const provinceNameBox = this.page.locator('div:nth-child(8) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
               const provinceNameOption = this.page.getByRole('option', { name: data.provinceName , exact:true })
               await provinceNameBox.click()
               await provinceNameOption.click()
          }

          if(data.districtName){
               const districtNameBox = this.page.locator('div:nth-child(9) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
               const districtNameOption = this.page.getByRole('option', { name: data.districtName , exact:true})
               await districtNameBox.click()
               await districtNameOption.click()
          }

          if(data.subDistrictName){
               const subDistrictNameBox = this.page.locator('div:nth-child(10) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
               const subDistrictNameOption = this.page.getByRole('option', { name: data.subDistrictName , exact:true })
               await subDistrictNameBox.click()
               await subDistrictNameOption.click()
          }
     }

     async clickAddressSameHomeRegistration(){
          const AddressSameHomeRegistrationButton = this.page.locator('#house_address-assign_flag').getByText('ใช้ที่อยู่ปัจจุบัน')
          await AddressSameHomeRegistrationButton.click()
     }

     async clickAddressSameByParent(){
          const AddressSameByParent = this.page.locator('#parent_address-assign_flag').getByText('ใช้ที่อยู่ปัจจุบัน')
          await AddressSameByParent.click()
     }

     async clickAddressSameByInfoSender(){
          const AddressSameByInfoSender = this.page.locator('#document_address-assign_flag').getByText('ใช้ที่อยู่ปัจจุบัน')
          await AddressSameByInfoSender.click()
     }

     async clickAddressSameByReceipt(){
          const AddressSameByReceipt = this.page.locator('#receipt_address-assign_flag').getByText('ใช้ที่อยู่ปัจจุบัน')
          await AddressSameByReceipt.click()
     }
}