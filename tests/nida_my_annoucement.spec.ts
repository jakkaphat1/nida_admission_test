import { test, expect } from '../fixtures/baseTest';

test.describe('NIDA Admission Test Suite - ประกาศผลของฉัน' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02.1 ทดสอบดูผลการสอบคัดเลือกและคะแนนสอบ | (1) การสมัครเรียน' , async ({ admissionPage , myAnnoucement, page}) => {
        await admissionPage.gotoPrograms();
        await myAnnoucement.clickMyAnnoucement();
        await expect(page).toHaveURL(/.*my-announcement/);
        await myAnnoucement.checkMyAnnouce()
        await myAnnoucement.checkAnnouceCard('685241111001','สมัครเรียน','วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภา','ผ่านการคัดเลือกเข้าศึกษา')
        await myAnnoucement.clickSeeAnnoucementByCard('685241111001')
        await myAnnoucement.clickConfirmEnrollmentByCard('685241111001')
    });

    test('TC-02.2 ทดสอบดูผลการสอบคัดเลือกและคะแนนสอบ | (2) การสมัครสอบข้อเขียน' , async ({ admissionPage , myAnnoucement, page}) => {
        await admissionPage.gotoPrograms();
        await myAnnoucement.clickMyAnnoucement();
        await expect(page).toHaveURL(/.*my-announcement/);
        await myAnnoucement.checkMyAnnouce()
        await myAnnoucement.clickWrittenExamTab()
        await myAnnoucement.checkWritenExamAnnouceCard('256805900200020','สมัครสอบข้อเขียน','วิชาเฉพาะ 2','990',undefined)
        await myAnnoucement.checkWritenExamAnnouceDetail('256805900200020','5/2568','05/01/2570')
    });
});