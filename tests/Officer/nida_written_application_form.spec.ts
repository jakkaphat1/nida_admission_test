import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/การสมัครสอบวิชาเฉพาะ/ตรวจสอบใบสมัครข้อเขียน', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 เมนูตรวจสอบใบสมัครสอบข้อเขียน' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
    });

    test('TC-03 ทดสอบค้นหาใบสมัครข้อเขียน' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
        await verifyWrittenExamApplicationPage.clickApplicationFormTab()
        await verifyWrittenExamApplicationPage.fillSearchBox('ทดสอบ')
        const filterInput = {
            subject:'วิชาเฉพาะ 9',
            round:'',
            eduYear:'2569',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            status:'ยังไม่ตรวจสอบ',
            payStatus:'ยังไม่ได้ชำระเงิน',
            applicationStatus:'ส่งใบสมัคร'
        }

        await verifyWrittenExamApplicationPage.filterMoreOption(filterInput)
        await verifyWrittenExamApplicationPage.clickResetAllFilter()
    });
});