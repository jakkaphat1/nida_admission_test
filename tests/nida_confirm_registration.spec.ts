import { test, expect } from '../fixtures/baseTest';

test.describe('NIDA Admission Test Suite - ยืนยันสิทธิ์เข้าศึกษา' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    
});