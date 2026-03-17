import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/การสมัครสอบวิชาเฉพาะ/ตรวจสอบและประกาศคะแนน', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 เมนูตรวจสอบและประกาศคะแนน' , async ({ commonPage , annouceWrittenExamScorePage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
    });

    test('TC-03 ทดสอบค้นหารายการสมัครสอบ' , async ({ commonPage,annouceWrittenExamScorePage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
        await annouceWrittenExamScorePage.fillSearchBox('วิชาเฉพาะ 2')
        await annouceWrittenExamScorePage.filterMoreOption({
            eduYear:'2568',
            semester:'ภาคการศึกษาที่ 2',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'9',
            status:'ใช้งาน'
        })
        await annouceWrittenExamScorePage.clickExpandDetailButtonByName('รอบที่ 9/2568 (ภาคการศึกษาที่ 2) - ระยะเวลารับสมัครเรียน (08/01/2569 - 08/01/2569)')
    });
});