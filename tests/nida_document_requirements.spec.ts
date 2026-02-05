import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';
import { CourseAndProgramInformationPage } from '../pages/CourseAndProgramInformationPage';
import { DocumentRequirementPage } from '../pages/DocumentRequirementsPage';
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





});