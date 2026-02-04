import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';
import { BackOffice } from '../pages/BackOffice';
import path from 'path';

test.describe('NIDA Check Application Status' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร ฝั่งเจ้าหน้าที่ (NIDA Backoffice)', async ({ admissionPage, page , backOffice }) => {
        await backOffice.gotoBackOffice();

        await backOffice.fillUsernameANDfillPassword('sys_admin1', 'unext@2022');
        await expect(page).toHaveURL(/.*backoffice-uat.nida.ac.th/);
    });


});