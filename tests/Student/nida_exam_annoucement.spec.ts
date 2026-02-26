import { test, expect } from '../../fixtures/baseTest';

test.describe('NIDA Apply Exam Tests', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบตรวจสอบรายการชำระเงินที่ค้างชำระ' , async ({ admissionPage , examAnnoucePage, page}) => {
        await admissionPage.gotoPrograms();
        await examAnnoucePage.clickExamAnnouce()
        await expect(page).toHaveURL(/.*exam-announcement/);
        await examAnnoucePage.checkExamAnnouce()
    });

    test('TC-03.1 ทดสอบตรวจสอบรายการชำระเงินที่ค้างชำระ | (1) การสมัครเรียน' , async ({ admissionPage , examAnnoucePage, page}) => {
        await admissionPage.gotoPrograms();
        await examAnnoucePage.clickExamAnnouce()
        await expect(page).toHaveURL(/.*exam-announcement/);
        await examAnnoucePage.checkExamAnnouce()
        await examAnnoucePage.checkAnnouceCard('685241111001','สมัครเรียน','วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภา','เป็นผู้มีสิทธิ์สอบ')
        await examAnnoucePage.checkAnnouceExpandDetail('685241111001','ห้องสอบวิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ','มกราคม 2569 เวลา 15:00 - 20:00','1')
    });

    test('TC-03.2 ทดสอบตรวจสอบรายการชำระเงินที่ค้างชำระ | (2) การสมัครสอบ' , async ({ admissionPage , examAnnoucePage, page}) => {
        await admissionPage.gotoPrograms();
        await examAnnoucePage.clickExamAnnouce()
        await expect(page).toHaveURL(/.*exam-announcement/);
        await examAnnoucePage.checkExamAnnouce()
        await examAnnoucePage.clickExamAnnouceTab()
        await examAnnoucePage.checkAnnouceCard('256806900900001','สมัครสอบข้อเขียน','วิชาเฉพาะ','เป็นผู้มีสิทธิ์สอบ')
        // await examAnnoucePage.checkAnnouceExpandDetail('685241111001','ห้องสอบวิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ','มกราคม 2569 เวลา 15:00 - 20:00','1')
    });


});