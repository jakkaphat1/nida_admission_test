import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../pages/ExamsPage';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage';
import { BackOffice } from '../pages/BackOffice';
import path from 'path';

test.describe('NIDA Check Application Status' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร ฝั่งเจ้าหน้าที่ (NIDA Backoffice)', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();

        await backOfficePage.fillUsernameANDfillPassword('sys_admin1', 'unext@2022');
        await expect(page).toHaveURL(/.*backoffice-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบค้นหาข้อมูลหลักสูตรและโครงการ', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        await backOfficePage.clickToFacultyInformationAndSearch('บริหารธุรกิจมหาบัณฑิต')
    });

    test('TC-04 ทดสอบเพิ่มหลักสูตร ', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        // step1
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickAddProgram()
    });

    test('TC-05 ทดสอบเพิ่มหลักสูตร | Step 1: ข้อมูลโครงการ', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        // step1
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickAddProgram()
        await backOfficePage.clickAddProgramStep1()
    });

    test('TC-06 ทดสอบเพิ่มหลักสูตร | Step 2: ประเภทการสอบของโครงการ | A. สอบข้อเขียน หรือ สอบข้อเขียน และสัมภาษณ์', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickGSBAButton()
        await backOfficePage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await backOfficePage.clickConfirmPopup()
        await backOfficePage.clickNextButton()
        await backOfficePage.clickAndFillAddProgramStep2_WrittenExam('100','50')
        await backOfficePage.clickSaveButton()
    });

    test('TC-06.2 ทดสอบเพิ่มหลักสูตร | Step 2: ประเภทการสอบของโครงการ | B. สอบสัมภาษณ์', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickGSBAButton()
        await backOfficePage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await backOfficePage.clickConfirmPopup()
        await backOfficePage.clickEditButton()
        await backOfficePage.clickinterviewExam()
        await backOfficePage.clickSaveButton()
    });

    test('TC-07 ทดสอบเพิ่มหลักสูตร | Step 3: คุณสมบัติ', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickGSBAButton()
        await backOfficePage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await backOfficePage.clickConfirmPopup()
        await backOfficePage.clickNextButton()
        await backOfficePage.deleteQualificationByTitle(['อายุ','ระดับการศึกษา'
            ,'วุฒิการศึกษา','ประสบการณ์ทำงาน','เกรดเฉลี่ย','คะแนนสอบ','เกียรตินิยม']);
        await backOfficePage.addQualificationsButton()
        await backOfficePage.selectEducatuinLevel('ปริญญาตรี','ต้องสำเร็จการศึกษาระดับปริญญาตรีเท่านั้น')
        await backOfficePage.clickSaveButton()


    });


});