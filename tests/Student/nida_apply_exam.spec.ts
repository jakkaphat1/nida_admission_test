import { test, expect } from '../../fixtures/baseTest';
import { AdmissionPage } from '../../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../../pages/ExamsPage';
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

        await examsPage.nextButtonClick();
    });

    test('TC-04 ทดสอบตรวจสอบข้อมูลที่ Step 2: ตรวจสอบวิชา', async ({ admissionPage, examsPage, page }) => {
        await examsPage.gotoEditExamPage();
        await examsPage.expandButtonClick();
        await examsPage.editExamApplication();

        await examsPage.editExamBtn2();
        await expect(page.getByText('วิชาเฉพาะ 2')).toBeVisible();
        // await examsPage.saveButtonClick();
        // await expect(page.getByText('ทำรายการสำเร็จ !')).toBeVisible();
        await examsPage.clickSelectNewSubject();
        await examsPage.selectSubject9();
        await examsPage.saveButtonClick();
        await examsPage.nextButtonClick();
    });

    test('TC-05 ทดสอบส่งใบสมัครที่ Step 3: ส่งใบสมัคร', async ({ admissionPage, examsPage, page }) => {
        test.setTimeout(30000);

        const studentData = {
            idCard: '7088581998434',
            firstNameEng: 'NUEYY',
            lastNameEng: 'TODSOB',
            email: 'jakkaphat.dev@hotmail.com',
            marriageStatus: 'โสด',
            homeProvince: 'กรุงเทพมหานคร',
            nationality: 'ไทย',
            religion: 'พุทธ',
            inCountryGraduate: 'จบการศึกษาในประเทศ',
            degreeLevel: 'ปริญญาตรี',
            universityName: 'จุฬาลงกรณ์มหาวิทยาลัย',
            graduatedYear: '01/01/2569',
            educationalQualifications: 'สัตวแพทยศาสตรบัณฑิต',
            gpa: '3.50',
            subjectName: 'วิชาเฉพาะ 9 ครั้งที่ 10 ปี 2568'
        };
        
        const expectedFee = '200.00 บาท';

        await examsPage.gotoEditExamPage();
        await page.waitForLoadState('networkidle');

        await examsPage.expandButtonClick();
        await examsPage.editExamApplication3();


        // ตรวจสอบข้อมูล + highlight
        const personalDataFields = [studentData.idCard, studentData.firstNameEng, studentData.lastNameEng,
            studentData.email,studentData.marriageStatus,studentData.homeProvince,studentData.nationality,studentData.religion,
            studentData.inCountryGraduate,studentData.degreeLevel,studentData.universityName,studentData.educationalQualifications,studentData.graduatedYear,studentData.gpa,studentData.subjectName];
        for (const text of personalDataFields) {
            const locator = page.getByText(text , {exact : true});
            await locator.scrollIntoViewIfNeeded();
            await locator.evaluate(el => el.style.backgroundColor = 'yellow');
            await expect(locator).toBeVisible();
        }

        const subjectTitle = page.getByText(studentData.subjectName);
        await subjectTitle.evaluate(el => el.style.border = '2px solid red');
        await expect(subjectTitle).toBeVisible();


        const feeAmount = page.getByText('200.00 บาท').last();
        await feeAmount.evaluate(el => el.style.backgroundColor = 'yellow'); 
        await expect(feeAmount).toBeVisible();

        await examsPage.sendApplicationBtn()
        await examsPage.handleConfirmExamPopup();

        await examsPage.nextButtonClick();
    });

    test('TC-06 ทดสอบชำระเงินที่ Step 4: ชำระเงิน', async ({ admissionPage, examsPage, page }) => {
        test.setTimeout(30000);

        // (1) ทดสอบชำระผ่าน Bill Payment
        await examsPage.gotoEditExamPage();
        await page.waitForLoadState('networkidle');

        await examsPage.expandButtonClick();
        await examsPage.clickPayApplicationFee();

        await expect(page.getByText('การชำระเงิน', { exact: true }).first()).toBeVisible();
        await examsPage.payWithBillPayment();   
        await examsPage.downloadPaymentInvoice();
    });

    test('TC-07 ทดสอบดูสถานะการสมัครสอบ', async ({ admissionPage, examsPage, page }) => {
        test.setTimeout(30000);

        // (1) ทดสอบชำระผ่าน Bill Payment
        await examsPage.gotoEditExamPage();
        await page.waitForLoadState('networkidle');

        await examsPage.expandButtonClick();
        await examsPage.clickPayApplicationFee();

        await expect(page.getByText('การชำระเงิน', { exact: true }).first()).toBeVisible();
        await examsPage.payWithBillPayment();   
        await examsPage.checkApplicationStatus();
    });


});