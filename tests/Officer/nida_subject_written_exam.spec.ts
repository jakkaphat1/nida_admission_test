import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/วิชาที่เปิดสอน', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 เมนูวิชาที่เปิดสอบข้อเขียน' , async ({ commonPage , subjectWrittenExam , page}) => {
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
    });
});