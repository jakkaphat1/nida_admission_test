import { test, expect } from '../fixtures/baseTest';
import { AdmissionPage } from '../pages/AdmissionPage';

// test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('NIDA Admission Test Suite', () => {
  
  // test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)', async ({ admissionPage, page }) => {
  //   // 1. เข้าไปที่หน้าเว็บระบบรับสมัคร
  //   await admissionPage.goto();

  //   // 2. คลิกปุ่มเข้าสู่ระบบ 
  //   await admissionPage.loginButton.click(); 

  //   // 3. กรอกอีเมล (ดึงค่า email จาก TEST DATA SECTION ใน AdmissionPage)
  //   await admissionPage.fillEmail(admissionPage.email);
    
  //   // 4. ตรวจสอบผลลัพธ์ที่คาดหวัง 
  //   await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
  // });

  test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)', async ({ admissionPage, page }) => {
    await admissionPage.goto();
    await admissionPage.loginButton.click();
    await admissionPage.fillEmail(admissionPage.email);
    await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
  });

  test('TC-02 ทดสอบการเข้าสู่ระบบ', async ({ admissionPage, page }) => {
    await admissionPage.goto();
    await admissionPage.loginButton.click();
    await admissionPage.fillEmail(admissionPage.email);
    await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
  });

  test('TC-03.1 ทดสอบตรวจสอบข้อมูล Step 1: ตรวจสอบหลักสูตรที่เลือกและทุนการศึกษา กรณีหลักสูตรที่สมัครต้องการคะแนนสอบ (ไม่มีคะแนนสอบ)', async ({ admissionPage, page }) => {

    // go to admissions-uat.nida.ac.th/programs
    await admissionPage.gotoPrograms();

    // รอให้หน้าโหลดเสร็จสมบูรณ์
    await page.waitForLoadState('networkidle');
    
    // กำหนดชื่อโครงการที่ต้องการทดสอบ
    const projectName = 'รัฐประศาสนศาตรมหาบัณฑิต ภาคพิเศษ กรุงเทพมหานคร'; 
    await admissionPage.clickRegister(projectName);

    await expect(page.getByText(projectName)).toBeVisible();

    //
    await admissionPage.noScoreText.scrollIntoViewIfNeeded();
    await expect(admissionPage.noScoreText).toBeVisible();

    await admissionPage.clickRegisterWrittenExam();
  });

  // test('TC-03.2 ทดสอบตรวจสอบข้อมูล Step 1: ตรวจสอบหลักสูตรที่เลือกและทุนการศึกษา กรณีหลักสูตรที่สมัครต้องการคะแนนสอบ (คะแนนสอบผ่าน)', async ({ admissionPage, page }) => {
  //   // go to admissions-uat.nida.ac.th/programs
  //   await admissionPage.gotoPrograms();

  //   // รอให้หน้าโหลดเสร็จสมบูรณ์
  //   await page.waitForLoadState('networkidle');
    
  //   // กำหนดชื่อโครงการที่ต้องการทดสอบ
  //   const projectName = 'รัฐประศาสนศาตรมหาบัณฑิต ภาคพิเศษ กรุงเทพมหานคร'; 
  //   await admissionPage.clickRegister(projectName);

  //   await expect(page.getByText(projectName)).toBeVisible();
  // });

  test('TC-03.3 ทดสอบตรวจสอบข้อมูล Step 1: ตรวจสอบหลักสูตรที่เลือกและทุนการศึกษา กรณีหลักสูตรที่สมัครไม่ต้องการคะแนนสอบ', async ({ admissionPage, page }) => {
    // go to admissions-uat.nida.ac.th/programs
    await admissionPage.gotoPrograms();

    // รอให้หน้าโหลดเสร็จสมบูรณ์
    await page.waitForLoadState('networkidle');
    
    // กำหนดชื่อโครงการที่ต้องการทดสอบ
    const projectName = 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI)';
    await admissionPage.clickRegister(projectName);

    await expect(page.getByText(projectName)).toBeVisible();
    await page.waitForLoadState('networkidle');

    // เลือกระดับการศึกษา เป็น ปริญญาตรี ส่งค่าผ่าน method selectEducationLevel
    await admissionPage.selectEducationLevel('ปริญญาตรี');
    // (Optional) ตรวจสอบว่าเลือกติดแล้ว (ค่าใน dropdown เปลี่ยนเป็น ปริญญาตรี)
    await expect(page.locator('.react-select__control')).toContainText('ปริญญาตรี');

    await expect(page.getByText('บันทึกรายการเรียบร้อยแล้ว')).toBeVisible();
  });

  test('TC-04 ทดสอบกรอกข้อมูล Step 2: กรอกข้อมูลเบื้องต้น ', async ({ admissionPage, page }) => {
    test.setTimeout(60000);
    
    // go to admissions-uat.nida.ac.th/programs
    await admissionPage.gotoPrograms();

    // รอให้หน้าโหลดเสร็จสมบูรณ์
    await page.waitForLoadState('networkidle');
    
    // กำหนดชื่อโครงการที่ต้องการทดสอบ
    const projectName = 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI)';
    await admissionPage.clickRegister(projectName);

    await expect(page.getByText(projectName)).toBeVisible();
    await page.waitForLoadState('networkidle');

    // handle duplicate project popup
    await admissionPage.handleDuplicateProjectPopup();


    // mock data ของ นศ
    const myStudentData = {
        firstEngName: 'Nueyyy',
        lastEngName: 'Todsob',
        // TelNumber: '0812345678',
        // email: 'jakkaphatz2004@gmail.com',
        
        // Logic ที่อยู่: เลือกในประเทศ
        inCountryAddress: true,
        address: '123 ถนนสุขุมวิท',
        province: 'กรุงเทพมหานคร',
        district: 'จตุจักร',
        subDistrict: 'จอมพล',

        // การศึกษา
        graduatedInCountry: 'จบการศึกษาในประเทศ', // ต้องตรงกับ Label ปุ่ม Radio
        graduatedDate: '01/01/2569',
        universityName: 'จุฬาลงกรณ์มหาวิทยาลัย',
        educationalQualification: 'สัตวแพทยศาสตรบัณฑิต',
        gpa: '3.50',
        honor: 'เกียรตินิยมอันดับ 1',
        experienceYear: '1 ปี',
        experienceMonth: '6 เดือน',
        allExperienceYear: '2 ปี',
        allExperienceMonth: '0 เดือน',
        careerType: 'พนักงานหน่วยงานเอกชน/ลูกจ้างหน่วยงานเอกชน',

        currentWorkPlace: '333/11 ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000',
        salary: '50000',
        workPosition: 'QA Tester',
        workType: 'บริการโซลูชันระบบเทคโนโลยีสารสนเทศและดิจิทัล',
        workTelNumber: '021234567',

        currentWorkPlace2: '123 ต.ศิลา อ.เมือง จ.ขอนแก่น 40000',
        salary2: '100000',
        workPosition2: 'Senior QA Tester',
        workType2: 'บริการโซลูชันระบบเทคโนโลยีสารสนเทศและดิจิทัล',
        workTelNumber2: '0435001234',

        ieltsScore: '9',
        toeicScore: '990',
        toeflcbtScore: '300',
        toeflibtScore: '95',
        toeflitpScore: '600',
        gmatScore: '800',
        nidateapScore: '120',
      }

      await admissionPage.fillStudentInfo(myStudentData);
      await expect(page.getByText('บันทึกรายการเรียบร้อยแล้ว')).toBeVisible();

  });

});