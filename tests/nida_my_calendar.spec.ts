import { test, expect } from '../fixtures/baseTest';

test.describe('NIDA Admission Test Suite - ประกาศผลของฉัน' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage , paymentPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบดูปฏิทินของฉัน' , async ({ admissionPage , myCalendarPage, page}) => {
        await admissionPage.gotoPrograms();
        await myCalendarPage.clickMyCalendarMenu();
        await expect(page).toHaveURL(/.*my-calendar/);
        await myCalendarPage.checkMyCalendarLandingPage()
        await myCalendarPage.selectMonthYearDropdown('ก.พ. 2569')
        await myCalendarPage.selectMonthYear('มีนาคม')
    });

    
});