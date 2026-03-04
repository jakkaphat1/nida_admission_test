import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ข้อมูลปฏิทินการรับสมัคร', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    
});