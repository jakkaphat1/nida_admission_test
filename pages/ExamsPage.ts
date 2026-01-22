import { Page, Locator , expect } from '@playwright/test'; 

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

    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;
        this.searchSubjectInput = page.getByPlaceholder('ค้นหาจากชื่อวิชาสอบที่คุณสนใจ...');
        this.selectSubjectDropdown = page.locator('.react-select__control').filter({ hasText: 'เลือกวิชา' });
        this.selectEduLevelDropdown = page.locator('.react-select__control').filter({ hasText: 'เลือกระดับการศึกษา' });
        this.applyExamButton = page.getByRole('button', { name: 'สมัครสอบข้อเขียน' }).first();
        this.examCard = page.locator('div[aria-label="card"]');
        this.applyExamButton2 = page.getByRole('button', { name: 'สมัครสอบข้อเขียน' });

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

    async fillExamApplicationForm() {

    }
}