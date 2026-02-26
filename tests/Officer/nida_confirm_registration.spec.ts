import { test, expect } from '../../fixtures/baseTest';

test.describe('NIDA Admission Test Suite - ยืนยันสิทธิ์เข้าศึกษา' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    }); 

    test('TC-02 ทดสอบเข้าใช้งานเมนูยืนยันสิทธิ์' , async ({ admissionPage , confirmRegistration, page}) => {
        await admissionPage.gotoPrograms();
        await confirmRegistration.clickConfirmEnrollmentBtn()
        await expect(page).toHaveURL(/.*privilege/);
    });    

    test('TC-03 ทดสอบยอมรับระเบียบข้อตกลง' , async ({ admissionPage , confirmRegistration, page}) => {
        await admissionPage.gotoPrograms();
        await confirmRegistration.clickConfirmEnrollmentBtn()
        await expect(page).toHaveURL(/.*privilege/);
        await confirmRegistration.checkConfirmEnrollmentPolicyPopup()
        await confirmRegistration.clickCheckboxInPolicyPopup('หมายเหตุ : ผู้ผ่านการคัดเลือก','หากกองบริการการศึกษาตรวจสอบเอกสารขึ้นทะเบียนเป็นนักศึกษาแล้ว')
        await confirmRegistration.clickAcceptEnrollmentPolicy()
        // await confirmRegistration.clickNextStepEnrollment()
        // await expect(page).toHaveURL(/.*reporting/);
    });   

    test('TC-04 ทดสอบแก้ไขข้อมูลการติดต่อ' , async ({ admissionPage , confirmRegistration, page}) => {
        await admissionPage.gotoPrograms();
        await confirmRegistration.clickConfirmEnrollmentBtn()
        await expect(page).toHaveURL(/.*privilege/);
        await confirmRegistration.checkConfirmEnrollmentPolicyPopup()
        await confirmRegistration.clickCheckboxInPolicyPopup('หมายเหตุ : ผู้ผ่านการคัดเลือก','หากกองบริการการศึกษาตรวจสอบเอกสารขึ้นทะเบียนเป็นนักศึกษาแล้ว')
        await confirmRegistration.clickAcceptEnrollmentPolicy()
        await confirmRegistration.clickEditContactInfo()
        await confirmRegistration.fillContactInfo('0812345678','todsob@gmail.com')
        // await confirmRegistration.clickNextStepEnrollment()
        // await expect(page).toHaveURL(/.*reporting/);
    });   


    test('TC-05 ทดสอบยืนยันสิทธิ์ (เงื่อนไข : ผู้สมัครต้องผ่านการคัดเลือกเข้าศึกษาต่อ อย่างน้อย 1 หลักสูตร)' , async ({ admissionPage , confirmRegistration, page}) => {
        await admissionPage.gotoPrograms();
        await confirmRegistration.clickConfirmEnrollmentBtn()
        await expect(page).toHaveURL(/.*privilege/);
        await confirmRegistration.checkConfirmEnrollmentPolicyPopup()
        await confirmRegistration.clickCheckboxInPolicyPopup('หมายเหตุ : ผู้ผ่านการคัดเลือก','หากกองบริการการศึกษาตรวจสอบเอกสารขึ้นทะเบียนเป็นนักศึกษาแล้ว')
        await confirmRegistration.clickAcceptEnrollmentPolicy()
        await confirmRegistration.selectCourseInConfirmEnrollPageByName('วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI)')
        await confirmRegistration.clickEditContactInfo()
        await confirmRegistration.fillContactInfo('0812345678','todsob@gmail.com')
        await confirmRegistration.clickConfirmEnrollmentAfterSelectOrFillData()
        await expect(page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })).toBeVisible()
        await confirmRegistration.clickConfirmPopup()
        await confirmRegistration.clickNextStepEnrollment()
        await expect(page).toHaveURL(/.*reporting/);
    });   
});