import { test, expect } from '../fixtures/baseTest';

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



});