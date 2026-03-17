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

    test('TC-04 ทดสอบตรวจสอบและกรอกคะแนน' , async ({ commonPage,annouceWrittenExamScorePage,eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
        // await annouceWrittenExamScorePage.fillSearchBox('วิชาเฉพาะ 2')
        await annouceWrittenExamScorePage.filterMoreOption({
            eduYear:'2570',
            // semester:'ภาคการศึกษาที่ 1',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            round:'4',
            status:'ใช้งาน'
        })
        await annouceWrittenExamScorePage.clickExpandDetailButtonByName('รอบที่ 4/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (17/03/2569 - 03/04/2569)')
        await annouceWrittenExamScorePage.clickVerifyDetailButtonByCard('รอบที่ 4/2570 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score\/detail.*/);
        await annouceWrittenExamScorePage.checkStudentScoreDetailPage('รอบที่ 4/2570','ภาคการศึกษาที่ 1')
        await eligibleWrittenExamPage.fillSearchEligibleWrittenExamStudent('ทดสอบ')
        await eligibleWrittenExamPage.filterEligibleSearchOption('วิชาเฉพาะ 2')
        await eligibleWrittenExamPage.clickExpandDetailButtonBySubject('วิชาเฉพาะ 2 ครั้งที่ 4 ปี 2570')
        await annouceWrittenExamScorePage.clickCheckandAddStudentScoreButton()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score\/score.*/);
        await annouceWrittenExamScorePage.checkAddStudentScoreDetailPage(
            'Specialized Subject 2 ครั้งที่ 4 ปี 2570','วันที่เปิดรับ : 17/03/2569 - 03/04/2569','รหัสใบสมัครสอบ','ชื่อ-นามสกุล','วิชาที่ยื่นสมัคร','ครั้งที่สมัคร','ปีที่สมัคร','คะแนนสอบ'
            ,'หมายเหตุการสอบ','สถานะการประกาศคะแนนรายบุคคล')
        await annouceWrittenExamScorePage.fillStraightSpecialSubjectScoreByApplicationID('70419002001','550')
        await annouceWrittenExamScorePage.clickInputScoreByFileButton()
        const fileInput = 'downloads/ตัวอย่างไฟล์สำหรับการกรอกคะแนนสอบข้อเขียนด้วยไฟล์.xlsx';
        await annouceWrittenExamScorePage.fillSpecialSubjectScoreByFile(fileInput)
        await annouceWrittenExamScorePage.clickConfirmImportScoreFile()
        await annouceWrittenExamScorePage.clickConfirmImportScoreFilePopup()
    });

    test('TC-06 ทดสอบประกาศคะแนน' , async ({ commonPage,annouceWrittenExamScorePage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
        await annouceWrittenExamScorePage.fillSearchBox('วิชาเฉพาะ 2')
        await annouceWrittenExamScorePage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'4',
            status:'ใช้งาน'
        })
        await annouceWrittenExamScorePage.clickCheckboxForAnnouceScoreListByCard('รอบที่ 4/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (17/03/2569 - 03/04/2569)')
        await annouceWrittenExamScorePage.clickAnnouceScoreList()
        await annouceWrittenExamScorePage.clickConfirmScoreAnnoucementPopup()
        await expect(page.getByText('ประกาศผลคะแนนสำเร็จ')).toBeVisible()
    });

    test('TC-07 ทดสอบอัปโหลดประกาศ' , async ({ commonPage,annouceWrittenExamScorePage,eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
        await annouceWrittenExamScorePage.clickAnnoucedTab()
        await annouceWrittenExamScorePage.fillSearchBox('วิชาเฉพาะ 2')
        await annouceWrittenExamScorePage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'4',
            status:'ใช้งาน'
        })
        await eligibleWrittenExamPage.clickUploadAnnoucementButtonByCard('รอบที่ 4/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (17/03/2569 - 03/04/2569)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score\/upload-announcement.*/);
        await annouceWrittenExamScorePage.checkUploadAnnoucementPage('เลือกวิชาที่ใช้อัปโหลดประกาศ','แนบไฟล์ประกาศ')
        await annouceWrittenExamScorePage.selectSubjectForAnnouce('วิชาเฉพาะ 2','วิชาเฉพาะ 9')
        const annouceFile = 'downloads/ตัวอย่างไฟล์สำหรับการประกาศคะแนนสอบข้อเขียน(วิชาเฉพาะ 9 และ 2).pdf';
        await annouceWrittenExamScorePage.uploadAnnouceFile(annouceFile)
        await annouceWrittenExamScorePage.clickSaveButton()
        await annouceWrittenExamScorePage.clickConfirmUploadAnnoucementPopup()
        await expect(page.getByText('อัปโหลดประกาศสำเร็จ')).toBeVisible()
    });

    test('TC-08 ทดสอบแก้ไขประกาศ' , async ({ commonPage,annouceWrittenExamScorePage,eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
        await annouceWrittenExamScorePage.clickAnnoucedTab()
        await annouceWrittenExamScorePage.fillSearchBox('วิชาเฉพาะ 2')
        await annouceWrittenExamScorePage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'4',
            status:'ใช้งาน'
        })
        await annouceWrittenExamScorePage.clickSeeAnnoucementButtonByCard('รอบที่ 4/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (17/03/2569 - 03/04/2569)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score\/view-announcement.*/);
        await annouceWrittenExamScorePage.clickKebabButtonForEditAnnouceByNumber('17032026225243acz')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score\/edit-announcement.*/);
        await annouceWrittenExamScorePage.selectEditSubjectToOpen('วิชาเฉพาะ 9')
        await annouceWrittenExamScorePage.clearFileUpload('ตัวอย่างไฟล์สำหรับการประกาศคะแนนสอบข้อเขียน(วิชาเฉพาะ 9 และ 2)_1773762763284.pdf')
        const annouceFile = 'downloads/ตัวอย่างไฟล์สำหรับการประกาศคะแนนสอบข้อเขียน(วิชาเฉพาะ 9 และ 2).pdf';
        await annouceWrittenExamScorePage.uploadAnnouceFile(annouceFile)
        await annouceWrittenExamScorePage.clickSaveButton()
        await annouceWrittenExamScorePage.clickConfirmUploadAnnoucementPopup()
        await expect(page.getByText('แก้ไขประกาศสำเร็จ')).toBeVisible()
    });

    test('TC-08.2 ทดสอบดูไฟล์ประกาศ' , async ({ commonPage,annouceWrittenExamScorePage,eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
        await annouceWrittenExamScorePage.clickAnnoucedTab()
        await annouceWrittenExamScorePage.fillSearchBox('วิชาเฉพาะ 2')
        await annouceWrittenExamScorePage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'4',
            status:'ใช้งาน'
        })
        await annouceWrittenExamScorePage.clickSeeAnnoucementButtonByCard('รอบที่ 4/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (17/03/2569 - 03/04/2569)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score\/view-announcement.*/);
        await annouceWrittenExamScorePage.clickPDFButtonForViewAnnouceByNumber('17032026225243acz')
    });

    test('TC-09 ทดสอบดูประวัติการประกาศ' , async ({ commonPage,annouceWrittenExamScorePage,eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
        await annouceWrittenExamScorePage.clickAnnoucedTab()
        await annouceWrittenExamScorePage.fillSearchBox('วิชาเฉพาะ 2')
        await annouceWrittenExamScorePage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'4',
            status:'ใช้งาน'
        })
        await annouceWrittenExamScorePage.clickSeeAnnoucementButtonByCard('รอบที่ 4/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (17/03/2569 - 03/04/2569)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score\/view-announcement.*/);
        await annouceWrittenExamScorePage.clickKebabButtonForAnnouceHistoryByNumber('17032026225243acz')
        await annouceWrittenExamScorePage.clickSeePDFinHistory()
        await annouceWrittenExamScorePage.clickClosePDFHistoryPopup()
    });

    test('TC-10 ทดสอบยกเลิกประกาศ' , async ({ commonPage,annouceWrittenExamScorePage,eligibleWrittenExamPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceWrittenExamScorePage.gotoAnnouceWrittenExamScoreMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score.*/);
        await annouceWrittenExamScorePage.checkAnnouceWrittenExamScoreMenu()
        await annouceWrittenExamScorePage.clickAnnoucedTab()
        await annouceWrittenExamScorePage.fillSearchBox('วิชาเฉพาะ 2')
        await annouceWrittenExamScorePage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'4',
            status:'ใช้งาน'
        })
        await annouceWrittenExamScorePage.clickSeeAnnoucementButtonByCard('รอบที่ 4/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (17/03/2569 - 03/04/2569)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/student-score\/view-announcement.*/);
        await annouceWrittenExamScorePage.clickKebabButtonForCancelAnnouceByNumber('17032026225243acz')
        await annouceWrittenExamScorePage.clickConfirmCancelAnnoucePopup()
        await expect(page.getByRole('alert').filter({ hasText: 'บันทึกรายการเรียบร้อยแล้ว' }).last()).toBeVisible()
    });
});