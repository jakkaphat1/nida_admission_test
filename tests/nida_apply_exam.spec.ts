import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../pages/ExamsPage';
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
    
    test('TC-03 ทดสอบกรอกข้อมูล Step 1: กรอกข้อมูลเบื้องต้น', async ({ admissionPage, examsPage, page }) => {
        test.setTimeout(45000);

        await examsPage.gotoExamsPage();
        await examsPage.searchExamBySubject('วิชาเฉพาะ 2');
        await examsPage.searchExamEduLevel('ปริญญาโท');
        await examsPage.chooseExam('วิชาเฉพาะ 2','ครั้งที่ 10/2568');

        const studentData: StudentInfoForApplyExam = {
            firstNameEng: 'NUEYY',
            lastNameEng: 'TODSOB',
            marriageStatus: 'โสด',
            homeProvince: 'กรุงเทพมหานคร',
            nationality: 'ไทย',
            religion: 'พุทธ',
            inCountryGraduate: 'จบการศึกษาในประเทศ',
            degreeLevel: 'ปริญญาตรี',
            universityName: 'จุฬาลงกรณ์มหาวิทยาลัย',
            graduatedYear: '01/01/2569',
            educationalQualifications: 'สัตวแพทยศาสตรบัณฑิต',
            gpa: '3.50'
        };

        await examsPage.fillExamApplicationForm(studentData);
        await examsPage.saveButtonClick();

        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible();
    });


});