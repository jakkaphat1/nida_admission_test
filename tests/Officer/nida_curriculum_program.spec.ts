import { test, expect } from '../../fixtures/baseTest';
import { AdmissionPage } from '../../pages/AdmissionPage';
import { ExamsPage, StudentInfoForApplyExam } from '../../pages/ExamsPage';
import { ApplicationStatusPage } from '../../pages/ApplicationStatusPage';
import { CourseAndProgramInformationPage } from '../../pages/CourseAndProgramInformationPage';
import path from 'path';

test.describe('NIDA Check Application Status' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร ฝั่งเจ้าหน้าที่ (NIDA Backoffice)', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();

        await courseAndprogramInformationPage.fillUsernameANDfillPassword('sys_admin1', 'unext@2022');
        await expect(page).toHaveURL(/.*backoffice-uat.nida.ac.th/);
    });

    test('TC-02 ทดสอบค้นหาข้อมูลหลักสูตรและโครงการ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformationAndSearch('บริหารธุรกิจมหาบัณฑิต')
    });

    test('TC-04 ทดสอบเพิ่มหลักสูตร ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        // step1
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickAddProgram()
    });

    test('TC-05 ทดสอบเพิ่มหลักสูตร | Step 1: ข้อมูลโครงการ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        // step1
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickAddProgram()
        await courseAndprogramInformationPage.clickAddProgramStep1()
    });

    test('TC-06 ทดสอบเพิ่มหลักสูตร | Step 2: ประเภทการสอบของโครงการ | A. สอบข้อเขียน หรือ สอบข้อเขียน และสัมภาษณ์', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickConfirmPopup()
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.clickAndFillAddProgramStep2_WrittenExam('100','50')
        await courseAndprogramInformationPage.clickSaveButton()
    });

    test('TC-06.2 ทดสอบเพิ่มหลักสูตร | Step 2: ประเภทการสอบของโครงการ | B. สอบสัมภาษณ์', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickConfirmPopup()
        await courseAndprogramInformationPage.clickEditButton()
        await courseAndprogramInformationPage.clickinterviewExam()
        await courseAndprogramInformationPage.clickSaveButton()
    });

    test('TC-07 ทดสอบเพิ่มหลักสูตร | Step 3: คุณสมบัติ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickConfirmPopup()
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.deleteQualificationByTitle(['อายุ','ระดับการศึกษา'
            ,'วุฒิการศึกษา','ประสบการณ์ทำงาน','เกรดเฉลี่ย','คะแนนสอบ','เกียรตินิยม']);
        await courseAndprogramInformationPage.addQualificationsButton()
        await courseAndprogramInformationPage.selectEducatuinLevel('ปริญญาตรี','ต้องสำเร็จการศึกษาระดับปริญญาตรีเท่านั้น')
        await courseAndprogramInformationPage.clickSaveButton()
    });

    test('TC-08 ทดสอบเพิ่มหลักสูตร | Step 4: การแนบเอกสาร', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickConfirmPopup()
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.deleteInformationFile(['ใบเปลี่ยนชื่อ-สกุลหรือทะเบียนสมรส', 'ผลคะแนนสอบ' , 'หนังสือรับรองผู้สมัคร' ,'หนังสือรับรองมาตรฐาน'])
        await courseAndprogramInformationPage.clickAddInputerInformation()
        await courseAndprogramInformationPage.chooseInformationFile(6,'หนังสือรับรองผู้สมัคร')
        await courseAndprogramInformationPage.swapCard(6,5)
    });

    test('TC-09 ทดสอบเพิ่มหลักสูตร | Step 5: ค่าธรรมเนียม', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickConfirmPopup()
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.chooseApplicationPrice('ค่าสมัครสอบ ป.โท (1,000)')
        await courseAndprogramInformationPage.chooseTuitonFees('บริหารธุรกิจ RMBA (นักศึกษาไทย)')
        await courseAndprogramInformationPage.clickSaveButton()
    });

    test('TC-10 ทดสอบเพิ่มหลักสูตร | Step 6: ข้อมูลติดต่อ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickConfirmPopup()
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.fillContactInformation('02-7273671-2','@gsba_nida'
            ,'https://www.facebook.com/GSBANIDA','gsba@nida.ac.th','https://gsba.nida.ac.th/th/','ชั้น 2 อาคารราชพฤกษ์ 148 สถาบันบัณฑิตพัฒนบริหารศาสตร์ ถนนเสรีไทย คลองจั่น บางกะปิ กทม. 10240')
        await courseAndprogramInformationPage.fillOfficerContactInformation('นางอุมาวรรณ เอี่ยมสะอาด','027273689','นางสาวเจ้าหน้าที่ ทดสอบ','0834567890')  
        await courseAndprogramInformationPage.clickSaveButton()
        await courseAndprogramInformationPage.verifyAfterClickSaveBtn('ข้อมูลหลักสูตรและโครงการ')  
    });

    test('E2E - ทดสอบเพิ่มหลักสูตรใหม่ตั้งแต่ต้นจนจบ (Step 1 - 6) | (TC-05 -> TC-10)', async ({ courseAndprogramInformationPage,page }) => {
        test.setTimeout(120000)
        // step1
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickAddProgram()
        await courseAndprogramInformationPage.clickAddProgramStep1()
        await page.waitForTimeout(1000)
        // step2
        await courseAndprogramInformationPage.clickAndFillAddProgramStep2_WrittenExam('100','50')
        await courseAndprogramInformationPage.clickSaveButton()

        // step3
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.deleteQualificationByTitle(['อายุ','ระดับการศึกษา'
            ,'วุฒิการศึกษา','ประสบการณ์ทำงาน','เกรดเฉลี่ย','คะแนนสอบ','เกียรตินิยม']);
        await courseAndprogramInformationPage.addQualificationsButton()
        await courseAndprogramInformationPage.selectEducatuinLevel('ปริญญาตรี','ต้องสำเร็จการศึกษาระดับปริญญาตรีเท่านั้น')
        await courseAndprogramInformationPage.clickSaveButton()

        // step4
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.deleteInformationFile(['ใบเปลี่ยนชื่อ-สกุลหรือทะเบียนสมรส', 'ผลคะแนนสอบ' , 'หนังสือรับรองผู้สมัคร' ,'หนังสือรับรองมาตรฐาน'])
        await courseAndprogramInformationPage.clickAddInputerInformation()
        await courseAndprogramInformationPage.chooseInformationFile(6,'หนังสือรับรองผู้สมัคร')
        await courseAndprogramInformationPage.swapCard(6,5)
        await courseAndprogramInformationPage.clickSaveButton()

        // step5
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.chooseApplicationPrice('ค่าสมัครสอบ ป.โท (1,000)')
        await courseAndprogramInformationPage.chooseTuitonFees('อัตราค่าธรรมเนียมคณะบริหารธุรกิจ (ภาคปกติ)')
        await courseAndprogramInformationPage.clickSaveButton()

        //step6
        await courseAndprogramInformationPage.clickNextButton()
        await courseAndprogramInformationPage.fillContactInformation('02-7273671-2','@gsba_nida'
            ,'https://www.facebook.com/GSBANIDA','gsba@nida.ac.th','https://gsba.nida.ac.th/th/','ชั้น 2 อาคารราชพฤกษ์ 148 สถาบันบัณฑิตพัฒนบริหารศาสตร์ ถนนเสรีไทย คลองจั่น บางกะปิ กทม. 10240')
        await courseAndprogramInformationPage.fillOfficerContactInformation('นางอุมาวรรณ เอี่ยมสะอาด','027273689','นางสาวเจ้าหน้าที่ ทดสอบ','0834567890')  
        await courseAndprogramInformationPage.clickSaveButton()
        await courseAndprogramInformationPage.verifyAfterClickSaveBtn('ข้อมูลหลักสูตรและโครงการ')  
    });

    test('TC-12.1 ทดสอบแก้ไขรายละเอียดโครงการ | แก้ไข Step 1: ข้อมูลโครงการ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickEditButton()

        const myFilePath = 'C:/Users/Lenovo/Downloads/NIDA_Logo.png';
        await courseAndprogramInformationPage.editProgramStep1(myFilePath)
         
    });

    test('TC-12.2 ทดสอบแก้ไขรายละเอียดโครงการ | แก้ไข Step 2: ประเภทการสอบ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickGoToStep('ประเภทการสอบ')
        await courseAndprogramInformationPage.clickEditButton()

        await courseAndprogramInformationPage.clickAndFillAddProgramStep2_WrittenExam('80','70')
        await courseAndprogramInformationPage.clickSaveButton()
        await courseAndprogramInformationPage.clickNextButton()
    });

    test('TC-12.3 ทดสอบแก้ไขรายละเอียดโครงการ | แก้ไข Step 3: คุณสมบัติ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickGoToStep('คุณสมบัติผู้สมัคร')
        await courseAndprogramInformationPage.clickEditButton()
        await courseAndprogramInformationPage.deleteQualificationByTitle(['ระดับการศึกษา']);
        await courseAndprogramInformationPage.addQualificationsButton()
        await courseAndprogramInformationPage.selectEducatuinLevel('ปริญญาตรี','ต้องสำเร็จการศึกษาระดับมัธยมศึกษา และระดับปริญญาตรีเท่านั้น')
        await courseAndprogramInformationPage.clickSaveButton()
        await courseAndprogramInformationPage.clickNextButton()
    });    

    test('TC-12.4 ทดสอบแก้ไขรายละเอียดโครงการ | แก้ไข Step 4: การแนบเอกสาร', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickGoToStep('การแนบเอกสาร')
        await courseAndprogramInformationPage.clickEditButton()
        await courseAndprogramInformationPage.deleteInformationFile(['สำเนาใบปริญญาบัตร'])
        await courseAndprogramInformationPage.clickSaveButton()
        await courseAndprogramInformationPage.clickNextButton()
    });

    test('TC-12.5 ทดสอบแก้ไขรายละเอียดโครงการ | แก้ไข Step 5: ค่าสมัคร', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickGoToStep('ค่าธรรมเนียม')
        await courseAndprogramInformationPage.clickEditButton()

        await courseAndprogramInformationPage.chooseApplicationPrice('บริหารธุรกิจ RMBA (นักศึกษาต่างชาติ)')
        await courseAndprogramInformationPage.chooseTuitonFees('บริหารธุรกิจ RMBA (นักศึกษาอาเซียน)')
        await courseAndprogramInformationPage.clickSaveButton()
        await courseAndprogramInformationPage.clickNextButton()
    });

    test('TC-12.6 ทดสอบแก้ไขรายละเอียดโครงการ | แก้ไข Step 6: ข้อมูลติดต่อ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        test.setTimeout(50000)
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickEditProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickGoToStep('ข้อมูลติดต่อ')
        await courseAndprogramInformationPage.clickEditButton()

        await courseAndprogramInformationPage.clearContactAllField()
        await courseAndprogramInformationPage.fillContactInformation('02-7273671-3','@GSBA_nida'
            ,'https://www.facebook.com/GSBANIDA','gsba@nida.ac.th','https://gsba.nida.ac.th/index/','ชั้น 2 อาคารราชพฤกษ์ 148 สถาบันบัณฑิตพัฒนบริหารศาสตร์ ถนนเสรีไทย คลองจั่น บางกะปิ กทม. 10240')
        await courseAndprogramInformationPage.fillOfficerContactInformation('นางอุมาวรรณ เอี่ยมสะอาด','027273689','นางสาวเจ้าหน้าที่ ทดสอบ','0834567890')    
        await courseAndprogramInformationPage.clickSaveButton()
        await courseAndprogramInformationPage.verifyAfterClickSaveBtn('ข้อมูลหลักสูตรและโครงการ')  
    });

    test('TC-13 ทดสอบลบข้อมูลหลักสูตรและโครงการ', async ({ admissionPage, page , courseAndprogramInformationPage }) => {
        test.setTimeout(15000)
        await courseAndprogramInformationPage.gotoBackOffice();
        await courseAndprogramInformationPage.clickToFacultyInformation()
        await courseAndprogramInformationPage.clickGSBAButton()
        await courseAndprogramInformationPage.clickDeleteProgramByName('สาขาวิชาจัดการการลงทุน');
        await courseAndprogramInformationPage.clickConfirmDeletePopup()
        await page.waitForTimeout(1500)
    });

});