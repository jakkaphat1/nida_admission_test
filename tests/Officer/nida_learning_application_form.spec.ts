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

    test('TC-04 ทดสอบค้นหาใบสมัครเรียน' , async ({ commonPage , verifyLearningApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyLearningApplicationPage.gotoVerifyLearningApplicationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form/);
        await verifyLearningApplicationPage.checkVerifyLearningApplicationMenu()
        await verifyLearningApplicationPage.clickAnyTabByKeyword('ใบสมัคร')
        await verifyLearningApplicationPage.fillSearchBox('ทดสอบ')
        const filterInput = {
            eduYear:'2568',
            semester:'ภาคการศึกษาที่ 2',
            round:undefined,
            eduLevel:'ปริญญาโท',
            faculty:'คณะสถิติประยุกต์',
            course:undefined,
            program:undefined,
            status:'นำส่งใบสมัครแล้ว',
            payStatus:'ยังไม่ได้ชำระเงิน'
        }

        await verifyLearningApplicationPage.filterApplicationMoreOption(filterInput)
        await verifyLearningApplicationPage.clickResetAllFilter()
    });

    test('TC-05 ทดสอบตรวจสอบข้อมูลผู้สมัคร' , async ({ commonPage , verifyLearningApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyLearningApplicationPage.gotoVerifyLearningApplicationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form/);
        await verifyLearningApplicationPage.checkVerifyLearningApplicationMenu()
        await verifyLearningApplicationPage.clickAnyTabByKeyword('ใบสมัคร')
        // await verifyLearningApplicationPage.fillSearchBox('ทดสอบ')
        const filterInput = {
            eduYear:undefined,
            semester:undefined,
            round:undefined,
            eduLevel:undefined,
            faculty:undefined,
            course:undefined,
            program:undefined,
            status:undefined,
            payStatus:'ชำระเงินแล้ว'
        }

        await verifyLearningApplicationPage.filterApplicationMoreOption(filterInput)
        await verifyLearningApplicationPage.clickVerifyByIdCard('694241111008')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form\/detail.*/);
        await verifyLearningApplicationPage.verifyTextVisible('694241111008','Mr. คณาธิศ รตโนภาส')
        await verifyLearningApplicationPage.checkVerifyLearningApplicationPage()
        await verifyLearningApplicationPage.clickVerifyInfoAnyTabByKeyword('ตรวจสอบข้อมูลผู้สมัคร')
        await verifyLearningApplicationPage.verifyTextVisible('| ข้อมูลทั่วไป','| ข้อมูลที่อยู่ปัจจุบัน','| ข้อมูลประวัติการศึกษา','| ข้อมูลประวัติการทำงาน','| ข้อมูลคะแนนเพิ่มเติม','| แบบสำรวจ')
        await verifyLearningApplicationPage.clickVerifyLearningApplicationButton()
        await verifyLearningApplicationPage.clickConfirmVerifyApplicationPopup()
    });

    test('TC-06 ทดสอบตรวจสอบเอกสารแนบ' , async ({ commonPage , verifyLearningApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyLearningApplicationPage.gotoVerifyLearningApplicationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form/);
        await verifyLearningApplicationPage.checkVerifyLearningApplicationMenu()
        await verifyLearningApplicationPage.clickAnyTabByKeyword('ใบสมัคร')
        // await verifyLearningApplicationPage.fillSearchBox('ทดสอบ')
        const filterInput = {
            eduYear:undefined,
            semester:undefined,
            round:undefined,
            eduLevel:undefined,
            faculty:undefined,
            course:undefined,
            program:undefined,
            status:undefined,
            payStatus:'ชำระเงินแล้ว'
        }

        await verifyLearningApplicationPage.filterApplicationMoreOption(filterInput)
        await verifyLearningApplicationPage.clickVerifyByIdCard('694241111008')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form\/detail.*/);
        await verifyLearningApplicationPage.verifyTextVisible('694241111008','Mr. คณาธิศ รตโนภาส')
        await verifyLearningApplicationPage.checkVerifyLearningApplicationPage()
        await verifyLearningApplicationPage.clickVerifyInfoAnyTabByKeyword('ตรวจสอบเอกสารแนบ')
        await verifyLearningApplicationPage.clickPreviewByDocumentName('สำเนาบัตรประชาชน')
        await verifyLearningApplicationPage.clickVerifyLearningApplicationButton()
        await verifyLearningApplicationPage.clickConfirmVerifyApplicationPopup()
    });

    test('TC-07 ทดสอบตรวจสอบการชำระเงินของผู้สมัคร' , async ({ commonPage , verifyLearningApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyLearningApplicationPage.gotoVerifyLearningApplicationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form/);
        await verifyLearningApplicationPage.checkVerifyLearningApplicationMenu()
        await verifyLearningApplicationPage.clickAnyTabByKeyword('ใบสมัคร')
        // await verifyLearningApplicationPage.fillSearchBox('ทดสอบ')
        const filterInput = {
            eduYear:undefined,
            semester:undefined,
            round:undefined,
            eduLevel:undefined,
            faculty:undefined,
            course:undefined,
            program:undefined,
            status:undefined,
            payStatus:'ชำระเงินแล้ว'
        }

        await verifyLearningApplicationPage.filterApplicationMoreOption(filterInput)
        await verifyLearningApplicationPage.clickVerifyByIdCard('694241111008')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form\/detail.*/);
        await verifyLearningApplicationPage.verifyTextVisible('694241111008','Mr. คณาธิศ รตโนภาส')
        await verifyLearningApplicationPage.checkVerifyLearningApplicationPage()
        await verifyLearningApplicationPage.clickVerifyInfoAnyTabByKeyword('การชำระเงิน')
        await verifyLearningApplicationPage.clickExpandDetailButtonByName('00006940017')
        await verifyLearningApplicationPage.clickVerifyLearningApplicationButton()
        await verifyLearningApplicationPage.clickConfirmVerifyApplicationPopup()
        await commonPage.clickBackToFirstPage()
    });
});