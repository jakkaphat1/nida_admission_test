import { test, expect } from '../../fixtures/baseTest';
import { AdmissionPage } from '../../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../../pages/ExamsPage';
import { ApplicationStatusPage } from '../../pages/ApplicationStatusPage';
import { CourseAndProgramInformationPage } from '../../pages/CourseAndProgramInformationPage';
import { DocumentRequirementPage } from '../../pages/DocumentRequirementsPage';
import path from 'path';

test.describe('NIDA Specific Document Information Requirement' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัครนักศึกษาใหม่ ส่วนงานดำเนินการฝ่ายเจ้าหน้าที่ (NIDA Back office)', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();

        await courseAndprogramInformationPage.fillUsernameANDfillPassword('sys_admin1', 'unext@2022');
        await expect(page).toHaveURL(/.*backoffice-uat.nida.ac.th/);
    });

    test('TC-02 เมนูกำหนดการแนบเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
    });

    test('TC-03 ทดสอบค้นหาข้อมูลกำหนดการแนบเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
        await documentRequirementsPage.searchingInsearchBox('BA02000')
        await documentRequirementsPage.clearSearchingBox()
        await documentRequirementsPage.searchingInsearchBox('เอกสารเปิดรับสมัครสำหรับบริหารธุรกิจมหาบัณฑิต นานาขาติ Internation MBA')
        await documentRequirementsPage.clearSearchingBox()
        await documentRequirementsPage.clickFilterMoreInfo()
        await documentRequirementsPage.searchByfilterBtn('ปริญญาโท','GSBA - คณะบริหารธุรกิจ', 'ภาคปกติ')
    });

    test('TC-04.1 ทดสอบกำหนดข้อมูลการแนบเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        test.setTimeout(50000)
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
        await documentRequirementsPage.clickAddDocumentBtn()
        await expect(page).toHaveURL(/\/admin\/admission\/master\/attachment\/create/);
        await documentRequirementsPage.checkFormDetail()
        await documentRequirementsPage.clickStstusToggle()
        await documentRequirementsPage.fillFormDetail('GSL001','ปริญญาโท','ภาคปกติ','คณะนิติศาสตร์','เอกสารแนบ ปริญญาโท ภาคปกติ คณะนิติศาสตร์')

    });

    test('TC-04.2 ทดสอบกำหนดเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        test.setTimeout(50000)
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
        await documentRequirementsPage.clickAddDocumentBtn()
        await expect(page).toHaveURL(/\/admin\/admission\/master\/attachment\/create/);
        await documentRequirementsPage.checkFormDetail()
        await documentRequirementsPage.clickStstusToggle()
        // await documentRequirementsPage.fillFormDetail('GSL001','ปริญญาโท','ภาคปกติ','คณะนิติศาสตร์','เอกสารแนบ ปริญญาโท ภาคปกติ คณะนิติศาสตร์')
        // await documentRequirementsPage.deleteAllDocuments() 
        await documentRequirementsPage.setDocumentRequired('สำเนาบัตรประชาชน', true)
        await documentRequirementsPage.setDocumentRequired('รูปถ่าย 1 นิ้ว (ติดในแบบฟอร์มใบสมัคร)', true)
        await documentRequirementsPage.setDocumentRequired('สำเนาใบแสดงผลการศึกษา (Transcript) ระดับปริญญาตรี', true)
        await documentRequirementsPage.fillFileSize(0, 4);
        await documentRequirementsPage.clickFileTypePDF(0)
    });

    test('TC-04.3 กรณีเพิ่มเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        test.setTimeout(50000)
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
        await documentRequirementsPage.clickAddDocumentBtn()
        await expect(page).toHaveURL(/\/admin\/admission\/master\/attachment\/create/);
        await documentRequirementsPage.checkFormDetail()
        // await documentRequirementsPage.clickStstusToggle()
        // await documentRequirementsPage.fillFormDetail('GSL001','ปริญญาโท','ภาคปกติ','คณะนิติศาสตร์','เอกสารแนบ ปริญญาโท ภาคปกติ คณะนิติศาสตร์')
        await documentRequirementsPage.deleteAllDocuments() 
        await documentRequirementsPage.clickAddInformationFile()
        // await documentRequirementsPage.setDocumentRequired('สำเนาบัตรประชาชน', true)
        // await documentRequirementsPage.setDocumentRequired('รูปถ่าย 1 นิ้ว (ติดในแบบฟอร์มใบสมัคร)', true)
        // await documentRequirementsPage.setDocumentRequired('สำเนาใบแสดงผลการศึกษา (Transcript) ระดับปริญญาตรี', true)
        // await documentRequirementsPage.fillFileSize(0, 4);
        // await documentRequirementsPage.clickFileTypePDF(0)
    });

    test('TC-04.4 กรณีลบเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        test.setTimeout(50000)
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
        await documentRequirementsPage.clickAddDocumentBtn()
        await expect(page).toHaveURL(/\/admin\/admission\/master\/attachment\/create/);
        await documentRequirementsPage.checkFormDetail()
        await documentRequirementsPage.deleteAllDocuments() 
    });

    test('TC-04.5 ทดสอบบันทึกข้อมูลกำหนดการแนบเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
        await documentRequirementsPage.clickAddDocumentBtn()
        await expect(page).toHaveURL(/\/admin\/admission\/master\/attachment\/create/);
        await documentRequirementsPage.checkFormDetail()
        await documentRequirementsPage.clickStstusToggle()
        await documentRequirementsPage.fillFormDetail('GSL099','ปริญญาเอก','ภาคพิเศษ','คณะนิติศาสตร์','เอกสารแนบ ปริญญาเอก ภาคพิเศษ คณะนิติศาสตร์')
        await documentRequirementsPage.setDocumentRequired('สำเนาบัตรประชาชน', true)
        await documentRequirementsPage.setDocumentRequired('รูปถ่าย 1 นิ้ว (ติดในแบบฟอร์มใบสมัคร)', true)
        await documentRequirementsPage.setDocumentRequired('สำเนาใบแสดงผลการศึกษา (Transcript) ระดับปริญญาตรี', true)
        await documentRequirementsPage.fillFileSize(0, 4);
        await documentRequirementsPage.clickFileTypePDF(0)
        await documentRequirementsPage.clickSaveButton()
    });

    test('TC-05 ทดสอบแก้ไขข้อมูลกำหนดการแนบเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
        await documentRequirementsPage.searchingInsearchBox('เอกสารแนบ ปริญญาเอก ภาคพิเศษ คณะนิติศาสตร์')
        await documentRequirementsPage.clickEditCardInfo('เอกสารแนบ ปริญญาเอก ภาคพิเศษ คณะนิติศาสตร์')
        await documentRequirementsPage.fillFormDetail(undefined,undefined,undefined,undefined,'เอกสารแนบ ปริญญาเอก ภาคพิเศษ คณะนิติศาสตร์(แก้ไข)')
        await documentRequirementsPage.clickSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible();
    });

    test('TC-06 ทดสอบลบข้อมูลกำหนดการแนบเอกสาร', async ({ admissionPage, page ,courseAndprogramInformationPage, documentRequirementsPage  }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await documentRequirementsPage.clickDocumentAttachmentMenu();
        await documentRequirementsPage.searchingInsearchBox('เอกสารแนบ ปริญญาเอก ภาคพิเศษ คณะนิติศาสตร์(แก้ไข)')
        await documentRequirementsPage.clickDeleteCardInfo('เอกสารแนบ ปริญญาเอก ภาคพิเศษ คณะนิติศาสตร์(แก้ไข)')
        await documentRequirementsPage.clickConfirmPopupButton()
    });

});