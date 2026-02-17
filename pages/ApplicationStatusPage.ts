import { Page, Locator , expect } from '@playwright/test'; 

export interface editDataInfo {

}



export class ApplicationStatusPage {
    page : Page;
/**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    checkApplicationMenu: Locator;
    checkApplyMenu : Locator;
    draftApplicationForm : Locator;
    editInfoButton : Locator;
    expandDetailsButton : Locator;
    payApplicationButton : Locator;
    cancelApplicationButton : Locator;
    confirmCancelButton : Locator;


    // สมัครสอบข้อเขียน
    writtenExamButton : Locator;
    cancelWrittenApplyExamButton : Locator;
    draftWrittenExamForm : Locator;
    editWrittenExamInfoButton : Locator;
    editWrittenExamInfoButton3 : Locator;
    payWrittenExamButton : Locator;
    selectPaymentGateWayWording : Locator;
    clickWrittenExamPaymentGateway : Locator;
    payButton: Locator;
    confirmButton: Locator;


    // ปรับปรุงใบสมัคร
    updateApplicationButton : Locator;





/**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor (page:Page) {
        this.page = page;
        this.checkApplicationMenu = page.locator('div.cursor-pointer').filter({ hasText: 'ตรวจสอบใบสมัคร' });
        this.checkApplyMenu = page.locator('a[href="/application-status/apply-study"]').filter({ hasText : 'สมัครเรียน' });
        
        const cardHeader = page.locator('div.border-success')
            .filter({ hasText: /ใบสมัครฉบับร่าง|นำส่งใบสมัครแล้ว|รอชำระเงิน/ })
            .first();
        this.draftApplicationForm = cardHeader.locator('xpath=..');
        this.editInfoButton = this.draftApplicationForm
            .locator('button.bg-primary')
            .filter({ hasText: /แก้ไขข้อมูล/ })
            .nth(1);
        this.expandDetailsButton = page.locator('div')
            .filter({ hasText: 'นำส่งใบสมัครแล้ว' })
            .locator('xpath=..')
            .locator('div[aria-label="collapse-toggle"]')
            .nth(0);
        this.payApplicationButton = this.draftApplicationForm
            .locator('button')
            .filter({ hasText: 'ชำระเงินค่าสมัคร' });
        this.cancelApplicationButton = this.draftApplicationForm
            .locator('button')
            .filter({ hasText: 'ยกเลิกใบสมัคร' });
        this.confirmCancelButton = page.locator('.modalAlert_container button')
            .filter({ hasText: 'ยืนยัน' });
        
        
        //สมัครสอบข้อเขียน
        this.writtenExamButton = page.locator('a[href="/application-status/apply-exam"]').filter({ hasText : 'สมัครสอบข้อเขียน' });
        
        const writtenExamcardHeader = page.locator('div.border-success')
            .filter({ hasText: 'ยังไม่ได้รับเลขที่ใบสมัคร' })
            .first();

        this.draftWrittenExamForm = writtenExamcardHeader.locator('xpath=../..');    
        this.cancelWrittenApplyExamButton = this.draftWrittenExamForm
            .locator('button')
            .filter({ hasText: 'ยกเลิกใบสมัคร' });

        this.editWrittenExamInfoButton = this.draftWrittenExamForm
            .locator('div.bg-\\[\\#FAFBFD\\]')
            .locator('button.bg-primary')
            .filter({ hasText: 'แก้ไขข้อมูล' })
            .first();

        this.editWrittenExamInfoButton3 = this.draftWrittenExamForm
            .locator('div.bg-\\[\\#FAFBFD\\]')
            .locator('button.bg-primary')
            .filter({ has: page.locator('svg') })
            .filter({ hasText: 'แก้ไขข้อมูล' })
            .first();    
        this.payWrittenExamButton = this.draftWrittenExamForm
            .locator('button.bg-primary')
            .filter({ has: page.locator('svg') })
            .filter({ hasText: 'ชำระเงินค่าสมัคร' });    
        this.selectPaymentGateWayWording = page.locator('h5').filter({ hasText : 'เลือกช่องทางการชำระเงิน'});
        this.clickWrittenExamPaymentGateway = page.locator('p.text_level_2').filter({ hasText: 'Bill Payment' });
        this.payButton = page.locator('button').filter({ hasText: 'ชำระเงิน' });
        this.confirmButton = page.locator('button').filter({ hasText: 'ยืนยัน' });
    
        // ปรับปรุงใบสมัคร
        this.updateApplicationButton = page.locator('a[href="/application-status/check"]').filter({ hasText : 'ปรับปรุงใบสมัคร' });


    }


    /**
 * Method SECTION
 * ---------------------------------------------------------------- */
    async clickCheckApplicationStatus() {
        await this.checkApplicationMenu.click();
        await expect(this.checkApplicationMenu).toBeVisible();
        await this.page.waitForTimeout(1000)
    }

