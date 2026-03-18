import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/การสมัครเรียน/ข้อมูลรายชื่อผู้มีสิทธิ์สอบประจำโครงการ', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 เมนูตรวจสอบใบสมัครเรียน' , async ({ commonPage , eligibleLearningPage , page}) => {
        await commonPage.gotoPrograms()
        await eligibleLearningPage.gotoEligibleLearningMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-candidates-list-for-program/);
        await eligibleLearningPage.checkLearningEligibleMenu()
    });

    test('TC-03 ทดสอบค้นหารายการหลักสูตรที่เปิดสมัครเรียน' , async ({ commonPage , eligibleLearningPage , page}) => {
        await commonPage.gotoPrograms()
        await eligibleLearningPage.gotoEligibleLearningMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-candidates-list-for-program/);
        await eligibleLearningPage.checkLearningEligibleMenu()

        // await eligibleLearningPage.fillSearchBox('วิชาเฉพาะ 2')
        await eligibleLearningPage.clickStatusByKeyword('ใช้งาน')
        await eligibleLearningPage.filterMoreOption({
            eduYear:'2569',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:undefined,
        })
        await eligibleLearningPage.clickExpandDetailButtonByName('รอบที่ 7/2569')
    });

    test('TC-04 ทดสอบนำออกรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' , async ({ commonPage , eligibleLearningPage , page}) => {
        await commonPage.gotoPrograms()
        await eligibleLearningPage.gotoEligibleLearningMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-candidates-list-for-program/);
        await eligibleLearningPage.checkLearningEligibleMenu()
        await eligibleLearningPage.clickAnyTabByKeyword('ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ')
        // await eligibleLearningPage.fillSearchBox('วิชาเฉพาะ 2')
        await eligibleLearningPage.clickStatusByKeyword('ใช้งาน')
        await eligibleLearningPage.filterMoreOption({
            eduYear:'2569',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ',
            round:'1',
        })
        await eligibleLearningPage.clickExpandDetailButtonByName('รอบที่ 1/2569 (ภาคการศึกษาที่ 1)')
        await eligibleLearningPage.clickVerifyDetailButtonByCard('รอบที่ 1/2569 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-candidates-list-for-program\/detail.*/);
        await eligibleLearningPage.checkEligibleStudentDetailPage('รอบที่ 1/2569')
        await eligibleLearningPage.fillSearchEligibleLearningStudent('ทดสอบ')
        const searchInput = {
            status:undefined, 
            faculty:'คณะบริหารธุรกิจ',
            course:'บริหารธุรกิจมหาบัณฑิต',
            program:'บริหารธุรกิจ ภาคปกติ 01'
        }
        await eligibleLearningPage.filterEligibleSearchOption(searchInput)
        await eligibleLearningPage.clickExpandDetailButtonByCourse('บริหารธุรกิจ ภาคปกติ 01 ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร ครั้งที่ 1 ปี 2569')
        await eligibleLearningPage.clickCheckboxBySubject('บริหารธุรกิจ ภาคปกติ 01 ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร ครั้งที่ 1 ปี 2569')
        await eligibleLearningPage.clickExportButton()
        await eligibleLearningPage.handleExportPopup()
        await commonPage.clickBackToFirstPage()
    });

    test('TC-05 ทดสอบอัปโหลดประกาศ' , async ({ commonPage , eligibleLearningPage , page}) => {
        await commonPage.gotoPrograms()
        await eligibleLearningPage.gotoEligibleLearningMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-candidates-list-for-program/);
        await eligibleLearningPage.checkLearningEligibleMenu()
        // await eligibleLearningPage.clickAnyTabByKeyword('ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ')
        // await eligibleLearningPage.fillSearchBox('วิชาเฉพาะ 2')
        await eligibleLearningPage.clickStatusByKeyword('ใช้งาน')
        await eligibleLearningPage.filterMoreOption({
            eduYear:'2569',
            // semester:'ภาคการศึกษาที่ 1',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            round:'7',
        })
        await eligibleLearningPage.clickExpandDetailButtonByName('รอบที่ 7/2569 (ภาคการศึกษาที่ 1)')
        await eligibleLearningPage.clickUploadAnnoucementButtonByCard('รอบที่ 7/2569 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-candidates-list-for-program\/upload-announcement.*/);
        await eligibleLearningPage.checkUploadAnnoucementPage('เลือกโครงการที่ใช้อัปโหลดประกาศ','รายละเอียดข้อมูลห้องสอบ','แนบไฟล์ประกาศ')
        await eligibleLearningPage.selectFacultyForAnnouce('คณะสถิติประยุกต์')
        const examRoomDetail = {
            examRoom1 : 'ทดสอบเพิ่มชื่อห้องสอบ',
            examDate1 : '19032569',
            examStart1 : '10:30',
            examEnd1 : '12:30',
            seat1:'A10-A15',
            addRoom:'Yes' as const,
            examRoom2 : 'ทดสอบเพิ่มชื่อห้องสอบ2',
            examDate2 : '19032569',
            examStart2 : '13:30',
            examEnd2 : '15:30',
            seat2:'A16-A20',
        }
        await eligibleLearningPage.selectExamRoomDetail(examRoomDetail)
        const annouceFile = 'downloads/ตัวอย่างไฟล์ประกาศรายชื่อผู้มีสิทธิ์สมัครเรียน.pdf';
        await eligibleLearningPage.uploadAnnouceFile(annouceFile)
        await eligibleLearningPage.clickSaveButton()
        await eligibleLearningPage.clickConfirmUploadAnnoucementPopup()
        await expect(page.getByText('อัปโหลดประกาศสำเร็จ')).toBeVisible()
    });

    test('TC-06 ทดสอบประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' , async ({ commonPage , eligibleLearningPage , page}) => {
        await commonPage.gotoPrograms()
        await eligibleLearningPage.gotoEligibleLearningMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/eligible-candidates-list-for-program/);
        await eligibleLearningPage.checkLearningEligibleMenu()
        // await eligibleLearningPage.clickAnyTabByKeyword('ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ')
        // await eligibleLearningPage.fillSearchBox('วิชาเฉพาะ 2')
        await eligibleLearningPage.clickStatusByKeyword('ใช้งาน')
        await eligibleLearningPage.filterMoreOption({
            eduYear:'2569',
            // semester:'ภาคการศึกษาที่ 1',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ',
            round:'7',
        })
        await eligibleLearningPage.clickExpandDetailButtonByName('รอบที่ 7/2569 (ภาคการศึกษาที่ 1)')
        await eligibleLearningPage.clickCheckboxForAnnouceEligibleListByCard('รอบที่ 7/2569 (ภาคการศึกษาที่ 1)')
        await eligibleLearningPage.clickAnnouceEligibleList()
        await eligibleLearningPage.clickConfirmEligibleAnnoucementPopup()
        await expect(page.getByText('ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการสำเร็จ')).toBeVisible()
    });
});