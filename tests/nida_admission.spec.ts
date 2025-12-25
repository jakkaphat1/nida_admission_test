import { test, expect } from '../fixtures/baseTest';

test.describe('NIDA Admission Test Suite', () => {
  
  test('TC-01 การเข้าใช้งานระบบรับสมัคร', async ({ admissionPage, page }) => {
    await admissionPage.goto(); // 
    await admissionPage.clickLogin();
    // ตรวจสอบผลลัพธ์ที่คาดหวัง 
    await expect(page).toHaveURL(/.*admissions-uat.nida.ac.th/);
  });

  test('TC-02 ทดสอบสมัครสอบและค้นหาวิชา', async ({ admissionPage }) => {
    await admissionPage.goto();
    // ค้นหาวิชา "วิชาเฉพาะ 2" ตาม Data ใน Test Case 
    await admissionPage.searchSubject('วิชาเฉพาะ 2'); 
    // เพิ่มการตรวจสอบว่าเจอวิชาในตาราง...
  });

});