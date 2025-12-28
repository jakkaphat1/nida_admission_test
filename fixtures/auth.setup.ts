// fixtures/auth.setup.ts
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. ไปที่หน้าแรกของระบบ
  await page.goto('https://admissions-uat.nida.ac.th/');

  // 2. คลิกปุ่ม เข้าใช้งานระบบ
  await page.getByRole('button', { name: 'เข้าใช้งานระบบ' }).click();

  // 3. กรอกอีเมล manual   ก่อน
  await page.pause();

  // 4. บันทึก Session (Cookies & Local Storage) ลงในไฟล์ user.json
  await page.context().storageState({ path: authFile });
});