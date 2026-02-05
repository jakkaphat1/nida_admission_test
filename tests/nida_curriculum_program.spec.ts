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

    test('TC-08 ทดสอบเพิ่มหลักสูตร | Step 4: การแนบเอกสาร', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickGSBAButton()
        await backOfficePage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await backOfficePage.clickConfirmPopup()
        await backOfficePage.clickNextButton()
        await backOfficePage.deleteInformationFile(['ใบเปลี่ยนชื่อ-สกุลหรือทะเบียนสมรส', 'ผลคะแนนสอบ' , 'หนังสือรับรองผู้สมัคร' ,'หนังสือรับรองมาตรฐาน'])
        await backOfficePage.clickAddInputerInformation()
        await backOfficePage.chooseInformationFile(6,'หนังสือรับรองผู้สมัคร')
        await backOfficePage.swapCard(6,5)
    });

    test('TC-09 ทดสอบเพิ่มหลักสูตร | Step 5: ค่าธรรมเนียม', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickGSBAButton()
        await backOfficePage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await backOfficePage.clickConfirmPopup()
        await backOfficePage.clickNextButton()
        await backOfficePage.chooseApplicationPrice('ค่าสมัครสอบ ป.โท (1,000)')
        await backOfficePage.chooseTuitonFees('บริหารธุรกิจ RMBA (นักศึกษาไทย)')
        await backOfficePage.clickSaveButton()
    });

    test('TC-10 ทดสอบเพิ่มหลักสูตร | Step 6: ข้อมูลติดต่อ', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickGSBAButton()
        await backOfficePage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await backOfficePage.clickConfirmPopup()
        await backOfficePage.clickNextButton()
        await backOfficePage.fillContactInformation('02-7273671-2','@gsba_nida'
            ,'https://www.facebook.com/GSBANIDA','gsba@nida.ac.th','https://gsba.nida.ac.th/th/','ชั้น 2 อาคารราชพฤกษ์ 148 สถาบันบัณฑิตพัฒนบริหารศาสตร์ ถนนเสรีไทย คลองจั่น บางกะปิ กทม. 10240')
        await backOfficePage.fillOfficerContactInformation('นางอุมาวรรณ เอี่ยมสะอาด','027273689','นางสาวเจ้าหน้าที่ ทดสอบ','0834567890')  
        await backOfficePage.clickSaveButton()
        await backOfficePage.verifyAfterClickSaveBtn('ข้อมูลหลักสูตรและโครงการ')  
    });

    test('TC-12 ทดสอบแก้ไขรายละเอียดโครงการ | แก้ไข Step 1: ข้อมูลโครงการ', async ({ admissionPage, page , backOfficePage }) => {
        await backOfficePage.gotoBackOffice();
        await backOfficePage.clickToFacultyInformation()
        await backOfficePage.clickGSBAButton()
        await backOfficePage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await backOfficePage.clickEditButton()

        const myFilePath = 'C:/Users/Lenovo/Downloads/NIDA_Logo.png';
        await backOfficePage.editProgramStep1(myFilePath)
         
    });


});