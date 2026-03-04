import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ข้อมูลกำหนดการรับสมัคร', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage,educationCenterInformationPage , page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await educationCenterInformationPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    
});