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

    test('TC-05 ทดสอบอัปโหลดประกาศ' , async ({ commonPage , eligibleWrittenExamPage , page}) => {
        test.setTimeout(45000)
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
        await eligibleWrittenExamPage.clickUploadAnnoucementButtonByCard('รอบที่ 9/2568 (ภาคการศึกษาที่ 2)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-for-quiz-list\/upload-announcement.*/);
        await eligibleWrittenExamPage.checkUploadAnnoucementPage('เลือกวิชาที่ใช้อัปโหลดประกาศ','รายละเอียดข้อมูลห้องสอบ','แนบไฟล์ประกาศ')
        await eligibleWrittenExamPage.selectSubjectForAnnouce('วิชาเฉพาะ 2','วิชาเฉพาะ 9')
        const examRoomDetail = {
            examRoom1 : 'ทดสอบเพิ่มชื่อห้องสอบ',
            examDate1 : '17032569',
            examStart1 : '10:30',
            examEnd1 : '12:30',
            seat1:'A10-A15',
            addRoom:'Yes' as const,
            examRoom2 : 'ทดสอบเพิ่มชื่อห้องสอบ2',
            examDate2 : '17032569',
            examStart2 : '13:30',
            examEnd2 : '15:30',
            seat2:'A16-A20',
        }
        await eligibleWrittenExamPage.selectExamRoomDetail(examRoomDetail)
        const annouceFile = 'downloads/ตัวอย่างไฟล์ประกาศรายชื่อผู้มีสิทธิ์สอบข้อเขียน.pdf';
        await eligibleWrittenExamPage.uploadAnnouceFile(annouceFile)
        await eligibleWrittenExamPage.clickSaveButton()
        await eligibleWrittenExamPage.clickConfirmUploadAnnoucementPopup()
        await expect(page.getByText('อัปโหลดประกาศสำเร็จ')).toBeVisible()
    });

    test('TC-06 ทดสอบประกาศรายชื่อผู้มีสิทธิ์สอบ' , async ({ commonPage , eligibleWrittenExamPage , page}) => {
        test.setTimeout(45000)
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
        await eligibleWrittenExamPage.clickCheckboxForAnnouceEligibleListByCard('รอบที่ 9/2568')
        await eligibleWrittenExamPage.clickAnnouceEligibleList()
        await eligibleWrittenExamPage.clickConfirmEligibleAnnoucementPopup()
        await expect(page.getByText('ประกาศรายชื่อผู้มีสิทธิ์สอบสำเร็จ')).toBeVisible()
    });

    test('TC-07 ทดสอบแก้ไขประกาศ' , async ({ commonPage , eligibleWrittenExamPage , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await eligibleWrittenExamPage.gotoEligibleWrittenExamListMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-for-quiz-list.*/);
        await eligibleWrittenExamPage.checkEligibleWrittenExamMenu()
        await eligibleWrittenExamPage.clickAnnoucedTab()
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
        await eligibleWrittenExamPage.clickSeeAnnoucementButtonByCard('รอบที่ 9/2568 (ภาคการศึกษาที่ 2) - ระยะเวลารับสมัครเรียน (08/01/2569 - 08/01/2569)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-for-quiz-list\/view-announcement.*/);
        await eligibleWrittenExamPage.clickKebabButtonForEditAnnouceByNumber('17032026140624WpT')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-for-quiz-list\/edit-announcement.*/);
        await eligibleWrittenExamPage.selectEditSubjectToOpen('วิชาเฉพาะ 9')
        const examRoomDetail = {
            examRoom1 : 'ทดสอบแก้ไขชื่อห้องสอบ',
            examDate1 : '17032569',
            examStart1 : '10:30',
            examEnd1 : '12:30',
            seat1:'A01-A15',
            addRoom:'Yes' as const,
            examRoom2 : 'ทดสอบแก้ไขชื่อห้องสอบ2',
            examDate2 : '17032569',
            examStart2 : '14:30',
            examEnd2 : '16:30',
            seat2:'A16-A25',
        }
        await eligibleWrittenExamPage.deleteExamRoom('ข้อมูลห้องสอบที่ 2')
        await eligibleWrittenExamPage.editExamRoomDetail(examRoomDetail)
        await eligibleWrittenExamPage.clearFileUpload('ตัวอย่างไฟล์ประกาศรายชื่อผู้มีสิทธิ์สอบข้อเขียน_1773731184450.pdf')
        const annouceFile = 'downloads/ตัวอย่างไฟล์ประกาศรายชื่อผู้มีสิทธิ์สอบข้อเขียน.pdf';
        await eligibleWrittenExamPage.uploadAnnouceFile(annouceFile)
        await eligibleWrittenExamPage.clickSaveButton()
        await eligibleWrittenExamPage.clickConfirmUploadAnnoucementPopup()
        await expect(page.getByText('แก้ไขประกาศสำเร็จ')).toBeVisible()
    });
});