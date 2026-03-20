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
});