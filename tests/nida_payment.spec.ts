import { test, expect } from '../fixtures/baseTest';

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
        // await paymentPage.clickPaymentWay('Bill Payment')
        // await paymentPage.clickPaidBtn()
        // await expect(page.getByRole('heading', { name: 'ยืนยันการเปลี่ยนช่องทางการชำระเงิน' })).toBeVisible()
        // await paymentPage.clickConfirmPopupBtn()
    });

    test('TC-04 ทดสอบเลือกช่องทางการขำระเงิน' , async ({ admissionPage , paymentPage, page}) => {
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

    test('TC-05.1 ทดสอบดูประวัติการขำระเงิน (1) ชำระเงินค่าธรรมเนียมการสมัครเรียนเเล้ว' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.gotoPrograms();
        await paymentPage.clickPaymentModule()
        await paymentPage.checkPaymentModule()
        await paymentPage.clickHistoryPaid()
        await expect(page).toHaveURL(/\/payment\/history/);
        await paymentPage.checkHistoryPaid()
        await paymentPage.checkPaidStatus('00006940002','ชำระเงินแล้ว')
        await paymentPage.checkExpandCardDetail('00006940002','200.00','Bill Payment','ผู้ดูแลระบบ 1 แอดมิน')
        
    });

    test('TC-05.2 ทดสอบดูประวัติการขำระเงิน (2) ยกเลิกการชำระเงินค่าธรรมเนียมการสมัคร' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.gotoPrograms();
        await paymentPage.clickPaymentModule()
        await paymentPage.checkPaymentModule()
        await paymentPage.clickHistoryPaid()
        await expect(page).toHaveURL(/\/payment\/history/);
        await paymentPage.checkHistoryPaid()
        await paymentPage.checkPaidStatus('00006940001','ยกเลิกการชำระเงิน')
        // await paymentPage.clickExpand('00006940001')
        await paymentPage.checkExpandCardDetail('00006940001','200.00','Bill Payment','ทดสอบ แอดมิชชั่น')
    });


});