import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/การสมัครสอบวิชาเฉพาะ/ตรวจสอบใบสมัครข้อเขียน', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 เมนูตรวจสอบใบสมัครสอบข้อเขียน' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
    });

    test('TC-03 ทดสอบค้นหาใบสมัครข้อเขียน' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
        await verifyWrittenExamApplicationPage.clickApplicationFormTab()
        await verifyWrittenExamApplicationPage.fillSearchBox('ทดสอบ')
        const filterInput = {
            subject:'วิชาเฉพาะ 9',
            round:'',
            eduYear:'2569',
            semester:'ภาคการศึกษาที่ 1',
            eduLevel:'ปริญญาโท',
            status:'ยังไม่ตรวจสอบ',
            payStatus:'ยังไม่ได้ชำระเงิน',
            applicationStatus:'ส่งใบสมัคร'
        }

        await verifyWrittenExamApplicationPage.filterMoreOption(filterInput)
        await verifyWrittenExamApplicationPage.clickResetAllFilter()
    });

    test('TC-04 ทดสอบตรวจสอบใบสมัครข้อเขียน (กรณียังไม่ตรวจสอบ)' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
        await verifyWrittenExamApplicationPage.clickApplicationFormTab()
        await verifyWrittenExamApplicationPage.fillSearchBox('แอดมิชชั่น')
        const filterInput = {
            eduYear:'2569'
        }
        await verifyWrittenExamApplicationPage.filterMoreOption(filterInput)
        await verifyWrittenExamApplicationPage.clickVerifyByIdCard('6958962589681')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form\/detail.*/);
        await verifyWrittenExamApplicationPage.verifyTextVisible('6958962589681','นาย ทดสอบ แอดมิชชั่น')
        await verifyWrittenExamApplicationPage.clickVerifyWrittenApplicationButton()
        await verifyWrittenExamApplicationPage.clickConfirmVerifyApplicationPopup()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form\/detail.*/);
        await verifyWrittenExamApplicationPage.clickApplicationPaymentTab()
        await verifyWrittenExamApplicationPage.clickConfirmPaymentButton()
        await verifyWrittenExamApplicationPage.clickConfirmVerifyApplicationPopup()
        await verifyWrittenExamApplicationPage.clickBackToFirstPage()
    });

    test('TC-05 ทดสอบตรวจสอบใบสมัครข้อเขียน (กรณีแก้ไขข้อมูลแทนผู้สมัคร)' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
        await verifyWrittenExamApplicationPage.clickApplicationFormTab()
        await verifyWrittenExamApplicationPage.fillSearchBox('แอดมิชชั่น')
        const filterInput = {
            eduYear:'2569'
        }
        await verifyWrittenExamApplicationPage.filterMoreOption(filterInput)
        await verifyWrittenExamApplicationPage.clickVerifyByIdCard('6032754471030')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form\/detail.*/);
        await verifyWrittenExamApplicationPage.verifyTextVisible('6032754471030','นาย ทดสอบ แอดมิชชั่น')
        await verifyWrittenExamApplicationPage.clickEditCandidateInfo()
        await verifyWrittenExamApplicationPage.changeReligion('พุทธ')
        await verifyWrittenExamApplicationPage.clickSaveButton()
        await verifyWrittenExamApplicationPage.clickConfirmChangeCandidateInfoPopup()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
    });

    test('TC-06 ทดสอบตรวจสอบใบสมัครข้อเขียน (กรณีส่งคืนแก้ไขข้อมูลผู้สมัคร)' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
        await verifyWrittenExamApplicationPage.clickApplicationFormTab()
        await verifyWrittenExamApplicationPage.fillSearchBox('แอดมิชชั่น')
        const filterInput = {
            eduYear:'2569'
        }
        await verifyWrittenExamApplicationPage.filterMoreOption(filterInput)
        await verifyWrittenExamApplicationPage.clickVerifyByIdCard('6032754471030')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form\/detail.*/);
        await verifyWrittenExamApplicationPage.verifyTextVisible('6032754471030','นาย ทดสอบ แอดมิชชั่น')
        await verifyWrittenExamApplicationPage.clickSendBackApplicationToCandidateButton()
        await verifyWrittenExamApplicationPage.checkSendBackPopup()
        await verifyWrittenExamApplicationPage.fillReasonForSendBack('ทดสอบการส่งกลับ เพื่อแก้ไข')
        await verifyWrittenExamApplicationPage.clickConfirmToSendBackButton()
        await expect(page.getByText('ส่งคืนแก้ไขสำเร็จ')).toBeVisible()
        await verifyWrittenExamApplicationPage.clickBackToFirstPage()
    });

    test('TC-07 ทดสอบยกเลิกใบสมัครข้อเขียน' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
        await verifyWrittenExamApplicationPage.clickApplicationFormTab()
        const filterInput = {
            eduYear:'2568'
        }
        await verifyWrittenExamApplicationPage.filterMoreOption(filterInput)
        await verifyWrittenExamApplicationPage.clickCancelApplicationByIdCard('1790600061827')
        await verifyWrittenExamApplicationPage.clickConfirmCancelApplicationPopup()
    });

    test('TC-08 ทดสอบตรวจสอบใบสมัครข้อเขียนหลายใบ' , async ({ commonPage , verifyWrittenExamApplicationPage , page}) => {
        await commonPage.gotoPrograms()
        await verifyWrittenExamApplicationPage.gotoVerifyWrittenExamMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/written-application-form/);
        await verifyWrittenExamApplicationPage.checkVerifyWrittenExamMenu()
        await verifyWrittenExamApplicationPage.clickApplicationFormTab()
        const filterInput = {
            subject:'วิชาเฉพาะ 2',
            eduYear:'2568'
        }
        await verifyWrittenExamApplicationPage.filterMoreOption(filterInput)
        await verifyWrittenExamApplicationPage.selectCheckboxByIdCard('1409902959088','6958962589681')
        await verifyWrittenExamApplicationPage.clickVerifyAllBySelect()
        
    });
});