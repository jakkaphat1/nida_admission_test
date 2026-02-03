import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';
import path from 'path';

test.describe('NIDA Check Application Status' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)', async ({ admissionPage, page }) => {
    await admissionPage.goto();
    await admissionPage.loginButton.click();
    await admissionPage.fillEmail(admissionPage.email);
    await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบเข้าใช้งานเมนูตรวจสอบสถานะสมัคร' , async ({admissionPage , examsPage , applicationStatusPage}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        // await applicationStatusPage.clickCheckApplyMenu();
    });

    test('TC-03 ทดสอบตรวจสอบสถานะการสมัครเรียน' , async ({admissionPage , examsPage , applicationStatusPage}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickCheckApplyMenu();
    });

    test('TC-03.1 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณียังไม่ส่งใบสมัคร | (1) ทดสอบแก้ไขข้อมูล' , async ({admissionPage , examsPage , applicationStatusPage}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickCheckApplyMenu();
        await applicationStatusPage.clickEditDraftInfo();
    });

    // test('TC-03.2 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (1) ทดสอบดูใบสมัคร' , async ({admissionPage , examsPage , applicationStatusPage}) => {
    //     await admissionPage.gotoPrograms();
    //     await applicationStatusPage.clickCheckApplicationStatus();
    //     await applicationStatusPage.clickCheckApplyMenu();
    // });


    test('TC-03.3 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (3) ทดสอบชำระเงินค่าสมัคร' , async ({admissionPage , examsPage , applicationStatusPage,page}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickCheckApplyMenu();
        await applicationStatusPage.clickExpandDetailsButton();
        await applicationStatusPage.clickPaymentButton();
    });

    test('TC-03.4 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (2) ทดสอบยกเลิกใบสมัคร' , async ({admissionPage , examsPage , applicationStatusPage,page}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickCheckApplyMenu();
        await applicationStatusPage.clickCancelApplicationButton();
        await applicationStatusPage.confirmCancelApplication();
    });

    test('TC-03.5 ทดสอบตรวจสอบสถานะการสมัครเรียน | กรณีส่งใบสมัคร และชำระเงินค่าสมัครแล้ว | (1) ทดสอบพิมพ์ใบเสร็จ' , async ({admissionPage , examsPage , applicationStatusPage,page}) => {
        test.setTimeout(50000)
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickCheckApplyMenu();
        await applicationStatusPage.clickExpandDetailsButton();
        await applicationStatusPage.clickPaymentButton();
        await admissionPage.payWithBillPayment();
        await expect(page.getByText('บันทึกรายการเรียบร้อยแล้ว')).toBeVisible();
        await admissionPage.downloadPaymentInvoice();
    });


    //สมัครสอบข้อเขียน
    test('TC-04 ทดสอบตรวจสอบสถานะการสมัครสอบข้อเขียน ' , async ({admissionPage , examsPage , applicationStatusPage}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickWrittenExamButtom();
    });

    test('TC-04.1 ทดสอบตรวจสอบสถานะการสมัครสอบข้อเขียน | กรณียังไม่ส่งใบสมัคร | (1) ทดสอบตรวจสอบวิชา' , async ({admissionPage , examsPage , applicationStatusPage,page}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickWrittenExamButtom();
        await examsPage.expandButtonClick();
        await applicationStatusPage.clickEditDraftWrittenExamInfo();
    });

    test('TC-04.2 ทดสอบตรวจสอบสถานะการสมัครสอบข้อเขียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (1) ทดสอบดูใบสมัคร' , async ({admissionPage , examsPage , applicationStatusPage,page}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickWrittenExamButtom();
        await examsPage.expandButtonClick();
        await applicationStatusPage.clickEditDraftWrittenExamInfo3();
    });

    test('TC-04.3 ทดสอบตรวจสอบสถานะการสมัครสอบข้อเขียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (3) ทดสอบชำระเงินค่าสมัคร' , async ({admissionPage , examsPage , applicationStatusPage,page}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickWrittenExamButtom();
        await examsPage.expandButtonClick();
        await applicationStatusPage.clickPayWrittenExamButton();
        await applicationStatusPage.highlightPaymentWording();
    });

    test('TC-04.4 ทดสอบตรวจสอบสถานะการสมัครสอบข้อเขียน | กรณีส่งใบสมัครเเล้ว แต่ยังไม่ชำระเงินค่าสมัคร | (2) ทดสอบยกเลิกใบสมัคร' , async ({admissionPage , examsPage , applicationStatusPage,page}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickWrittenExamButtom();
        await applicationStatusPage.clickCancelWrittenExamButton();
        await applicationStatusPage.confirmCancelApplication();
    });

    test('TC-04.5 ทดสอบตรวจสอบสถานะการสมัครสอบข้อเขียน | กรณีส่งใบสมัคร และชำระเงินค่าสมัครแล้ว | (1) ทดสอบพิมพ์ใบเสร็จ' , async ({admissionPage , examsPage , applicationStatusPage,page}) => {
        await admissionPage.gotoPrograms();
        await applicationStatusPage.clickCheckApplicationStatus();
        await applicationStatusPage.clickWrittenExamButtom();
        await examsPage.expandButtonClick();
        await applicationStatusPage.clickPayWrittenExamButton();
        await applicationStatusPage.highlightPaymentWording();
        await applicationStatusPage.clickWrittenExamBillPayment();
        await applicationStatusPage.confirmPaymentFlow();
        await admissionPage.downloadPaymentInvoice();
    });
});