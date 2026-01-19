// fixtures/auth.setup.ts
// import { test as setup } from '@playwright/test';

// const authFile = 'playwright/.auth/user.json';

// setup('authenticate', async ({ page }) => {
//   // 1. ไปที่หน้าแรกของระบบ
//   await page.goto('https://admissions-uat.nida.ac.th/');

//   // 2. คลิกปุ่ม เข้าใช้งานระบบ
//   await page.getByRole('button', { name: 'เข้าใช้งานระบบ' }).click();

//   // 3. กรอกอีเมล manual   ก่อน
//   await page.pause();

//   // 4. บันทึก Session (Cookies & Local Storage) ลงในไฟล์ user.json
//   await page.context().storageState({ path: authFile });
// });

import { test as setup, chromium } from '@playwright/test';
import path from 'path';

const authFile = 'playwright/.auth/user.json';

setup('authenticate with Google', async () => {
  // ใช้ persistent context เพื่อเก็บ cookies ถาวร
  const userDataDir = path.join(__dirname, '../playwright/.auth/chrome-user-data');
  
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: null,
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
    ],
  });

  const page = await context.newPage();

  // ซ่อน webdriver detection
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });
  });
  
  await page.goto('https://admissions-uat.nida.ac.th/');

  await page.getByRole('button', { name: 'เข้าใช้งานระบบ' }).click();

  await page.pause();

  await context.storageState({ path: authFile });
  
  console.log('บันทึก session สำเร็จ');
  console.log(`ไฟล์ session: ${authFile}`);

  await context.close();
});