import { test, expect } from '../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ เมนูข้อมูลสาขาวิชา', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage ,departmentInformationPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await departmentInformationPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบไปที่เมนูข้อมูลสาขาวิชา' , async ({ departmentInformationPage, page}) => {
        await departmentInformationPage.gotoPrograms();
        await departmentInformationPage.gotoSubjectFieldMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/subject-field/);

        const searchData = {
            searchRole:'สาขาวิชานิเทศศาสตร์และนวัตกรรม',
            status: 'ใช้งาน' as const,
            facultyName:'GSCM - คณะนิเทศศาสตร์',
        }
        await departmentInformationPage.fillSearchAndFilterBox(searchData)
    });

    

});