import { Page, Locator , expect } from '@playwright/test'; 
import { StudentInfo } from './AdmissionPage';

export interface StudentInfoForApplyExam {
    firstNameEng: string;
    lastNameEng: string;
    marriageStatus: string;
    homeProvince: string;
    nationality: string;
    religion: string;
    inCountryGraduate: string;
    degreeLevel?: string;
    universityName?: string;
    graduatedYear?: string;
    graduatedDateIcon?: string;
    educationalQualifications?: string;
    gpa?: string;
}



export class ExamsPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    examsUrl = 'https://admissions-uat.nida.ac.th/exams';
    examsUrlEdit = 'https://admissions-uat.nida.ac.th/application-status/apply-exam';
    searchSubjectInput: Locator;
    selectSubjectDropdown: Locator;
    selectEduLevelDropdown: Locator;
    applyExamButton: Locator;
    examCard: Locator;
    applyExamButton2: Locator;
    editExamButton : Locator;
    editExamButton2 : Locator;
    editInfoButton : Locator;
    editInfoButton2 : Locator;
    expandButton : Locator;

    //หน้ากรอกข้อมูลสมัครสอบ
    firstNameEngInput: Locator;
    lastNameEngInput: Locator;
    marrieageStatusDropdown: Locator;
    homeDropdown: Locator;
    nationalityDropdown: Locator;
    religionDropdown: Locator;
    inCountryGraduateRadio : Locator;
    degreeLevelDropdown : Locator;
    universityName : Locator;
    graduatedYear : Locator;
    graduatedDateIcon : Locator;
    educationalQualifications : Locator;
    gpa : Locator;
    sureveyRadio1 : Locator;
    selectNewSubjectButton : Locator;

    // ตรวจสอบวิชา
    subject9Card:Locator
    popupConfirmBtn : Locator;


    // Handle Button
    saveButton : Locator;
    nextButton : Locator;
    sendApplicationButton : Locator;

                



    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;

        // Exam Page Locators
        this.searchSubjectInput = page.getByPlaceholder('ค้นหาจากชื่อวิชาสอบที่คุณสนใจ...');
        this.selectSubjectDropdown = page.locator('.react-select__control').filter({ hasText: 'เลือกวิชา' });
        this.selectEduLevelDropdown = page.locator('.react-select__control').filter({ hasText: 'เลือกระดับการศึกษา' });
        this.applyExamButton = page.getByRole('button', { name: 'สมัครสอบข้อเขียน' }).first();
        this.examCard = page.locator('div[aria-label="card"]');
        this.applyExamButton2 = page.getByRole('button', { name: 'สมัครสอบข้อเขียน' });
        this.editExamButton = page.getByRole('button', { name: 'แก้ไข'  ,exact : true });
        this.editExamButton2 = page.getByRole('button', { name: 'แก้ไข'  ,exact : true });
        this.editInfoButton = page.getByRole('button', { name: 'แก้ไขข้อมูล' }).nth(1);
        this.editInfoButton2 = page.getByRole('button', { name: 'แก้ไขข้อมูล' }).nth(2);
        this.expandButton = page.locator('div')
            .filter({ hasText: /^รายละเอียดสถานะการสมัคร$/ })
            .locator('button, svg')
            .last();

        // Fill Exam Application Page 
        this.firstNameEngInput = page.getByPlaceholder('ชื่อ (ภาษาอังกฤษ)');
        this.lastNameEngInput = page.getByPlaceholder('นามสกุล (ภาษาอังกฤษ)');
        this.marrieageStatusDropdown = page.locator('.react-select__control').filter({ hasText: /^สถานภาพสมรส$/ });
        this.homeDropdown = page.locator('.react-select__control').filter({ hasText: /^ภูมิลำเนา$/ });
        this.nationalityDropdown = page.locator('.react-select__control').filter({ hasText: /^สัญชาติ$/ });
        this.religionDropdown = page.locator('.react-select__control').filter({ hasText: /^ไม่ระบุศาสนา$/ });
        this.inCountryGraduateRadio = page.locator('label').filter({ hasText: 'จบการศึกษาในประเทศ' });
        this.degreeLevelDropdown = page.locator('.react-select__control').filter({ hasText: 'ระดับการศึกษาที่ใช้ในการสมัคร' });
        this.universityName = page.locator('.react-select__control').filter({ hasText: /ชื่อสถาบันการศึกษา/ });
        this.graduatedYear = page.locator('input#grad_date:not(.d-none)');
        const dateContainer = page.locator('div')
            .filter({ has: this.graduatedYear })
            .last();

        this.graduatedDateIcon = dateContainer.locator('svg').last();
        // this.graduatedDateIcon = page.locator('.unext-form-group').filter({ has: page.locator('#grad_date') }).locator('svg').last();
        this.educationalQualifications = page.locator('.react-select__control').filter({ hasText: 'วุฒิการศึกษาที่ใช้ในการสมัคร' });
        this.gpa = page.getByPlaceholder('คะแนนเฉลี่ยสะสม (GPA)');
        this.sureveyRadio1 = page.locator('label').filter({ hasText: 'เว็บไซต์สถาบัน' });
        this.saveButton = page.getByRole('button', { name: 'บันทึก' });
        this.nextButton = page.getByRole('button', { name: 'ถัดไป' });
    
        // step 2
        this.selectNewSubjectButton = page.getByRole('button', { name: 'เลือกวิชาใหม่', exact: true });
        this.subject9Card = page.locator('div[aria-label="card"]')
            .filter({ hasText: 'วิชาเฉพาะ 9' })
            .filter({ hasText: '10/2568' });
        this.popupConfirmBtn = page.getByRole('button', { name: 'ยืนยัน', exact: true });
        this.sendApplicationButton =  page.getByRole('button', { name: 'ส่งใบสมัคร' , exact : true});



    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async gotoExamsPage() {
        await this.page.goto(this.examsUrl);
        await expect(this.page).toHaveURL(/.*exams/);
        await this.page.waitForLoadState('networkidle');
    }

    async gotoEditExamPage() {
        await this.page.goto(this.examsUrlEdit);
        await expect(this.page).toHaveURL(/.*apply-exam/);
        await this.page.waitForLoadState('networkidle');
    }

    async searchExamBySubject(subjectName: string) {
        await this.searchSubjectInput.fill(subjectName);
        await this.page.waitForTimeout(200);

        await this.selectSubjectDropdown.click();
        await this.page.waitForTimeout(500);

        const subject_option = this.page.getByRole('option', { name: subjectName, exact: true });


        await subject_option.click();
    }

    async searchExamEduLevel(levelName: string) {
        await this.selectEduLevelDropdown.click();
        await this.page.waitForTimeout(500);
        const selectEduLevelDropdown = this.page.getByRole('option', { name: levelName, exact: true });
        await selectEduLevelDropdown.click();
    }

    async chooseExam(examName: string, examRound: string) {
        // ระบุ Card โดย Filter ทั้งชื่อวิชา และ รอบที่สอบ
        const targetCard = this.examCard
            .filter({ hasText: examName })
            .filter({ hasText: examRound });

        await expect(targetCard).toBeVisible();
        const applyBtn = targetCard.getByRole('button', { name: 'สมัครสอบข้อเขียน' });
        
        await expect(applyBtn).toBeVisible();
        await applyBtn.click();

        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);

        await expect(this.applyExamButton2).toBeVisible();
        await this.applyExamButton2.click();
    }


    async fillExamApplicationForm(data : StudentInfoForApplyExam) {
        await this.page.waitForLoadState('networkidle');
        await this.editExamButton.scrollIntoViewIfNeeded();
        await this.editExamButton.click();

        // fill fields
        await this.firstNameEngInput.scrollIntoViewIfNeeded();
        await this.firstNameEngInput.fill(data.firstNameEng);
        await this.lastNameEngInput.scrollIntoViewIfNeeded();
        await this.lastNameEngInput.fill(data.lastNameEng);

        // 2. จัดการกับ Dropdown (React Select)
        // ฟังก์ชันช่วยเลือกค่าใน Dropdown
        const selectOption = async (dropdown: Locator, value: string) => {
            await dropdown.scrollIntoViewIfNeeded();
            await dropdown.click();
            const option = this.page.getByRole('option', { name: value, exact: true });
            await expect(option).toBeVisible();
            await option.click();
        };

        if (data.marriageStatus) 
            await selectOption(this.marrieageStatusDropdown, data.marriageStatus);
        if (data.homeProvince) 
            await selectOption(this.homeDropdown, data.homeProvince);
        if (data.nationality) 
            await selectOption(this.nationalityDropdown, data.nationality);
        if (data.religion) 
            await selectOption(this.religionDropdown, data.religion);
        

        //ข้อมูลการศึกษา
        if (data.inCountryGraduate) {
            await this.inCountryGraduateRadio.scrollIntoViewIfNeeded();
            await this.inCountryGraduateRadio.click();
        }

        // เลือก ระดับการศึกษา
        if (data.degreeLevel) {
            await selectOption(this.degreeLevelDropdown, data.degreeLevel);
        }

        // กรอกชื่อสถาบัน, ปีที่จบ, วุฒิการศึกษา และ GPA
        if (data.universityName) {
            await selectOption(this.universityName, data.universityName);
        }
        if (data.graduatedYear) {
            const dayToClick = parseInt(data.graduatedYear.split('/')[0]).toString();
            await this.graduatedYear.scrollIntoViewIfNeeded();
            await this.graduatedYear.click();

            const calendar = this.page.locator('.rmdp-calendar');
            if (!(await calendar.isVisible())) {
                await this.graduatedDateIcon.click({ force: true });
            }

            await calendar.waitFor({ state: 'visible' });

            const dayElement = calendar.locator('.rmdp-day:not(.rmdp-deactive)')
                                    .getByText(new RegExp(`^${dayToClick}$`), { exact: true });
            
            await dayElement.click({ force: true });

            await calendar.waitFor({ state: 'hidden' });
            await expect(this.graduatedYear).toHaveValue(data.graduatedYear);
        }


        if (data.educationalQualifications) {
            await this.educationalQualifications.scrollIntoViewIfNeeded();
            await this.educationalQualifications.click();

            await this.educationalQualifications.locator('input').fill(data.educationalQualifications);

            const option = this.page.getByRole('option', { name: data.educationalQualifications, exact: true });
            await option.waitFor({ state: 'visible', timeout: 5000 });
            await option.click();
        }

        if (data.gpa) 
            await this.gpa.fill(data.gpa);

        await this.sureveyRadio1.scrollIntoViewIfNeeded();
        await this.sureveyRadio1.click();
    }

    async saveButtonClick() {
        await this.saveButton.scrollIntoViewIfNeeded();
        await this.saveButton.evaluate(el => el.style.border = '4px solid green');
        await this.saveButton.click();
    }

    async nextButtonClick() {
        await expect(this.nextButton).toBeEnabled({ timeout: 2000 });
        await this.nextButton.click();
    }

    async editExamBtn2(){
        await this.page.waitForLoadState('networkidle');
        await this.editExamButton2.scrollIntoViewIfNeeded();
        await this.editExamButton2.click();    
    }

    async expandButtonClick() {
        await this.expandButton.scrollIntoViewIfNeeded();
        await expect(this.expandButton).toBeVisible({ timeout: 5000 });
        await this.expandButton.click({ force: true });
        await this.page.waitForTimeout(500);
    }

    async editExamApplication() {
        await this.page.waitForLoadState('networkidle');
        await this.editInfoButton.scrollIntoViewIfNeeded();
        await expect(this.editInfoButton).toBeEnabled({ timeout: 2000 });
        await this.editInfoButton.evaluate(el => el.style.border = '3px solid red');
        await this.editInfoButton.click({force : true});
        await this.page.waitForTimeout(1000); 
    }

    async editExamApplication3() {
        await this.page.waitForLoadState('networkidle');
        await this.editInfoButton2.scrollIntoViewIfNeeded();
        await expect(this.editInfoButton2).toBeEnabled({ timeout: 2000 });
        await this.editInfoButton2.evaluate(el => el.style.border = '3px solid red');
        await this.editInfoButton2.click({force : true});
        await this.page.waitForTimeout(1000); 
    }

    async clickSelectNewSubject() {
        await this.page.waitForLoadState('networkidle');

        await this.selectNewSubjectButton.scrollIntoViewIfNeeded();
        await expect(this.selectNewSubjectButton).toBeVisible({ timeout: 5000 });

        await this.selectNewSubjectButton.evaluate(el => el.style.border = '3px solid red');

        await this.selectNewSubjectButton.click({ force: true });
    }

    async selectSubject9() {
        await this.page.waitForLoadState('networkidle');
        await this.subject9Card.scrollIntoViewIfNeeded();
        await this.subject9Card.evaluate(el => el.style.border = '3px solid green');

        const radio = this.subject9Card.locator('input[type="radio"]');
        await radio.click({ force: true });

        await expect(radio).toBeChecked();
        await this.popupConfirmBtn.evaluate(el => el.style.border = '4px solid green');
        await this.popupConfirmBtn.click();

    }

    async sendApplicationBtn(){
        await this.sendApplicationButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000)
        await this.sendApplicationButton.evaluate(el => el.style.border = '4px solid green');
        await this.sendApplicationButton.click()
    }

    async handleConfirmExamPopup() {
        const agreementText = this.page.getByText('ข้าพเจ้ายอมรับเงื่อนไขการสมัครสอบของระบบ');
        await agreementText.waitFor({ state: 'visible', timeout: 10000 });

        const container = this.page.locator('div.flex.justify-center').filter({ hasText: 'ข้าพเจ้ายอมรับเงื่อนไขการสมัครสอบของระบบ' });
        const labelToClick = container.locator('label').first();
        const visualBox = container.locator('div.rounded.grid').first(); 

        await visualBox.evaluate((node: HTMLElement) => {
            node.style.outline = '3px solid red';
            node.style.boxShadow = '0 0 15px red';
        });

        await labelToClick.click();
        const confirmBtn = this.page.getByRole('button', { name: 'สมัครสอบข้อเขียน' });
        await expect(confirmBtn).toBeEnabled({ timeout: 5000 });
        await confirmBtn.evaluate((node: HTMLElement) => {
            node.style.border = '3px solid red';
            node.style.backgroundColor = '#00ff00';
        });
        await this.page.waitForTimeout(300);
        await confirmBtn.click();
    }
        
}