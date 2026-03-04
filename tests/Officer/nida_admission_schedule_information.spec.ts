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
            scheduleNameTH : 'วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)' ,
            scheduleNameEN : '' ,
            scheduleOption : 'AMS_SC-วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)'
        }
        await admissionScheduleInformationPage.fillInfoAddSchedulePage(addShecduleInfo)
        await admissionScheduleInformationPage.clickSaveButton()
        await expect(page.getByRole('heading', {name:'บันทึกข้อมูลสำเร็จ'})).toBeVisible()
        await page.waitForTimeout(2000)
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities\/create.*/);
    });

    test('TC-05 ทดสอบแก้ไขประเภทกำหนดการ' , async ({ admissionScheduleInformationPage, page}) => {
        await admissionScheduleInformationPage.gotoPrograms()
        await admissionScheduleInformationPage.gotoAdmissionScheduleInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities/);
        const searchArguement = {
            searchEventName:'วันประกาศรายชื่อและสถานที่สอบข้อเขียน',
            eventType:'AMS_SC-วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)'
        }
        await admissionScheduleInformationPage.searchByFilter(searchArguement)
        await expect(page.getByText('วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)', {exact:true})).toBeVisible()
        await admissionScheduleInformationPage.clickEditScheduleButtonByName('วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)')
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities\/edit.*/);

        const editShecduleInfo = {
            scheduleNameTH : 'วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)' ,
            scheduleNameEN : 'Date and location of the written exam (central subjects) announcement.' ,
            scheduleOption : 'AMS_SC-วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)'
        }
        await admissionScheduleInformationPage.fillInfoEditSchedulePage(editShecduleInfo)
        await admissionScheduleInformationPage.clickSaveButton()
        await expect(page.getByRole('heading', {name:'บันทึกข้อมูลสำเร็จ'})).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities.*/);
    });

    test('TC-06 ทดสอบลบประเภทกำหนดการ' , async ({ admissionScheduleInformationPage, page}) => {
        await admissionScheduleInformationPage.gotoPrograms()
        await admissionScheduleInformationPage.gotoAdmissionScheduleInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities/);
        const searchArguement = {
            searchEventName:'วันประกาศรายชื่อและสถานที่สอบข้อเขียน',
            eventType:'AMS_SC-วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)'
        }
        await admissionScheduleInformationPage.searchByFilter(searchArguement)
        await expect(page.getByText('วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)', {exact:true})).toBeVisible()
        await admissionScheduleInformationPage.clickDeleteScheduleButtonByName('วันประกาศรายชื่อและสถานที่สอบข้อเขียน(วิชาส่วนกลาง)')
        await expect(page.getByText('ต้องการลบข้อมูล', {exact:true})).toBeVisible()
        await admissionScheduleInformationPage.clickConfirmDelete()
        await expect(page.getByText('ลบข้อมูลสำเร็จ', {exact:true})).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/activities/);
    });
});