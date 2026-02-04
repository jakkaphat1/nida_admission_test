import { test as setup, chromium } from '@playwright/test';
import path from 'path';

const authFile = 'playwright/.auth/user.json';

setup('Signin for backoffice', async () => {
  // ใช้ persistent context เพื่อเก็บ cookies ถาวร
  const userDataDir = path.join(__dirname, '../playwright/.auth/backoffice-user-data');
  
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
  
  await page.goto('https://backoffice-uat.nida.ac.th/login');

  await page.pause();

  await context.storageState({ path: authFile });
  
  console.log('บันทึก session สำเร็จ');
  console.log(`ไฟล์ session: ${authFile}`);

  await context.close();
});