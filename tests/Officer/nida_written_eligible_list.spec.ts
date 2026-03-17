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

    test('TC-03 ทดสอบค้นหารายการเปิดสอบข้อเขียน' , async ({ commonPage , eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await eligibleWrittenExamPage.gotoEligibleWrittenExamListMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-for-quiz-list.*/);
        await eligibleWrittenExamPage.checkEligibleWrittenExamMenu()
        await eligibleWrittenExamPage.fillSearchBox('วิชาเฉพาะ 2')
        await eligibleWrittenExamPage.filterMoreOption({
            eduYear:'2568',
            semester:'ภาคการศึกษาที่ 2',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'4',
            status:'ใช้งาน'
        })
        await eligibleWrittenExamPage.clickExpandDetailButtonByName('รอบที่ 4/2568')
    });

    test('TC-04 ทดสอบนำออกรายชื่อผู้มีสิทธิ์สอบ' , async ({ commonPage , eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await eligibleWrittenExamPage.gotoEligibleWrittenExamListMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-for-quiz-list.*/);
        await eligibleWrittenExamPage.checkEligibleWrittenExamMenu()
        await eligibleWrittenExamPage.fillSearchBox('วิชาเฉพาะ 2')
        await eligibleWrittenExamPage.filterMoreOption({
            // eduYear:'2568',
            // semester:'ภาคการศึกษาที่ 2',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            round:'9',
            // status:'ใช้งาน'
        })
        await eligibleWrittenExamPage.clickExpandDetailButtonByName('รอบที่ 9/2568')
        await eligibleWrittenExamPage.clickVerifyDetailButtonByCard('รอบที่ 9/2568 (ภาคการศึกษาที่ 2)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-for-quiz-list\/detail.*/);
        await eligibleWrittenExamPage.checkEligibleStudentDetailPage('รอบที่ 9/2568','ภาคการศึกษาที่ 2','วิชาเฉพาะ 2 ครั้งที่ 9 ปี 2568','วิชาเฉพาะ 9 ครั้งที่ 9 ปี 2568')
        await eligibleWrittenExamPage.fillSearchEligibleWrittenExamStudent('ทดสอบ')
        await page.waitForTimeout(2000)
        await eligibleWrittenExamPage.filterEligibleSearchOption('วิชาเฉพาะ 2','ยังไม่นำออก')
        await eligibleWrittenExamPage.clickExpandDetailButtonBySubject('วิชาเฉพาะ 2 ครั้งที่ 9')
        await eligibleWrittenExamPage.clickCheckboxBySubject('วิชาเฉพาะ 2 ครั้งที่ 9 ปี 2568')
        await eligibleWrittenExamPage.clickExportButton()
        await eligibleWrittenExamPage.handleExportType('pdf')
        await commonPage.clickBackToFirstPage()
    });
});