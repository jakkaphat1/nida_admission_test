import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/การสมัครเรียน/ตรวจสอบใบสมัคเรียน', () => {
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

    test('TC-08 ทดสอบตรวจสอบข้อมูลผู้สมัคร (กรณีแก้ไขข้อมูลแทนผู้สมัคร)' , async ({ commonPage , verifyLearningApplicationPage,applicationStatusPage , page}) => {
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
        await verifyLearningApplicationPage.clickVerifyByIdCard('2110100024861')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form\/detail.*/);
        await verifyLearningApplicationPage.verifyTextVisible('2110100024861','Mr. สุรวัช สะภาภักดิ์ดี')
        await verifyLearningApplicationPage.checkVerifyLearningApplicationPage()
        await verifyLearningApplicationPage.clickVerifyInfoAnyTabByKeyword('ตรวจสอบข้อมูลผู้สมัคร')
        await verifyLearningApplicationPage.clickEditCandidateInfo()
        await verifyLearningApplicationPage.verifyTextVisible('| ข้อมูลทั่วไป','| ข้อมูลที่อยู่ปัจจุบัน','| ข้อมูลประวัติการศึกษา','| ข้อมูลประวัติการทำงาน','| ข้อมูลคะแนนเพิ่มเติม','| แบบสำรวจ')
        await verifyLearningApplicationPage.changeReligion('พุทธ')
        await verifyLearningApplicationPage.fillOtherScore('9','300','95','600','800','120')
        await verifyLearningApplicationPage.clickSaveInfoAndSendRecheck()
        await expect(page.getByRole('heading', { name: 'คุณต้องการบันทึกข้อมูลผู้สมัครหรือไม่ ?' })).toBeVisible()
        await verifyLearningApplicationPage.clickConfirmPopupButton()
    });

    test('TC-09 ทดสอบตรวจสอบข้อมูลผู้สมัคร (กรณีแก้ไขข้อมูลแทนผู้สมัคร)' , async ({ commonPage , verifyLearningApplicationPage,applicationStatusPage , page}) => {
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
        await verifyLearningApplicationPage.clickVerifyByIdCard('2110100024861')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form\/detail.*/);
        await verifyLearningApplicationPage.verifyTextVisible('2110100024861','Mr. สุรวัช สะภาภักดิ์ดี')
        await verifyLearningApplicationPage.checkVerifyLearningApplicationPage()
        await verifyLearningApplicationPage.clickVerifyInfoAnyTabByKeyword('ตรวจสอบข้อมูลผู้สมัคร')
        await verifyLearningApplicationPage.verifyTextVisible('| ข้อมูลทั่วไป','| ข้อมูลที่อยู่ปัจจุบัน','| ข้อมูลประวัติการศึกษา','| ข้อมูลประวัติการทำงาน','| ข้อมูลคะแนนเพิ่มเติม','| แบบสำรวจ')
        await verifyLearningApplicationPage.clickSendBackApplicationToCandidateButton()
        await verifyLearningApplicationPage.checkSendBackPopup()
        await verifyLearningApplicationPage.fillReasonForSendBack('ทดสอบการส่งกลับ เพื่อแก้ไข')
        await verifyLearningApplicationPage.clickConfirmToSendBackButton()
        await expect(page.getByText('ส่งคืนแก้ไขสำเร็จ')).toBeVisible()
        await commonPage.clickBackToFirstPage()
    });

    test('TC-10 ทดสอบตรวจสอบเอกสารแนบ (ส่งคืนแก้ไขเอกสารแนบ)' , async ({ commonPage , verifyLearningApplicationPage,applicationStatusPage , page}) => {
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
        await verifyLearningApplicationPage.clickVerifyByIdCard('2110100024861')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form\/detail.*/);
        await verifyLearningApplicationPage.verifyTextVisible('2110100024861','Mr. สุรวัช สะภาภักดิ์ดี')
        await verifyLearningApplicationPage.checkVerifyLearningApplicationPage()
        await verifyLearningApplicationPage.clickVerifyInfoAnyTabByKeyword('ตรวจสอบเอกสารแนบ')
        await verifyLearningApplicationPage.clickSendBackApplicationToCandidateButton()
        await verifyLearningApplicationPage.checkSendBackPopup()
        await verifyLearningApplicationPage.fillReasonForSendBack('ทดสอบการส่งกลับการตรวจสอบเอกสารแนบ เพื่อแก้ไขเอกสารแนบ')
        await verifyLearningApplicationPage.clickConfirmToSendBackButton()
        await expect(page.getByText('ส่งคืนแก้ไขสำเร็จ')).toBeVisible()
        await commonPage.clickBackToFirstPage()
    });

    test('TC-11 ทดสอบยกเลิกใบสมัคร **(หมายเหตุ: สามารถยกเลิกได้ในกรณีที่ยังไม่ชำระเงินค่าสมัคร)**' , async ({ commonPage , verifyLearningApplicationPage,applicationStatusPage , page}) => {
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
            payStatus:'ยังไม่ได้ชำระเงิน'
        }

        await verifyLearningApplicationPage.filterApplicationMoreOption(filterInput)
        await verifyLearningApplicationPage.clickCancelApplicationByIdCard('3101702148754')
        await verifyLearningApplicationPage.clickConfirmCancelApplicationPopup()
        
    });

    test('TC-12 ทดสอบตรวจสอบใบสมัครเรียนหลายใบ' , async ({ commonPage , verifyLearningApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyLearningApplicationPage.gotoVerifyLearningApplicationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/application-form/);
        await verifyLearningApplicationPage.checkVerifyLearningApplicationMenu()
        await verifyLearningApplicationPage.clickAnyTabByKeyword('ใบสมัคร')
        // await verifyLearningApplicationPage.fillSearchBox('ทดสอบ')
        const filterInput = {
            eduYear:undefined,
            semester:'ภาคการศึกษาที่ 2',
            round:'10',
            eduLevel:undefined,
            faculty:undefined,
            course:undefined,
            program:undefined,
            status:undefined,
            payStatus:'ยังไม่ได้ชำระเงิน'
        }

        await verifyLearningApplicationPage.filterApplicationMoreOption(filterInput)
        await verifyLearningApplicationPage.selectCheckboxByIdCard('2875469224987','2493181346562')
        await verifyLearningApplicationPage.clickVerifyAllBySelect()
    });
});