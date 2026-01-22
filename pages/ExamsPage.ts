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
    searchSubjectInput: Locator;
    selectSubjectDropdown: Locator;
    selectEduLevelDropdown: Locator;
    applyExamButton: Locator;
    examCard: Locator;
    applyExamButton2: Locator;
    editExamButton : Locator;

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
    saveButton : Locator;


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
        this.editExamButton = page.getByRole('button', { name: 'แก้ไข' });

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
    
    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async gotoExamsPage() {
        await this.page.goto(this.examsUrl);
        await expect(this.page).toHaveURL(/.*exams/);
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
        await this.saveButton.click();
    }
}