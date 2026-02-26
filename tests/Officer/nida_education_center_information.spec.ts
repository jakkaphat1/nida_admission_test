import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/เมนูข้อมูลศูนย์การศึกษา', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage,educationCenterInformationPage , page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await educationCenterInformationPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบไปที่เมนูข้อมูลศูนย์การศึกษา' , async ({ educationCenterInformationPage, page}) => {
        await educationCenterInformationPage.gotoPrograms();
        await educationCenterInformationPage.gotoEducationCenterMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/education-center/);
    });

    test('TC-03 ทดสอบค้นหาข้อมูลศูนย์การศึกษา' , async ({ educationCenterInformationPage, page}) => {
        await educationCenterInformationPage.gotoPrograms();
        await educationCenterInformationPage.gotoEducationCenterMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/education-center/);
        const searchData = {
            searchInput:'BKK10',
            status:'ใช้งาน' as const,
            provinceName:'กรุงเทพมหานคร',
            facultyName:'GSBA - คณะบริหารธุรกิจ',
        }
        await educationCenterInformationPage.fillSearchAndFilterBox(searchData)
        await expect(page.getByText('ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร - Bangkok Education Center')).toBeVisible()
    });
    

});