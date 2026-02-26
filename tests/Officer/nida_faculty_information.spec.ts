import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ ข้อมูลคณะ', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage ,facultyInformationPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await facultyInformationPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });


    // ** ต้องข้ามไปก่อนเพราะว่ามี Priority แบบ Super Critical มี Effect ต่อ ๆ เป็นทอด ๆ
    // test('TC-02 ทดสอบไปที่เมนูข้อมูลคณะ' , async ({ facultyInformationPage, page}) => {
    //     await facultyInformationPage.gotoPrograms();
    //     await facultyInformationPage.gotoFacultyInformationMenu()
    //     await expect(page).toHaveURL(/.*admin\/admission\/master\/university-structure/);
    //     await facultyInformationPage.clickEditCampusInfoByCardName('สยาม')
    // });

    test('TC-03 ทดสอบเพิ่มคณะ' , async ({ facultyInformationPage, page}) => {
        await facultyInformationPage.gotoPrograms();
        await facultyInformationPage.gotoFacultyInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/university-structure/);
        await facultyInformationPage.clickAddFacultyButtonByCampusName('สยาม')
        await expect(page).toHaveURL(/.*admin\/admission\/master\/university-structure\/faculty-create.*/);

        const facultyInfoData = {
            facultyID : 'GSL-1',
            facultyIntial : 'นต.',
            facultyNameTH : 'คณะนิติศาสตร์',
            facultyNameEN : 'Graduate School of Law',
            facultyColour : '#740000',
        }
        await facultyInformationPage.fillAddFacultyInfoPage(facultyInfoData)

        const facultyLogo = 'lawlogo.png';
        await facultyInformationPage.fillAddFacultyImageInfo(facultyLogo)

        const facultyAddressInfo = {
            campusLocation : 'กำหนดเอง' as const,
            campusAddress : '888/55',
            campusProvince : 'กรุงเทพมหานคร' ,
            campusDistrict : 'ปทุมวัน' ,
            campusSubDistrict : 'ปทุมวัน',
            campusZipCode : '10330',
            campusLatitude : '7.894937',
            campusLongitude : '98.37683',
        }
        await facultyInformationPage.fillAddFacultyAddressInfo(facultyAddressInfo)

        const facultyContactInfo = {
            campusTel : '02-727-39334',
            campusLineID : '@LLMLawNIDA',
            campusFacebook : 'LawNIDA',
            campusEmail : 'schooloflaw@nida.ac.th',
            campusWebsite : 'https://law.nida.ac.th',
            campusFirstOfficerName : 'คุณธรณ์ธันย์ คะริบรัมย์',
            campusFirstOfficerTel : '08-279-01946',
        }
        await facultyInformationPage.fillAddFacultyContactInfo(facultyContactInfo)
        await facultyInformationPage.clickSaveButton()
        await expect(page.getByRole('heading' , {name:'บันทึกข้อมูลสำเร็จ'})).toBeVisible()
    });


});