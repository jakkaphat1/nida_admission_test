import { Page, Locator , expect } from '@playwright/test'; 

interface StudentName {
    firstTH: string
    lastTH: string
    firstEN: string
    lastEN: string
    midTH?: string
    midEN?: string
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
}