import { test, expect } from '../fixtures/baseTest';

test.describe('NIDA Admission Test Suite', () => {
  
  test('TC-01 การเข้าใช้งานระบบรับสมัคร', async ({ admissionPage, page }) => {
    // 1. เข้าไปที่หน้าเว็บระบบรับสมัคร
    await admissionPage.goto();

    // 2. คลิกปุ่มเข้าสู่ระบบ 
    await admissionPage.loginButton.click(); 

    // 3. กรอกอีเมล (ดึงค่า email จาก TEST DATA SECTION ใน AdmissionPage)
    await admissionPage.fillEmail(admissionPage.email);
    
    // 4. ตรวจสอบผลลัพธ์ที่คาดหวัง 
    await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
  });


});