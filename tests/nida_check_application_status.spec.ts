import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';
import path from 'path';

test.describe('NIDA Check Application Status' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)', async ({ admissionPage, page }) => {
    await admissionPage.goto();
    await admissionPage.loginButton.click();
    await admissionPage.fillEmail(admissionPage.email);
    await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบเข้าใช้งานเมนูตรวจสอบสถานะสมัคร' , async ({admissionPage , examsPage , applicationStatusPage}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        // await applicationStatusPage.clickCheckApplyMenu();
    });

    test('TC-03 ทดสอบตรวจสอบสถานะการสมัครเรียน' , async ({admissionPage , examsPage , applicationStatusPage}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickCheckApplyMenu();
    });
});