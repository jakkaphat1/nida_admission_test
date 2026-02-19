import { test, expect } from '../fixtures/baseTest';

test.describe('NIDA Admission Test Suite - ประกาศผลของฉัน' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02.1 ทดสอบรายงานตัว(เงื่อนไข : ผู้สมัครต้องทำการยืนยันสิทธิ์เรียบร้อยเเล้ว) | รายงานตัวครั้งแรก' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await educationReportingPage.checkReportingFirstTimePopup() //ใช้ได้เฉพาะครั้งแรกที่รายงานตัวเท่านั้น
        await educationReportingPage.clickAcceptTermPolicy()
        await educationReportingPage.clickAcceptTermPolicyButton()
    });

    test('TC-02.2 ทดสอบรายงานตัว(เงื่อนไข : ผู้สมัครต้องทำการยืนยันสิทธิ์เรียบร้อยเเล้ว) | เคยรายงานตัวแล้ว' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        // await educationReportingPage.checkReportingFirstTimePopup() //ใช้ได้เฉพาะครั้งแรกที่รายงานตัวเท่านั้น
        // await educationReportingPage.clickAcceptTermPolicy()
        // await educationReportingPage.clickAcceptTermPolicyButton()
    });

    test('TC-03 ทดสอบยืนยันตัวตน (2) ทดสอบ Verify for Foreiger (สำหรับนักศึกษาต่างชาติ) เป็นคนไทย' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ยืนยันตัวตน')
        await expect(page).toHaveURL(/.*reporting\/verification/);
        await educationReportingPage.clickVerifyForForeigner()
        await expect(page).toHaveURL(/.*reporting\/verification\/foreigner/);

        await educationReportingPage.selectFileForVerifyForeigner([
            'frontIDcard.png',
            'backIDcard.png',
            'photo.jpg'
        ])
        await educationReportingPage.clickConfirmVerification()
        await educationReportingPage.clickConfirmPopup()
        await expect(page.getByText('ทำรายการสำเร็จ')).toBeVisible()
    });

    test('TC-04 ทดสอบรับทราบระเบียบปฏิบัติการเป็นนักศึกษาของสถาบัน' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('รับทราบระเบียบปฏิบัติการเป็นนักศึกษาของสถาบัน')
        await expect(page).toHaveURL(/.*reporting\/terms/);
        await educationReportingPage.clickAcceptTermOrPolicyForUniversityRule()
        await educationReportingPage.clickConfirmButtonForUniversityRule()
        await educationReportingPage.clickConfirmInPopupForUniversityRule()
        await expect(page.getByText('ทำรายการสำเร็จ')).toBeVisible()
    });
    
});