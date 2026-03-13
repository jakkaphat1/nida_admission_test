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

    test('TC-03 ทดสอบค้นหาข้อมูลวิชาที่เปิดสอบข้อเขียนที่ยังไม่ประกาศรับสมัคร' , async ({ commonPage , subjectWrittenExam , page}) => {
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 1/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 13/03/2569)')).toBeVisible()
    });
});