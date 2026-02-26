import { test, expect } from '../../fixtures/baseTest';

test.describe('NIDA Admission Test Suite - รายงานตัว' , () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
    });

    test('TC-02.1 ทดสอบรายงานตัว(เงื่อนไข : ผู้สมัครต้องทำการยืนยันสิทธิ์เรียบร้อยเเล้ว) | รายงานตัวครั้งแรก' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await educationReportingPage.checkReportingFirstTimePopup() //ใช้ได้เฉพาะครั้งแรกที่รายงานตัวเท่านั้น
        await educationReportingPage.clickAcceptTermPolicy()
        await educationReportingPage.clickAcceptTermPolicyButton()
    });

    test('TC-02.2 ทดสอบรายงานตัว(เงื่อนไข : ผู้สมัครต้องทำการยืนยันสิทธิ์เรียบร้อยเเล้ว) | เคยรายงานตัวแล้ว' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        // await educationReportingPage.checkReportingFirstTimePopup() //ใช้ได้เฉพาะครั้งแรกที่รายงานตัวเท่านั้น
        // await educationReportingPage.clickAcceptTermPolicy()
        // await educationReportingPage.clickAcceptTermPolicyButton()
    });

    test('TC-03 ทดสอบยืนยันตัวตน (2) ทดสอบ Verify for Foreiger (สำหรับนักศึกษาต่างชาติ) เป็นคนไทย' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ยืนยันตัวตน')
        await expect(page).toHaveURL(/.*reporting\/verification/);
        await educationReportingPage.clickVerifyForForeigner()
        await expect(page).toHaveURL(/.*reporting\/verification\/foreigner/);

        await educationReportingPage.selectFileForVerifyForeigner([
            'frontIDcard.png',
            'backIDcard.png',
            'photo.jpg'
        ])
        await educationReportingPage.clickConfirmVerification()
        await educationReportingPage.clickConfirmPopup()
        await expect(page.getByText('ทำรายการสำเร็จ')).toBeVisible()
    });

    test('TC-04 ทดสอบรับทราบระเบียบปฏิบัติการเป็นนักศึกษาของสถาบัน' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('รับทราบระเบียบปฏิบัติการเป็นนักศึกษาของสถาบัน')
        await expect(page).toHaveURL(/.*reporting\/terms/);
        await educationReportingPage.clickAcceptTermOrPolicyForUniversityRule()
        await educationReportingPage.clickConfirmButtonForUniversityRule()
        await educationReportingPage.clickConfirmInPopupForUniversityRule()
        await expect(page.getByText('ทำรายการสำเร็จ')).toBeVisible()
    });
    
    test('TC-05 ทดสอบปรับปรุงทะเบียนประวัตินักศึกษา (1) ทดสอบปรับปรุงข้อมูลขั้นตอนที่ 1 : ข้อมูลทั่วไป (แยก Step)' , async ({ admissionPage , educationReportingPage, page}) => {
        test.setTimeout(50000)
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ปรับปรุงทะเบียนประวัตินักศึกษา')
        await expect(page).toHaveURL(/.*reporting\/fullform/);
        await educationReportingPage.checkUpdateStudentRegirstrationInfo()
        // (1) ทดสอบปรับปรุงข้อมูลขั้นตอนที่ 1 : ข้อมูลทั่วไป
        await educationReportingPage.chooseFacePhoto('photo.jpg')
        await educationReportingPage.fillStudentNormalInfo('ไทย','3225016241743','30012547','นางสาว','01012566','02022570')
        await educationReportingPage.selectGender('หญิง')
        await educationReportingPage.fillStudentNameInfo({
            firstTH: 'ทดสอบ',
            lastTH: 'แอดมิชชั่น',
            firstEN: 'Todsob',
            lastEN: 'Admission'
        })
        await educationReportingPage.fillStudentContactInfo('08123456879','todsob123@gmail.com','กรุงเทพมหานคร',undefined)
        await educationReportingPage.clickSaveInfoButton()
        // await expect(page.getByText('ยืนยันการทำรายการ')).toBeVisible()
        
        await educationReportingPage.clickConfirmPopup()
        await educationReportingPage.clickNextStep()
    });

    test('TC-05 ทดสอบปรับปรุงทะเบียนประวัตินักศึกษา (2) ทดสอบปรับปรุงข้อมูลขั้นตอนที่ 2 : ข้อมูลการศึกษา (แยก Step)' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ปรับปรุงทะเบียนประวัตินักศึกษา')
        await expect(page).toHaveURL(/.*reporting\/fullform/);
        await educationReportingPage.handleStepNavigation()
        const step2Data = {
            curriculumCode: 'TGAS12001',
            curriculumName: 'หลักสูตรวิทยาศาสตรมหาบัณฑิต',
            admissionYear: '2569/ภาคการศึกษาที่ 1',
            degree: 'ปริญญาโท',
            faculty: 'GSAS - คณะสถิติประยุกต์',
            major: 'เทคโนโลยีขั้นสูงและระบบอัจฉริยะ',
            
        };
        await educationReportingPage.checkStep2Verification(step2Data);
        await educationReportingPage.clickNextStep()
    });

    test('TC-05 ทดสอบปรับปรุงทะเบียนประวัตินักศึกษา (3) ทดสอบปรับปรุงข้อมูลขั้นตอนที่ 3 : ประวัติการศึกษาเดิม (แยก Step)' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ปรับปรุงทะเบียนประวัตินักศึกษา')
        await expect(page).toHaveURL(/.*reporting\/fullform/);
        await educationReportingPage.handleStepNavigation()
        await educationReportingPage.clickNextStep()
        await educationReportingPage.checkStep3Verification()
        await educationReportingPage.fillStep3('จบการศึกษาในประเทศ','ปริญญาตรี','สัตวแพทศาสตร์บัณฑิต','3.87','01122568','ปรัชญาดุษฎีบัณฑิต (วิทยาการคอมพิวเตอร์)','จุฬาลงกรณ์มหาวิทยาลัย','เกียรตินิยมอันดับ 1')
        await educationReportingPage.clickSaveInfoButton()
        await expect(page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })).toBeVisible()
        await educationReportingPage.clickConfirmPopup()
        await educationReportingPage.clickNextStep()
    });

    test('TC-05 ทดสอบปรับปรุงทะเบียนประวัตินักศึกษา (4) ทดสอบปรับปรุงข้อมูลขั้นตอนที่ 4 : ประวัติการทำงาน (แยก Step)' , async ({ admissionPage , educationReportingPage, page}) => {
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ปรับปรุงทะเบียนประวัตินักศึกษา')
        await expect(page).toHaveURL(/.*reporting\/fullform/);
        await educationReportingPage.handleStepNavigation()
        await educationReportingPage.clickNextStep()
        await educationReportingPage.handleStepNavigation()
        const step4Data = {
            workingStatus : 'ทำงาน',
            workingAfterEducationYear : '1 ปี',
            workingAfterEducationMonth :'1 เดือน' ,
            workingAllExperienceYear : '3 ปี',
            workingAllExperienceMonth : '2 เดือน' ,
            jobs : 'นักวิศวกรคอมพิวเตอร์',
            workingPlacePresent : 'G-Able Co.ltd' ,
            salary : '50000',
            jobPosition : 'QA/Tester',
            workType : 'IT/Technology',
            workTelephone : '043321456'
        }

        // const secondWorkingHistory = {
        //     workingPlacePresent2 : 'G-Able Co.ltd' ,
        //     salary2 : '20000',
        //     jobPosition2 : 'Internship',
        //     workType2 : 'IT/Technology',
        //     workTelephone2 : '043321456'
        // }
        await educationReportingPage.fillStep4(step4Data)
        // await educationReportingPage.clickAddHistoryWorkingButton()
        // await educationReportingPage.fillHistoryWorking2(secondWorkingHistory)
        await educationReportingPage.clickSaveInfoButton()
        await expect(page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })).toBeVisible()
        await educationReportingPage.clickConfirmPopup()
        await educationReportingPage.clickNextStep()

    });

    test('TC-05 (5) ทดสอบปรับปรุงข้อมูลขั้นตอนที่ 5 : ข้อมูลผู้ปกครอง (แยก Step)' , async ({ admissionPage , educationReportingPage, page}) => {
        test.setTimeout(50000)
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ปรับปรุงทะเบียนประวัตินักศึกษา')
        await expect(page).toHaveURL(/.*reporting\/fullform/);
        await educationReportingPage.handleStepNavigation()
        await educationReportingPage.clickNextStep()
        await educationReportingPage.handleStepNavigation()
        await educationReportingPage.handleStepNavigation()
        await educationReportingPage.fillFatherInfo({
            fatherAliveStatus: 'มีชีวิตอยู่',
            fatherPrefix: 'นาย',
            fatherName: 'พ่อทดสอบ',
            fatherLastName: 'แอดมิชชั่น',
            fatherPhoneNumber: '0812345678',
            fatherEmailContact: 'phor.todsob@gmail.com'
        })

        await educationReportingPage.fillMotherInfo({
            motherAliveStatus : 'มีชีวิตอยู่',
            motherPrefix:'นาง',
            motherName: 'แม่ทดสอบ',
            motherLastName: 'แอดมิชชั่น',
            motherPhoneNumber: '0912345678',
            motherEmailContact : 'maee.todsob@gmail.com'
        })

        await educationReportingPage.fillParentInfo({
            parentPerson : 'บุคคลอื่นเป็นผู้ปกครอง',
            parentRelation : 'ผู้ปกครอง',
            parentPrefix : 'นาย',
            parentName : 'พี่ชายทดสอบ',
            parentLastName : 'แอดมิชชัน',
            parentPhoneNumber : '0621234567',
            parentEmailContact : 'phee.todsob@gmail.com'

        })

        await educationReportingPage.fillEmergencyInfo({
            emergencyParent : 'บุคคลอื่นเป็นผู้ปกครอง',
            emergencyrelationshipWith : 'ผุ้ที่ติดต่อได้กรณีฉุกเฉิน',
            emergencyprefix : 'นาย',
            emergencyName : 'พี่ชายทดสอบ',
            emergencyLastName : 'แอดมิชชัน',
            emergencyPhoneNumber : '0621234567',
            emergencyEmailContact : 'phee.todsob@gmail.com'

        })
        await educationReportingPage.clickSaveInfoButton()
        await expect(page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })).toBeVisible()
        await educationReportingPage.clickConfirmPopup()
        await educationReportingPage.clickNextStep()

    });

    test('TC-05 (6) ทดสอบปรับปรุงข้อมูลขั้นตอนที่ 6 : ที่อยู่' , async ({ admissionPage , educationReportingPage, page}) => {
        test.setTimeout(50000)
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ปรับปรุงทะเบียนประวัตินักศึกษา')
        await expect(page).toHaveURL(/.*reporting\/fullform/);
        // await educationReportingPage.handleStepNavigation()
        // await educationReportingPage.clickNextStep()
        await educationReportingPage.clickTrainButtonByName('ข้อมูลผู้ปกครอง')
        await educationReportingPage.handleStepNavigation()
        const houseData = ({
            countryName: 'ไทย' ,
            addressNumber:'123' , 
            villageNumber:'6' ,
            buildingNumber:'ไม่มีอาคาร' , 
            floorNumber: 'ชั้นที่ 8' , 
            alleyName:'ซอยข้างถนน' , 
            roadName:'ถนนใหญ่' , 
            provinceName:'กรุงเทพมหานคร' , 
            districtName:'คลองสามวา' , 
            subDistrictName:'ทรายกองดิน'
        })

        await educationReportingPage.fillAddressInfo(houseData)
        await educationReportingPage.clickAddressSameHomeRegistration()
        await educationReportingPage.clickAddressSameByParent()
        await educationReportingPage.clickAddressSameByInfoSender()
        await educationReportingPage.clickAddressSameByReceipt()
        await educationReportingPage.clickSaveInfoButton()
        await expect(page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })).toBeVisible()
        await educationReportingPage.clickConfirmPopup()
        await educationReportingPage.clickNextStep()
    });

    test('TC-05 (7) ทดสอบปรับปรุงข้อมูลขั้นตอนที่ 7 : ข้อมูลอื่นๆ' , async ({ admissionPage , educationReportingPage, page}) => {
        test.setTimeout(50000)
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ปรับปรุงทะเบียนประวัตินักศึกษา')
        await expect(page).toHaveURL(/.*reporting\/fullform/);
        await educationReportingPage.clickTrainButtonByName('ที่อยู่')
        await educationReportingPage.handleStepNavigation()
        const otherData = ({
            congenitalDisease : 'โรคเบาหวาน และความดัน' ,
            bankCompany :  '014',
            bankBranch :  'สาขาขอนแก่น',
            bankAccountOwnerName :  'นายไม่ชอบทดสอบ แอดมิชชัน',
            bankAccountOwnerNumber :  '123456789012',
        })

        await educationReportingPage.fillOtherInfo(otherData)
        await educationReportingPage.clickSaveInfoButton()
        await expect(page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })).toBeVisible()
        await educationReportingPage.clickConfirmPopup()
        await educationReportingPage.clickConfirmCheckRegistratrion()
        await educationReportingPage.clickSaveInfoButton()
        await expect(page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })).toBeVisible()
        await educationReportingPage.clickConfirmPopup()
        await expect(page).toHaveURL(/.*reporting/);
    });

    test('TC-06 ทดสอบแนบเอกสารการขึ้นทะเบียนเป็นนักศึกษา' , async ({ admissionPage , educationReportingPage, page}) => {
        test.setTimeout(50000)
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('แนบเอกสารการขึ้นทะเบียนเป็นนักศึกษา')
        await expect(page).toHaveURL(/.*reporting\/attachment/);

        const graduateCard = 'downloads/Invoice_00006830079.pdf';
        await educationReportingPage.fillAttachmentInfo('ใบจบการศึกษา',graduateCard)
        await educationReportingPage.clickSaveInfoButton()
        await expect(page.getByRole('heading', { name: 'ยืนยันการบันทึก' })).toBeVisible()
        await educationReportingPage.clickConfirmPopup()
    });

    test('TC-07 ทดสอบออกรหัสนักศึกษา และบัญชีผู้ใช้งาน' , async ({ admissionPage , educationReportingPage, page}) => {
        test.setTimeout(50000)
        await admissionPage.gotoPrograms();
        await educationReportingPage.clickReportingMenu()
        await expect(page).toHaveURL(/.*reporting/);
        await educationReportingPage.clickProcessByLabel('ออกรหัสนักศึกษา และบัญชีผู้ใช้งาน')
        await expect(page).toHaveURL(/.*reporting\/issued-applicant/);
        await educationReportingPage.clickBackToFirstPageButton()
        await expect(page).toHaveURL(/.*reporting/);
    });
});