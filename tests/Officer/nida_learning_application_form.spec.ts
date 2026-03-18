import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/การสมัครสอบวิชาเฉพาะ/ตรวจสอบใบสมัคเรียน', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 เมนูตรวจสอบใบสมัครเรียน' , async ({ commonPage , verifyLearningApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyLearningApplicationPage.gotoVerifyLearningApplicationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form/);
        await verifyLearningApplicationPage.checkVerifyLearningApplicationMenu()
    });

    test('TC-03 ทดสอบค้นหาใบสมัครเรียนฉบับร่าง' , async ({ commonPage , verifyLearningApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyLearningApplicationPage.gotoVerifyLearningApplicationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form/);
        await verifyLearningApplicationPage.checkVerifyLearningApplicationMenu()
        await verifyLearningApplicationPage.clickAnyTabByKeyword('ฉบับร่าง')
        await verifyLearningApplicationPage.fillSearchBox('ทดสอบ')
        const filterInput = {
            eduYear:'2568',
            semester:'ภาคการศึกษาที่ 2',
            round:undefined,
            eduLevel:'ปริญญาโท',
            faculty:'คณะสถิติประยุกต์',
            course:undefined,
            program:undefined,
            status:'หมดเวลาสมัคร'
        }

        await verifyLearningApplicationPage.filterMoreOption(filterInput)
        
    });
});