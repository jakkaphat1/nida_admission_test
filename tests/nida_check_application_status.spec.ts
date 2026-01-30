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

    test('TC-03.1 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณียังไม่ส่งใบสมัคร | (1) ทดสอบแก้ไขข้อมูล' , async ({admissionPage , examsPage , applicationStatusPage}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickCheckApplyMenu();
        await applicationStatusPage.clickEditDraftInfo();
    });

    // test('TC-03.2 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (1) ทดสอบพิมพ์ใบสมัคร' , async ({admissionPage , examsPage , applicationStatusPage}) => {
    //     await admissionPage.gotoPrograms();
    //     await applicationStatusPage.clickCheckApplicationStatus();
    //     await applicationStatusPage.clickCheckApplyMenu();
    // });

    // test('TC-03.3 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (2) ทดสอบยกเลิกใบสมัคร' , async ({admissionPage , examsPage , applicationStatusPage}) => {
    //     await admissionPage.gotoPrograms();
    //     await applicationStatusPage.clickCheckApplicationStatus();
    //     await applicationStatusPage.clickCheckApplyMenu();
    // });

    // test('TC-03.4 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (3) ทดสอบชำระเงินค่าสมัคร' , async ({admissionPage , examsPage , applicationStatusPage}) => {
    //     await admissionPage.gotoPrograms();
    //     await applicationStatusPage.clickCheckApplicationStatus();
    //     await applicationStatusPage.clickCheckApplyMenu();
    // });
});