import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ข้อมูลกำหนดการรับสมัคร', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage,admissionScheduleInformationPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบการเข้าเมนูข้อมูลประเภทกำหนดการ' , async ({ admissionScheduleInformationPage, page}) => {
        await admissionScheduleInformationPage.gotoPrograms()
        await admissionScheduleInformationPage.gotoAdmissionScheduleInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities/);
    });

    test('TC-03 ทดสอบค้นหาข้อมูลประเภทกำหนดการ' , async ({ admissionScheduleInformationPage, page}) => {
        await admissionScheduleInformationPage.gotoPrograms()
        await admissionScheduleInformationPage.gotoAdmissionScheduleInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities/);
        const searchArguement = {
            searchEventName:'วันประกาศผลสอบข้อเขียน',
            status:'ใช้งาน',
            eventType:'AMS-วันประกาศผลสอบข้อเขียน'
        }
        await admissionScheduleInformationPage.searchByFilter(searchArguement)
        await expect(page.getByText('วันประกาศผลสอบข้อเขียน', {exact:true})).toBeVisible()
    });

    test('TC-04 ทดสอบสร้างประเภทกำหนดการ' , async ({ admissionScheduleInformationPage, page}) => {
        await admissionScheduleInformationPage.gotoPrograms()
        await admissionScheduleInformationPage.gotoAdmissionScheduleInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities/);
        await admissionScheduleInformationPage.clickAddScheduleButton()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities\/create.*/);
        await admissionScheduleInformationPage.checkAddSchedulePage()
        const addShecduleInfo = {
            scheduleNameTH : 'วันประกาศผลสอบข้อเขียน' ,
            scheduleNameEN : 'Schedule for Written Exam' ,
            scheduleOption : 'AMS-วันประกาศผลสอบข้อเขียน'
        }
        await admissionScheduleInformationPage.fillInfoAddSchedulePage(addShecduleInfo)
        await admissionScheduleInformationPage.clickSaveButton()
        await expect(page.getByRole('heading', {name:'บันทึกข้อมูลสำเร็จ'})).toBeVisible()
    });
});