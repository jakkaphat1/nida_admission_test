import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/การสมัครสอบวิชาเฉพาะ/ข้อมูลรายชื่อผู้มีสิทธิ์สอบประจำวิชาเฉพาะ', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 เมนูข้อมูลรายชื่อผู้มีสิทธิ์สอบประจำวิชาเฉพาะ' , async ({ commonPage , eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await eligibleWrittenExamPage.gotoEligibleWrittenExamListMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-for-quiz-list.*/);
        await eligibleWrittenExamPage.checkEligibleWrittenExamMenu()
    });
});