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
    
    test('TC-04 ทดสอบเพิ่มข้อมูลศูนย์การศึกษา' , async ({ educationCenterInformationPage, page}) => {
        await educationCenterInformationPage.gotoPrograms();
        await educationCenterInformationPage.gotoEducationCenterMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/education-center/);
        await educationCenterInformationPage.clickAddEducationCentralButton()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/education-center\/create.*/);

        const centralEduBasicInfo = {
            centralEduID : 'PKT001',
            centralEduNameTH : 'ศูนย์การศึกษาจังหวัดภูเก็ต',
            centralEduNameEN : 'Phuket Educationi Center',
            centralEduNameCN : '',
            facultyName : 'GSEDA'
        }
        await educationCenterInformationPage.fillAddCentralEduInfoPage(centralEduBasicInfo)

        const centralEduAddessInfo = {
            centralEduAddress : 'วิทยาลัยอาชีวศึกษาภูเก็ต อาคารรัษฎา',
            centralEduProvince : 'ภูเก็ต',
            centralEduDistrict : 'เมืองภูเก็ต',
            centralEduSubDistrict : 'ตลาดใหญ่',
            centralEduZipCode: '83000',
            centralEduLatitude : '7.8949373638514',
            centralEduLongitude : '98.3768345189004',
        }
        await educationCenterInformationPage.fillAddFacultyAddressInfo(centralEduAddessInfo)

        const centralEduContactInfo = {
            centralEduTel : '02-123-24770',
            centralEduLineID : '',
            centralEduFacebook : 'ท่องเที่ยว นิด้า GSTM NIDA - PKT',
            centralEduEmail : 'gstm@nida.ac.th',
            centralEduWebsite : 'https://tour.nida.ac.th/th/',
            centralEduFirstOfficerName : 'นางสาวสิรินภา จงเกษกรณ์',
            centralEduFirstOfficerTel : '09-485-98905',
            centralEduSecondOfficerName : '',
            centralEduSecondOfficerTel : '',
        }
        await educationCenterInformationPage.fillAddFacultyContactInfo(centralEduContactInfo)
        await educationCenterInformationPage.handleStatusSlider('ใช้งาน')
        await educationCenterInformationPage.clickSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
    });
});