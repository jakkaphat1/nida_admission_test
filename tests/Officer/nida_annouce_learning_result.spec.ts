import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/การสมัครเรียน/ตรวจสอบและประกาศผลการคัดเลือก', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 เมนูตรวจสอบและประกาศผลการคัดเลือก' , async ({ commonPage , annouceLearningResultPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceLearningResultPage.gotoAnnouceLearningResultMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/selection-results-announcement.*/);
        await annouceLearningResultPage.checkAnnouceLearningResultMenu()
    });

    test('TC-03 ทดสอบค้นหารายการหลักสูตรสมัครเรียน' , async ({ commonPage , annouceLearningResultPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceLearningResultPage.gotoAnnouceLearningResultMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/selection-results-announcement.*/);
        await annouceLearningResultPage.checkAnnouceLearningResultMenu()
        await annouceLearningResultPage.fillSearchBox('สถิติ')
        await annouceLearningResultPage.filterMoreOption({
            eduYear:'2569',
            semester:'ภาคการศึกษาที่ 2',
            round:'1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ' 
        })
        await annouceLearningResultPage.highlightDetailButtonByName('รอบที่ 1/2569')
    });

    test('TC-04.1 ทดสอบตรวจสอบและประกาศผลการคัดเลือก|(1) กรณีผู้สมัคร ปกติและประสบการณ์', async ({ commonPage , annouceLearningResultPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceLearningResultPage.gotoAnnouceLearningResultMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/selection-results-announcement.*/);
        await annouceLearningResultPage.checkAnnouceLearningResultMenu()
        // await annouceLearningResultPage.fillSearchBox('สถิติ')
        await annouceLearningResultPage.filterMoreOption({
            eduYear:'2568',
            semester:'ภาคการศึกษาที่ 2',
            round:'4',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ' 
        })
        await annouceLearningResultPage.highlightDetailButtonByName('รอบที่ 4/2568')
        await annouceLearningResultPage.clickVerifyDetailButtonByCard('รอบที่ 4/2568')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/selection-results-announcement\/detail.*/);
        await annouceLearningResultPage.checkStudentScoreDetailPage('รอบที่ 4/2568','ภาคการศึกษาที่ 2','วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI) ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร ครั้งที่ 4 ปี 2568')
        await annouceLearningResultPage.fillSearchEligibleLearningStudent('ทดสอบ')
        await annouceLearningResultPage.filterEligibleSearchOption({
            status:'รอนำออก', faculty:'สถิติประยุกต์' , course:'หลักสูตรวิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ' , program:'วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI)'
        })
        await annouceLearningResultPage.clickExpandDetailButtonByCard('วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI) ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร ครั้งที่ 4 ปี 2568')
        await annouceLearningResultPage.clickCheckandAddStudentResultButtonByCard('วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI) ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร ครั้งที่ 4 ปี 2568')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/selection-results-announcement\/.*/);
        await annouceLearningResultPage.handleEditStudentResultButton()
        // await annouceLearningResultPage.selectLearningExamResult('684241122001','ผ่าน')
        // await annouceLearningResultPage.selectLearningExamResult('684241122002','ไม่ผ่าน')
        await annouceLearningResultPage.editLearningExamResult('684241122001','ผ่าน')
        await annouceLearningResultPage.editLearningExamResult('684241122002','ไม่ผ่าน')
        await annouceLearningResultPage.clickSaveButton()
        await annouceLearningResultPage.clickNextButton()
        await annouceLearningResultPage.handleEditStudentResultButton2()
        await annouceLearningResultPage.clickSaveButton()
        await annouceLearningResultPage.clickExportButton()
    });

    test('TC-04.2 ทดสอบตรวจสอบและประกาศผลการคัดเลือก|(2) กรณีผู้สมัครทุน', async ({ commonPage , annouceLearningResultPage , page}) => {
        await commonPage.gotoPrograms()
        await annouceLearningResultPage.gotoAnnouceLearningResultMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/selection-results-announcement.*/);
        await annouceLearningResultPage.checkAnnouceLearningResultMenu()
        // await annouceLearningResultPage.fillSearchBox('สถิติ')
        await annouceLearningResultPage.filterMoreOption({
            eduYear:'2568',
            semester:'ภาคการศึกษาที่ 1',
            round:'1',
            // eduLevel:'ปริญญาโท',
            studentType:'นานาชาติ' 
        })
        await annouceLearningResultPage.highlightDetailButtonByName('รอบที่ 1/2568')
        await annouceLearningResultPage.clickVerifyDetailButtonByCard('รอบที่ 1/2568')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/selection-results-announcement\/detail.*/);
        await annouceLearningResultPage.checkStudentScoreDetailPage('รอบที่ 1/2568','ภาคการศึกษาที่ 1','ภาษาอังกฤษศึกษาและการสอนภาษาอังกฤษ นักศึกษาไทย (นานาชาติ) ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร ครั้งที่ 1 ปี 2568')
        await annouceLearningResultPage.fillSearchEligibleLearningStudent('ทดสอบ')
        await annouceLearningResultPage.filterEligibleSearchOption({
            status:'รอนำออก', faculty:undefined , course:undefined , program:undefined
        })
        await annouceLearningResultPage.clickExpandDetailButtonByCard('ภาษาอังกฤษศึกษาและการสอนภาษาอังกฤษ นักศึกษาไทย (นานาชาติ) ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร ครั้งที่ 1 ปี 2568')
        await annouceLearningResultPage.clickCheckandAddStudentResultButtonByCard('ภาษาอังกฤษศึกษาและการสอนภาษาอังกฤษ นักศึกษาไทย (นานาชาติ) ศูนย์การศึกษาจังหวัดกรุงเทพมหานคร ครั้งที่ 1 ปี 2568')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/selection-results-announcement\/.*/); 
        await annouceLearningResultPage.handleEditStudentResultButton()
        await annouceLearningResultPage.selectLearningExamResultForScholarship('68121111001','ผ่าน','ทุนส่งเสริมการศึกษาประเภทที่ 1 (ป.โท)')
        await annouceLearningResultPage.clickSaveButton()
        await annouceLearningResultPage.clickNextButton()
        await annouceLearningResultPage.handlSequenceStudentResultPopup()
        await annouceLearningResultPage.handleEditStudentResultButton2()
        await annouceLearningResultPage.clickSaveButton()
        await annouceLearningResultPage.clickExportButton()
    });

});