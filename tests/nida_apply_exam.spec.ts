import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage } from '../pages/ExamsPage';
import path from 'path';

test.describe('NIDA Apply Exam Tests', () => {

    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)', async ({ admissionPage, page }) => {
    await admissionPage.goto();
    await admissionPage.loginButton.click();
    await admissionPage.fillEmail(admissionPage.email);
    await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบสมัครสอบ', async ({ admissionPage, examsPage, page }) => {

        // --- (1) กรณีค้นหารายการสมัครสอบข้อเขียน
        await examsPage.gotoExamsPage();
        await examsPage.searchExamBySubject('วิชาเฉพาะ 2');
        await examsPage.searchExamEduLevel('ปริญญาโท');

        // --- (2) กรณีสมัครสอบ
        await examsPage.chooseExam('วิชาเฉพาะ 2','ครั้งที่ 10/2568');
    });

    
});