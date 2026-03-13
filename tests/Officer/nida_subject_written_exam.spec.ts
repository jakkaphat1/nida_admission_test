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

    test('TC-04 ทดสอบกำหนดข้อมูลวิชาที่เปิดสอบข้อเขียน' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(40000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.addSubjectWrittenExamButton()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject\/create.*/);
        await subjectWrittenExam.fillAddWrittenExamPageStep1({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'2',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ'
        })
        await subjectWrittenExam.handleStatusToggle('ใช้งาน')
        await subjectWrittenExam.fillScheduleDates([
            {
                field: "วันที่เปิดรับสมัครสอบข้อเขียน",
                startDate: "13032569",
                endDate: "13032569",
            },
            {
                field: "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ",
                startDate: "13032569",
                endDate: "13032569",
            },
            {
                field: "วันที่สอบ",
                startDate: "13032569",
                endDate: "13032569",
            },
            {
                field: "วันประกาศผลสอบข้อเขียน",
                startDate: "13032569",
                endDate: "13032569",
            }
            
        ]);
        await subjectWrittenExam.clickSaveButton()
        await subjectWrittenExam.confirmSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
        await subjectWrittenExam.clickNextButton()

        await subjectWrittenExam.fillAddWrittenExamPageStep2({
            subject:'วิชาเฉพาะ 2' ,
            changeDate:'Yes' as const,
            startDate:'13032569' ,
            endDate:'14032569' ,
            fee:'FF00000045'
        })
        await subjectWrittenExam.clickSaveButton()
        await subjectWrittenExam.clickConfirmSave()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
    });
});