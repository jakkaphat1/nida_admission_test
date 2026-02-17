import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';
import { CourseAndProgramInformationPage } from '../pages/CourseAndProgramInformationPage';
import { DocumentRequirementPage } from '../pages/DocumentRequirementsPage';
import { PaymentPage } from '../pages/PaymentPage'
import path from 'path';

test.describe('NIDA Admission Test Suite' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบตรวจสอบรายการชำระเงินที่ค้างชำระ' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.gotoPrograms();
        await paymentPage.clickPaymentModule()
        await paymentPage.checkPaymentModule()
        await paymentPage.clickToBePaid()
        await expect(page).toHaveURL(/\/payment\/paid/);
        await paymentPage.checkPaymentCard('00006940001')
        await paymentPage.clickChangePaymentGateWayByCard('00006940001')
    });

    test('TC-03 ทดสอบชำระเงิน' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.gotoPrograms();
        await paymentPage.clickPaymentModule()
        await paymentPage.checkPaymentModule()
        await paymentPage.clickToBePaid()
        await expect(page).toHaveURL(/\/payment\/paid/);
        await paymentPage.checkPaymentCard('00006940001')
        await paymentPage.clickChangePaymentGateWayByCard('00006940001')
        await paymentPage.clickPaymentWay('Bill Payment')
        await paymentPage.clickPaidBtn()
        await expect(page.getByRole('heading', { name: 'ยืนยันการเปลี่ยนช่องทางการชำระเงิน' })).toBeVisible()
        await paymentPage.clickConfirmPopupBtn()
    });


});