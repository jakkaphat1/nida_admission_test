import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ข้อมูลปฏิทินการรับสมัคร', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบการเข้าเมนูข้อมูลปฏิทินการรับสมัคร' , async ({ admissionCalendarInformationPage, page}) => {
        await admissionCalendarInformationPage.gotoPrograms()
        await admissionCalendarInformationPage.gotoAdmissionCalendarInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar/);
    });

    test('TC-03 ทดสอบค้นหาปฏิทิน' , async ({ admissionCalendarInformationPage, page}) => {
        await admissionCalendarInformationPage.gotoPrograms()
        await admissionCalendarInformationPage.gotoAdmissionCalendarInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar/);

        const searchInfo = {
            searchCalendarName:'ปฏิทินรับสมัคร ปี 2569 ครั้งที่ 4 ภาคการศึกษาที่ 1 ปริญญาโท ภาคปกติ',
            status:'ใช้งาน',
            round:'4',
            eduLevel : 'ปริญญาโท',
            studentType : 'ภาคปกติ',
            term : 'ภาคการศึกษาที่ 1',
            academicYear : '2569',
            display: 'แสดง' as const
        }

        await admissionCalendarInformationPage.searchByFilter(searchInfo)
        await expect(page.getByText('ปฏิทินรับสมัคร ปี 2569 ครั้งที่ 4 ภาคการศึกษาที่ 1 ปริญญาโท ภาคปกติ')).toBeVisible()
    });
});