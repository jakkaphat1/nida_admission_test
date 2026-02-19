import { test, expect } from '../fixtures/baseTest';

test.describe('NIDA Admission Test Suite - ประกาศผลของฉัน' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบรายงานตัว(เงื่อนไข : ผู้สมัครต้องทำการยืนยันสิทธิ์เรียบร้อยเเล้ว)' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await educationReportingPage.checkReportingFirstTimePopup() //ใช้ได้เฉพาะครั้งแรกที่รายงานตัวเท่านั้น
        await educationReportingPage.clickAcceptTermPolicy()
        await educationReportingPage.clickAcceptTermPolicyButton()
    });
    
});