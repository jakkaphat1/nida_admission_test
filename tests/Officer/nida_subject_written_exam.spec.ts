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

    test('TC-05 ทดสอบแก้ไขข้อมูลวิชาที่เปิดสอบข้อเขียน' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'2',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            // status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 2/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 13/03/2569)')).toBeVisible()
        await subjectWrittenExam.clickEditByCard('รอบที่ 2/2570 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject\/detail.*/);
        await subjectWrittenExam.clickEditInfoButton()

        await subjectWrittenExam.fillEditWrittenExamPageStep1({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'3',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ'
        })
        await subjectWrittenExam.fillEditScheduleDates([
            {
                field: "วันที่เปิดรับสมัครสอบข้อเขียน",
                startDate: "13032569",
                endDate: "14032569",
            },
            {
                field: "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ",
                startDate: "13032569",
                endDate: "14032569",
            },
            {
                field: "วันที่สอบ",
                startDate: "13032569",
                endDate: "14032569",
            },
            {
                field: "วันประกาศผลสอบข้อเขียน",
                startDate: "13032569",
                endDate: "14032569",
            }
            
        ]);

        await subjectWrittenExam.clickSaveButton()
        await subjectWrittenExam.confirmSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
        await subjectWrittenExam.clickNextButton()

        await subjectWrittenExam.clickEditInfoButton()

        await subjectWrittenExam.fillEditWrittenExamPageStep2({
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

    test('TC-06 ทดสอบอัปโหลดประกาศวิชาที่เปิดสอบข้อเขียนที่ยังไม่ประกาศรับสมัคร' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'3',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            // status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 3/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 14/03/2569)')).toBeVisible()
        await subjectWrittenExam.clickUploadAnnoucementByCard('รอบที่ 3/2570 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject\/upload-announcement.*/);
        await subjectWrittenExam.checkUploadAnnoucementPage('วิชาเฉพาะ 2')
        await subjectWrittenExam.selectSubjectToOpen('วิชาเฉพาะ 2')
        const annouceFile = 'downloads/ตัวอย่างไฟล์ประกาศวิชาสมัครสอบข้อเขียนที่เปิดรับ.pdf';
        await subjectWrittenExam.uploadAnnouceFile(annouceFile)
        await subjectWrittenExam.clickSaveButton()
        await subjectWrittenExam.clickConfirmUploadAnnouceFilePopup()
    });

    test('TC-07 ทดสอบแก้ไขประกาศวิชาที่เปิดสอบข้อเขียนที่ยังไม่ประกาศรับสมัคร' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'3',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            // status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 3/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 14/03/2569)')).toBeVisible()
        await subjectWrittenExam.clickSeeAnnoucementButtonByCard('รอบที่ 3/2570 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject\/view-announcement.*/);
        await subjectWrittenExam.clickKebabButtonForEditAnnouceByNumber('13032026170728lJE')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject\/edit-announcement.*/);
        await subjectWrittenExam.selectEditSubjectToOpen('วิชาเฉพาะ 2')
        await subjectWrittenExam.clearFileUpload('ตัวอย่างไฟล์ประกาศวิชาสมัครสอบข้อเขียนที่เปิดรับ_1773396448434.pdf')
        const annouceFile = 'downloads/ตัวอย่างไฟล์ประกาศหลักสูตรที่เปิดรับ 2.pdf';
        await subjectWrittenExam.uploadAnnouceFile(annouceFile)
        await subjectWrittenExam.clickSaveButton()
        await subjectWrittenExam.clickConfirmEditUploadAnnouceFilePopup()
    });

    test('TC-08 ทดสอบดูประวัติการประกาศ' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'3',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            // status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 3/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 14/03/2569)')).toBeVisible()
        await subjectWrittenExam.clickSeeAnnoucementButtonByCard('รอบที่ 3/2570 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject\/view-announcement.*/);
        await subjectWrittenExam.clickKebabButtonForAnnouceHistoryByNumber('13032026170728lJE')
        await subjectWrittenExam.clickSeePDFinHistory()
        await subjectWrittenExam.clickClosePDFHistoryPopup()
    });

    test('TC-09 ทดสอบยกเลิกประกาศ' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'3',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            // status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 3/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 14/03/2569)')).toBeVisible()
        await subjectWrittenExam.clickSeeAnnoucementButtonByCard('รอบที่ 3/2570 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject\/view-announcement.*/);
        await subjectWrittenExam.clickKebabButtonForCancelAnnouceByNumber('13032026170728lJE')
        await subjectWrittenExam.clickConfirmCancelAnnoucePopup()
        await expect(page.getByRole('alert').filter({ hasText: 'บันทึกรายการเรียบร้อยแล้ว' })).toBeVisible()
        await subjectWrittenExam.clickBackToFirstPage()
    });

    test('TC-10 ทดสอบประกาศเปิดรับสมัครวิชาที่เปิดสอบข้อเขียนที่ยังไม่ประกาศรับสมัคร' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'3',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            // status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 3/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 14/03/2569)')).toBeVisible()
        await subjectWrittenExam.clickCheckboxForAnnouceApplicationByCard('รอบที่ 3/2570 (ภาคการศึกษาที่ 1)')
        await subjectWrittenExam.clickAnnouceApplication()
        await subjectWrittenExam.clickConfirmAnnouceApplcationCoursePopup()
    });

    test('TC-11 ทดสอบค้นหาข้อมูลวิชาที่เปิดสอบข้อเขียนที่ประกาศรับสมัครแล้ว' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.clickSubjectOpenedTab()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'3',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 3/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 14/03/2569)')).toBeVisible()
        
    });

    test('TC-12 ทดสอบอัปโหลดประกาศวิชาที่เปิดสอบข้อเขียนที่ประกาศรับสมัครแล้ว' , async ({ commonPage , subjectWrittenExam , page}) => {
        test.setTimeout(45000)
        await commonPage.gotoPrograms()
        await subjectWrittenExam.gotoSubjectWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject/);
        await subjectWrittenExam.checkSubjectWrittenExamMenu()
        await subjectWrittenExam.clickSubjectOpenedTab()
        await subjectWrittenExam.fillSearchBox('วิชาเฉพาะ 2')
        await subjectWrittenExam.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'3',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            status:'ใช้งาน'
        })
        await expect(page.getByText('รอบที่ 3/2570 (ภาคการศึกษาที่ 1) - ระยะเวลารับสมัครเรียน (13/03/2569 - 14/03/2569)')).toBeVisible()
        await subjectWrittenExam.clickUploadAnnoucementByCard('รอบที่ 3/2570 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/subject\/upload-announcement.*/);
        await subjectWrittenExam.checkUploadAnnoucementPage('วิชาเฉพาะ 2')
        await subjectWrittenExam.selectSubjectToOpen('วิชาเฉพาะ 2')
        const annouceFile = 'downloads/ตัวอย่างไฟล์ประกาศวิชาสมัครสอบข้อเขียนที่เปิดรับ.pdf';
        await subjectWrittenExam.uploadAnnouceFile(annouceFile)
        await subjectWrittenExam.clickSaveButton()
        await subjectWrittenExam.clickConfirmUploadAnnouceFilePopup()
    });
});