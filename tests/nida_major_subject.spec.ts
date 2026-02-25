import { test, expect } from '../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ เมนูข้อมูลวิชาเอก', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage ,majorSubjectPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await majorSubjectPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบไปที่เมนูข้อมูลวิชาเอก' , async ({ majorSubjectPage, page}) => {
        await majorSubjectPage.gotoPrograms();
        await majorSubjectPage.gotoMajorSubjectMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/major/);
    });

    test('TC-03 ทดสอบค้นหาข้อมูลวิชาเอก' , async ({ majorSubjectPage, page}) => {
        await majorSubjectPage.gotoPrograms();
        await majorSubjectPage.gotoMajorSubjectMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/major/);
        await majorSubjectPage.fillSearchAndFilterBox('สาขาวิชาเอกการจัดการระบบสารสนเทศ','ใช้งาน','คณะสถิติประยุกต์')
    });


});