    async clickCheckApplyMenu(){
        //higtlight
        await this.checkApplyMenu.evaluate((el) => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '3px solid red';
        })
        await this.page.waitForTimeout(1000);
        await this.checkApplyMenu.click();
        await expect(this.checkApplyMenu).toBeVisible();
        await this.page.waitForTimeout(2000);
    }


    async clickEditDraftInfo() {
        await this.draftApplicationForm.scrollIntoViewIfNeeded();

        const statusTag = this.draftApplicationForm
            .locator('.tag_box')
            .filter({ hasText: 'ใบสมัครฉบับร่าง' })
            .first();

        await statusTag.evaluate(el => el.style.outline = '3px solid lime').catch(() => {});

        await this.editInfoButton.waitFor({ state: 'visible', timeout: 10000 });

        await this.editInfoButton.evaluate(el => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
        });

        await this.page.waitForTimeout(1000);
        await this.editInfoButton.click();
    }

    async clickExpandDetailsButton() {
        await this.expandDetailsButton.scrollIntoViewIfNeeded();

        await this.expandDetailsButton.waitFor({ state: 'visible' });

        await this.expandDetailsButton.evaluate(el => el.style.border = '2px solid orange');
        await this.page.waitForTimeout(500);

        await this.expandDetailsButton.click();
    }
    
    async clickPaymentButton() {
        await this.payApplicationButton.scrollIntoViewIfNeeded();

        await this.payApplicationButton.waitFor({ state: 'visible', timeout: 5000 });

        await this.payApplicationButton.evaluate(el => el.style.border = '3px solid red')
            .catch(() => {}); 
        await this.page.waitForTimeout(2000);
        await this.payApplicationButton.click();
        await this.page.waitForTimeout(2000);
    }

    async clickCancelApplicationButton() {
        await this.cancelApplicationButton.scrollIntoViewIfNeeded();

        await this.cancelApplicationButton.waitFor({ state: 'visible' });

        await this.cancelApplicationButton.evaluate(el => el.style.border = '3px solid red');
        await this.page.waitForTimeout(500);
        await this.cancelApplicationButton.click();
    }

    async confirmCancelApplication() {
        await this.confirmCancelButton.waitFor({ state: 'visible' });

        await this.confirmCancelButton.evaluate(el => el.style.border = '3px solid green');
        await this.page.waitForTimeout(500);

        await this.confirmCancelButton.click();
        
        await this.confirmCancelButton.waitFor({ state: 'hidden' });
    }


    // สมัครสอบข้อเขียน //
    async clickWrittenExamButtom(){
        
        await this.writtenExamButton.evaluate((el) => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '3px solid red';
        })
        await this.writtenExamButton.click();
        await this.page.waitForTimeout(1000);
    }

    async clickCancelWrittenExamButton() {
        await this.cancelWrittenApplyExamButton.scrollIntoViewIfNeeded();

        await this.cancelWrittenApplyExamButton.waitFor({ state: 'visible' });

        await this.cancelWrittenApplyExamButton.evaluate(el => el.style.border = '3px solid red');
        await this.page.waitForTimeout(500);
        await this.cancelWrittenApplyExamButton.click();
    }

    async clickEditDraftWrittenExamInfo() {
        await this.draftWrittenExamForm.scrollIntoViewIfNeeded();

        await this.draftWrittenExamForm
            .locator('span.text-danger')
            .filter({ hasText: 'ยังไม่ได้รับเลขที่ใบสมัคร' })
            .evaluate(el => el.style.outline = '3px solid lime')
            .catch(() => {});

        const editButton = this.draftWrittenExamForm
            .locator('div.bg-\\[\\#FAFBFD\\]')
            .locator('button.bg-primary')
            .filter({ hasText: 'แก้ไขข้อมูล' })
            .first();

        await editButton.waitFor({ state: 'visible', timeout: 10000 });

        await editButton.evaluate(el => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
        }).catch(() => {});

        await editButton.click();
        await this.page.waitForTimeout(1000)
    }

    async clickEditDraftWrittenExamInfo3() {
        await this.draftWrittenExamForm.scrollIntoViewIfNeeded();

        await this.draftWrittenExamForm
            .locator('span.text-danger')
            .filter({ hasText: 'ยังไม่ได้รับเลขที่ใบสมัคร' })
            .evaluate(el => el.style.outline = '3px solid lime')
            .catch(() => {});

        // รอให้ปุ่มพร้อม
        await this.editWrittenExamInfoButton3.waitFor({ 
            state: 'visible', 
            timeout: 10000 
        });

        // Highlight ปุ่ม
        await this.editWrittenExamInfoButton3.evaluate(el => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
        }).catch(() => {});

        // กดปุ่ม
        await this.editWrittenExamInfoButton3.click();
        await this.page.waitForTimeout(1000);
    }

    async clickPayWrittenExamButton() {
        await this.draftWrittenExamForm.scrollIntoViewIfNeeded();
        await this.payWrittenExamButton.waitFor({ 
            state: 'visible', 
            timeout: 10000 
        });

        // Highlight ปุ่ม
        await this.payWrittenExamButton.evaluate(el => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
        }).catch(() => {});

        // กดปุ่ม
        await this.payWrittenExamButton.click();
        await this.page.waitForTimeout(1000);
    }

    async highlightPaymentWording() {
        await this.selectPaymentGateWayWording.waitFor({ state: 'visible' });

        await this.selectPaymentGateWayWording.evaluate((el) => {
            el.style.backgroundColor = 'yellow';
            el.style.border = '2px solid red';
            el.style.padding = '5px';
            el.scrollIntoView();
        });
        
        await this.page.waitForTimeout(1000); 
    }

    async clickWrittenExamBillPayment() {
        console.log('Select Bill Payment');

        await this.clickWrittenExamPaymentGateway.waitFor({ state: 'visible', timeout: 10000 });

        await this.clickWrittenExamPaymentGateway.scrollIntoViewIfNeeded();

        await this.clickWrittenExamPaymentGateway.evaluate(el => el.style.border = '2px solid red');

        await this.clickWrittenExamPaymentGateway.click();
    }

    async confirmPaymentFlow() {
        console.log('กดปุ่มชำระเงิน');
        
        await this.payButton.waitFor({ state: 'visible' });
        await this.payButton.evaluate(el => el.style.border = '2px solid blue');
        await this.payButton.click();

        console.log('กดยืนยันใน popup');
        
        await this.confirmButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.confirmButton.evaluate(el => el.style.border = '2px solid red');
        await this.confirmButton.click();
    }

    async clickupdateApplicationButton(){
        await this.updateApplicationButton.click();
    }

    
    // ปรับปรุงใบสมัคร
    async clickEditBasicInfo(){
        await this.page.locator('div')
            .filter({ hasText: 'ข้อมูลเบื้องต้น' })
            .getByRole('button', { name: 'แก้ไขข้อมูล' })
            .click();
    }

    async clickEditInputFileInfo(){
        await this.page.locator('div')
            .filter({ hasText: 'แนบเอกสาร' })
            .getByRole('button', { name: 'แก้ไขข้อมูล' })
            .nth(1)
            .click();
    }

    async clickEditBasicInfoInWrittenExam(){
        await this.page.locator('div')
            .filter({ hasText: 'บันทึกข้อมูลผู้สมัคร' })
            .getByRole('button', { name: 'แก้ไขข้อมูล' })
            .click();
    }

    async hoverApplicationFile(Filename:string){
        await this.page.getByText(Filename).hover()
        // await this.page.locator('.attach-icon > svg').hover()
    }
    
    async clickDeleteApplicationFileButton(){
        await this.page.getByRole('button').filter({ hasText: /^$/ }).click()
    }

    async uploadFile(filePath: string) {
        const fileInput = this.page.locator('.drop-file-box input[type="file"]');
        await fileInput.setInputFiles(filePath);
    }

    async clickWrrittenExamLabel(){
        await this.page.getByText('สมัครสอบข้อเขียน').nth(2).click()
    }

    async fillBasicInfo(englishName:string , englishLastName:string , teleNumber:string ,contactEmail:string , nationOption : string){
        const enName = this.page.getByRole('textbox', { name: 'ชื่อ (ภาษาอังกฤษ)*' })
        const enLastName = this.page.getByRole('textbox', { name: 'นามสกุล (ภาษาอังกฤษ)*' })
        const telNumber = this.page.getByRole('textbox', { name: 'กรุณากรอกหมายเลขโทรศัพท์มือถือ' })
        const contactEmailBox =  this.page.getByRole('textbox', { name: 'อีเมล (ที่ใช้สำหรับการติดต่อ)*' })
        const nationalDropdown = this.page.locator('.react-select__input-container').first()
        const nationalOption = this.page.getByRole('option', {name: nationOption, exact: true })
        const religionDropdown = this.page.locator('div').filter({ hasText: /^พุทธ$/ }).nth(3)
        
        await enName.fill(englishName)
        await enLastName.fill(englishLastName)
        await telNumber.fill(teleNumber)
        await contactEmailBox.fill(contactEmail)
        await nationalDropdown.click()
        await nationalOption.click()
    }

    async editBasicInfoInWrittenExam(sex:string , englishName:string , englishLastName:string , teleNumber:string ,contactEmail:string ,relationType:string, nationOption : string){
        const gender = this.page.getByText(sex)
        const enName = this.page.getByRole('textbox', { name: 'ชื่อ (ภาษาอังกฤษ)' })
        const enLastName = this.page.getByRole('textbox', { name: 'นามสกุล (ภาษาอังกฤษ)' })
        const telNumber = this.page.getByRole('textbox', { name: 'กรุณากรอกหมายเลขโทรศัพท์มือถือ' })
        const contactEmailBox =  this.page.getByRole('textbox', { name: 'อีเมล (ที่ใช้สำหรับการติดต่อ)' })
        const relation = this.page.locator('div').filter({ hasText: /^โสด$/ }).nth(3)
        const nationalDropdown = this.page.locator('div:nth-child(13) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
        const nationalOption = this.page.getByRole('option', {name: nationOption, exact: true })
        const religionDropdown = this.page.locator('div').filter({ hasText: /^พุทธ$/ }).nth(3)

        if(gender){
            const gender = this.page.getByText(sex)
            await gender.click()
        }
      
        await enName.fill(englishName)
        await enLastName.fill(englishLastName)
        await telNumber.fill(teleNumber)
        await contactEmailBox.fill(contactEmail)

        if(relation){
            const relation = this.page.locator('div').filter({ hasText: /^โสด$/ }).nth(3)
            const relationOption = this.page.getByRole('option', { name: relationType, exact: true })
            await relation.click()
        }

        await this.page.keyboard.press('Escape');
        await nationalDropdown.click()
        await nationalOption.click()
    }

    async editEducationInfoInWrittenExam({educationRadio, eduLevel, qualification, graduatationDate, universityName, grade}: 
        {
        educationRadio?: string, eduLevel?: string, qualification?: string, 
        graduatationDate?: string, universityName?: string, grade?: string
    }   = {}) 
    {

        if (educationRadio){
            const edcationInorOut = this.page.getByText(educationRadio)
            await edcationInorOut.click()
        }

        if (eduLevel) {
            const eduLevelInput = this.page.locator('div').filter({ hasText: /^ปริญญาตรี$/ }).nth(3)
            await eduLevelInput.click();
            await this.page.getByRole('option', { name: eduLevel, exact: true }).click();
        }

        if (graduatationDate) {
            await this.page.getByRole('textbox', { name: 'วันที่สำเร็จการศึกษา (พ.ศ.)*' }).click();
            await this.page.locator('.react-datepicker__day', { hasText: graduatationDate }).first().click();
        }

        if(qualification){
            const educationQualification = this.page.locator('#edu_degree_code > .unext-form-control > .react-select__value-container > .react-select__input-container')
            const educationQualificationOption = this.page.getByRole('option', { name: qualification })
            await educationQualification.click()
            await educationQualificationOption.click()
        }

        if(universityName){
            const universityDropdown = this.page.locator('#edu_sch_code > .unext-form-control > .react-select__value-container > .react-select__input-container')
            const universityOption = this.page.getByRole('option', { name: universityName, exact: true })
            await universityDropdown.click()
            await universityOption.click()
        }

        if(grade){
            const gpxInput = this.page.getByRole('textbox', { name: 'คะแนนเฉลี่ยสะสม (GPA)*' })
            await gpxInput.fill(grade)
        }
        
    }

    async fillAddressInfo(countryoption:string,homeadrress:string,provinceoption:string,subProvinceoption:string,districoption:string){
        const countryDropdown  = this.page.locator('.sm\\:col-span-2 > .formItem_vertical > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control')
        const countryOption = this.page.getByRole('option', { name: countryoption })
        const homeAddress = this.page.getByRole('textbox', { name: 'ระบุบ้านเลขที่' }).first()
        const province = this.page.locator('div:nth-child(8) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
        const provinceOption = this.page.getByRole('option', { name: provinceoption})
        const subProvince = this.page.locator('div:nth-child(9) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
        const subProvinceOption = this.page.getByRole('option', { name: subProvinceoption })
        const district = this.page.locator('div:nth-child(10) > .formItem_input > .searchMain_container > .css-nxiuxh-container > .unext-form-control > .react-select__value-container > .react-select__input-container')
        const districOption = this.page.getByRole('option', { name: districoption })

        await countryDropdown.click()
        await countryOption.click()
        await homeAddress.fill(homeadrress)
        await province.click()
        await provinceOption.click()
        await subProvince.click()
        await subProvinceOption.click()
        await district.click()
        await districOption.click()
    }

    async fillOtherScore(ieltsScore:string , toeicScore:string , toeflCBTScore:string,  toeflIBTScore:string , toeflITPScore:string ,gmatScore:string , nidaTEAPScore:string  ){
        const ielts = this.page.getByRole('textbox', { name: 'IELTS' })
        const toeic = this.page.getByRole('textbox', { name: 'TOEIC' })
        const toeflCBT = this.page.getByRole('textbox', { name: 'TOEFL CBT' })
        const toeflIBT = this.page.getByRole('textbox', { name: 'TOEFL IBT' })
        const toeflITP = this.page.getByRole('textbox', { name: 'TOEFL ITP (NIDA)' })
        const gmat = this.page.getByRole('textbox', { name: 'GMAT' })
        const nidaTEAP = this.page.getByRole('textbox', { name: 'NIDA TEAP' })

        await ielts.fill(ieltsScore)
        await toeic.fill(toeicScore)
        await toeflCBT.fill(toeflCBTScore)
        await toeflIBT.fill(toeflIBTScore)
        await toeflITP.fill(toeflITPScore)

        await gmat.fill(gmatScore)
        await nidaTEAP.fill(nidaTEAPScore)

    }

    async clickSaveInfoAndSendRecheck(){
        const SaveInfoAndSendRecheckBtn = this.page.getByRole('button', { name: 'บันทึกข้อมูลและส่งตรวจสอบ' })
        await SaveInfoAndSendRecheckBtn.click()
    }

    async clickConfirmPopupButton(){
        const confirmButton = this.page.getByRole('button', { name: 'ยืนยัน' })
        await confirmButton.click()
    }
}