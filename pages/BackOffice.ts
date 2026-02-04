import { Page, Locator , expect } from '@playwright/test'; 

export class BackOffice {
    page : Page;    

/**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    backOfficeURL = 'https://backoffice-uat.nida.ac.th/login';
    backOfficeLandingURL = 'https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission';
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    ApplicationWork : Locator; // ปุ่มงานรับสมัคร
    InitialData : Locator; //ปุ่มข้อมูลตั้งต้น
    curriculumAndprogram : Locator;
    searchCurriculumBox : Locator;
    fillCurriculumBox : Locator;
    nextPageButton : Locator;
    writtenExamRadio : Locator;
    standardPass : Locator;
    subjectDropdown1 : Locator;
    subjectDropdown2 : Locator;
    specificSubject2  : Locator;
    addspecificSubjectButton : Locator;
    specificSubject9 : Locator;
    standardPass2 : Locator;
    GSBAButton : Locator;
    saveButton : Locator;
    editButton : Locator;
    interviewExam : Locator;

    deleteAgeButton : Locator;
    deleteEducationLevelButton : Locator;
    deleteEducationalQualificationsButton : Locator

    qualificationsButton : Locator
    selectEducatuinLevelButton : Locator
    eduLevel : Locator;
    defineProperties : Locator;
    popup_eduLevel : Locator;
    explainBox : Locator;
    popup_saveBtn : Locator;
    addInputInformationBtn : Locator;







/** 
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;

        this.usernameInput = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' });
        this.loginButton = this.page.getByRole('button', { name: 'เข้าสู่ระบบ' });

        this.ApplicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        this.InitialData = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        this.curriculumAndprogram  = this.page.getByRole('link', { name: 'ข้อมูลหลักสูตรและโครงการ' })

        this.searchCurriculumBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อหลักสูตรและโครงการ' })
        this.fillCurriculumBox =  this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อหลักสูตรและโครงการ' })
    
        this.nextPageButton = this.page.getByRole('button', { name: 'ถัดไป' })
        this.writtenExamRadio = this.page.locator('#regis_exam_type').getByText('สอบข้อเขียน', { exact: true })

        this.subjectDropdown1 = this.page.getByText('เลือกวิชาที่สอบ')
        this.specificSubject2 = this.page.getByRole('option', { name: 'วิชาเฉพาะ 2' })
        this.standardPass =  this.page.getByRole('textbox', { name: 'ระบุเกณฑ์คะแนน' })
        this.addspecificSubjectButton = this.page.getByRole('button', { name: 'เพิ่มวิชาที่สอบ' })
    
        this.specificSubject9 = this.page.getByRole('option', { name: 'วิชาเฉพาะ 9' })
        this.standardPass2 =  this.page.getByRole('textbox', { name: 'ระบุเกณฑ์คะแนน' }).nth(1)
    
        this.GSBAButton = this.page.getByRole('button', { name: 'GSBA คณะบริหารธุรกิจ' })
        this.subjectDropdown2 = this.page.locator('#exam_subject_1 > .unext-form-control')

        this.saveButton = this.page.getByRole('button', { name: 'บันทึก' })
        this.editButton = this.page.getByRole('button', { name: 'แก้ไข' })

        this.interviewExam = this.page.getByText('สอบสัมภาษณ์', { exact: true })

        this.deleteAgeButton = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(2)
        this.deleteEducationLevelButton = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4)
        this.deleteEducationalQualificationsButton = this.page.locator('div:nth-child(3) > div > .card-container > .header-box > .status-box > .status > .buttonAction_list > div:nth-child(2) > .buttonAction_button')
        

        this.qualificationsButton = this.page.getByRole('button', { name: 'เพิ่มคุณสมบัติ' })

        this.selectEducatuinLevelButton = this.page.locator('div').filter({ hasText: /^เลือกคุณสมบัติ$/ }).nth(2)

        this.eduLevel = this.page.getByRole('option', { name: 'ระดับการศึกษา' })

        this.defineProperties = this.page.getByRole('button', { name: 'กำหนดคุณสมบัติ' }).first()
        this.popup_eduLevel = this.page.locator('.react-select__value-container.react-select__value-container--is-multi > .react-select__input-container')

        this.explainBox = this.page.getByRole('textbox', { name: 'คำอธิบาย*' })

        this.popup_saveBtn = this.page.locator('#portal').getByRole('button', { name: 'บันทึก' })
        this.addInputInformationBtn = this.page.getByRole('button', { name: 'เพิ่มเอกสารที่ผู้สมัครต้องแนบ' })
    }

/**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async gotoBackOfficeLogin() {
        await this.page.goto(this.backOfficeURL);
    }

    async gotoBackOffice(){
        await this.page.goto(this.backOfficeLandingURL);
    }

    async fillUsernameANDfillPassword(username: string , password: string) {
        await this.usernameInput.scrollIntoViewIfNeeded();
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.evaluate(el => el.style.border = '3px solid red');
        await this.page.waitForTimeout(500);
        await this.usernameInput.click();
        await this.usernameInput.fill(username);

        await this.passwordInput.scrollIntoViewIfNeeded();
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }

    async clickToFacultyInformation(){
        await this.ApplicationWork.click()
        await this.InitialData.click()
        await this.curriculumAndprogram.click()
    }

    async clickToFacultyInformationAndSearch(fillCurriculum : string){
        await this.ApplicationWork.click()
        await this.InitialData.click()
        await this.curriculumAndprogram.click()
        await this.searchCurriculumBox.fill(fillCurriculum);
        
        await this.page.getByRole('button', { name: 'ตัวกรอง' }).click();
    
        // เลือก ระดับการศึกษา
        await this.page.getByText('เลือกระดับการศึกษา').click();
        await this.page.getByRole('option', { name: 'ปริญญาโท' }).click();
        
        // เลือก ประเภทนักศึกษา
        await this.page.getByText('เลือกประเภทนักศึกษา').click();
        await this.page.getByRole('option', { name: 'ภาคปกติ' }).click();
        
        // เลือก ประเภทการสอบ
        await this.page.getByText('เลือกประเภทการสอบ').click();
        await this.page.getByRole('option', { name: 'สอบข้อเขียนและสอบสัมภาษณ์' }).click();

        await this.page.getByRole('button', { name: 'ล้างข้อมูลทั้งหมด' }).click();
    }

    async clickAddProgram(){
        await this.page.getByRole('button', { name: 'GSBA คณะบริหารธุรกิจ' }).click();
        await this.page.getByRole('button', { name: 'เพิ่มโครงการ' }).first().click();
    }

    async clickAddProgramStep1() {
        await this.page.getByRole('textbox', { name: 'รหัสโครงการ*' }).fill('18041234');
        await this.page.getByRole('textbox', { name: 'ชื่อย่อโครงการ' }).fill('Sci-MBA');
        await this.page.getByRole('textbox', { name: 'ชื่อโครงการ*' }).fill('สาขาวิชาจัดการการลงทุน และบริหาร ความเสี่ยง');
        await this.page.getByRole('textbox', { name: 'ชื่อโครงการ (ภาษาอังกฤษ)' }).fill('Investment Management and Risk Management');
        await this.page.locator('div').filter({ hasText: /^เลือกวัน$/ }).nth(2).click();
        await this.page.getByRole('option', { name: 'วันจันทร์' }).click();
        await this.page.locator('div').filter({ hasText: /^เลือกวัน$/ }).nth(2).click();
        await this.page.getByRole('option', { name: 'วันศุกร์' }).click();
        await this.page.getByRole('textbox', { name: ':00' }).first().click();
        await this.page.getByText('09').first().click();
        await this.page.getByText('00').nth(1).click();
        await this.page.getByRole('textbox', { name: ':00' }).nth(1).click();
        await this.page.getByText('17').first().click();
        await this.page.getByText('00').nth(1).click();
        await this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3).click();
        await this.page.getByRole('option', { name: 'ภาคปกติ' }).click();
        await this.page.locator('div').filter({ hasText: /^เลือกประเภทโครงการ$/ }).nth(3).click();
        await this.page.getByRole('option', { name: 'Thai Program' }).click();
        await this.page.getByRole('textbox', { name: 'ระบุหลักที่ 5' }).fill('00');
        await this.page.getByRole('textbox', { name: 'ระบุหลักที่ 6' }).fill('0');
        await this.page.getByRole('textbox', { name: 'ระบุหลักที่ 7' }).fill('3');
        await this.page.getByRole('textbox', { name: 'ระบุหลักที่ 8' }).fill('0');
        await this.page.getByRole('textbox', { name: 'ระบุหลักที่ 9' }).fill('0');
        await this.page.getByRole('button', { name: 'บันทึก' }).click();
        await this.nextPageButton.click()
    }

    async clickEditProgramByName(programName: string) {
        const programCard = this.page.locator('.flex.flex-col.gap-3 > div > div')
            .filter({ hasText: programName });
        await programCard.evaluate(el => el.style.border = '2px solid blue');
        await programCard.getByRole('button', { name: 'แก้โครงการ' }).click();
    }

    async clickConfirmPopup(){
        const popupCard = this.page.locator('div')
        .filter({ hasText: 'การสร้างข้อมูลโครงการไม่เสร็จคุณต้องการสร้างข้อมูลโครงการให้สำเร็จ ยกเลิกยืนยัน' })
        .nth(2)
        await popupCard.evaluate(el => el.style.border = '2px solid blue');
        await popupCard.getByRole('button', { name: 'ยืนยัน' }).click();
    }

    async clickNextButton(){
        await this.nextPageButton.click()
    }

    async clickGSBAButton(){
        await this.GSBAButton.click()
    }

    async clickAndFillAddProgramStep2_WrittenExam(standardPoint : string , standardPoint2 : string){
        await this.writtenExamRadio.click();
        await this.subjectDropdown1.click();
        await this.page.waitForTimeout(500)
        await this.specificSubject2.click()
        await this.standardPass.scrollIntoViewIfNeeded();
        await this.standardPass.waitFor({ state: 'visible' });
        await this.standardPass.fill(standardPoint);

        await this.addspecificSubjectButton.click();
        await this.subjectDropdown2.click()
        await this.specificSubject9.click()
        await this.standardPass2.fill(standardPoint2);
    }

    async clickSaveButton(){
        await this.saveButton.waitFor({ state: 'visible' });
        await this.saveButton.click();
    }

    async clickEditButton(){
        await this.editButton.waitFor({ state: 'visible' });
        await this.editButton.click();
    }

    async clickinterviewExam(){
        await this.interviewExam.waitFor({ state : 'visible'})
        await this.interviewExam.click()
    }
    
    async deleteQualificationByTitle(titleKeyword: string[]) {
        for (const title of titleKeyword){
            const card = this.page.locator('.card-container').filter({hasText : title}).first();
            await card.evaluate(el => el.style.border = '2px solid blue');
    
            const deleteBtn = card.locator('button.delete-button').first();
            
            await deleteBtn.waitFor({ state: 'visible' });
            await deleteBtn.evaluate(el => el.style.border = '3px solid red');
            await deleteBtn.click();

            await this.page.waitForTimeout(500); 
            console.log(`Deleted: ${title}`);
        } 
    }

    async addQualificationsButton(){
        await this.qualificationsButton.click()
    }

    async selectEducatuinLevel(levelName : string , exaplainWord : string ){
        const selecteduLevel = this.page.locator('div').filter({ hasText: /^เลือกคุณสมบัติ$/ }).nth(2)
        await selecteduLevel.evaluate(el => el.style.border = '2px solid blue');
        await selecteduLevel.click()
        await this.eduLevel.click()
        await this.defineProperties.click()
        await this.popup_eduLevel.click()
        await this.page.getByRole('option', { name: levelName }).click();

        await this.explainBox.fill(exaplainWord)
        await this.popup_saveBtn.click()
    }

    async deleteInformationFile(informationKeyword: string[]) {
        
        for (const title of informationKeyword){
            const information_card = this.page.locator('.card-container').filter({hasText : title}).first();
            await information_card.waitFor({ state : 'visible'})
            await information_card.evaluate(el => el.style.border = '2px solid blue');
    
            const deleteBtn = information_card.locator('button.delete-button').first();
            
            await deleteBtn.waitFor({ state: 'visible' });
            await deleteBtn.evaluate(el => el.style.border = '3px solid red');
            await deleteBtn.click();

            await this.page.waitForTimeout(500); 
            console.log(`Deleted: ${title}`);
        } 
    }

    async clickAddInputerInformation(){
        await this.addInputInformationBtn.waitFor({timeout:500})
        await this.addInputInformationBtn.click()
    }

    async chooseInformationFile(index : number ,infoFileDropdown : string){
        const information_card = this.page.locator('.card-container').filter({ hasText: index.toString() }).first();
        await information_card.waitFor({ state : 'visible'})
        await information_card.evaluate(el => el.style.border = '2px solid blue');

        const selectinfoFileDropdown = information_card.locator('input.react-select__input');
        await selectinfoFileDropdown.waitFor({ state: 'visible' });
        await selectinfoFileDropdown.evaluate(el => el.style.border = '3px solid red');
        await selectinfoFileDropdown.fill(infoFileDropdown);
            
        const option = this.page.getByRole('option', { name: infoFileDropdown, exact: true });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async swapCard(sourceIndex: number, targetIndex: number) {
        // 1. หา Card ต้นทาง โดยเจาะจงหาเลขใน div.round
        const sourceCard = this.page.locator('.card-container').filter({
            has: this.page.locator('.round', { hasText: new RegExp(`^${sourceIndex}$`) })
        }).first();

        // 2. หา Card ปลายทาง แบบเดียวกัน
        const targetCard = this.page.locator('.card-container').filter({
            has: this.page.locator('.round', { hasText: new RegExp(`^${targetIndex}$`) })
        }).first();

        // เช็คว่าเจอทั้งคู่ไหมก่อนเริ่มลาก
        await sourceCard.waitFor({ state: 'visible' });
        await targetCard.waitFor({ state: 'visible' });

        // 3. หาปุ่ม Handle สำหรับลาก (ปุ่มแรกของการ์ด)
        const sourceHandle = sourceCard.locator('button[aria-roledescription="sortable"]').first();

        // 4. ทำการลาก (Drag and Drop) 
        await sourceHandle.hover();
        await this.page.mouse.down();
        
        await targetCard.hover();
        await this.page.mouse.up();
        await this.page.waitForTimeout(1000);
    }
}   