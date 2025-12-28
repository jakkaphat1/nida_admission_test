import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://admissions-uat.nida.ac.th/');
  await page.getByRole('button', { name: 'Login with Google' }).click();

  await page.getByText('jakkaphat.w@kkumail.com').click();

  // รอจนกลับมาหน้าหลัก และบันทึก Session
  await page.waitForURL(/.*admissions-uat.nida.ac.th/);
  await page.context().storageState({ path: authFile });
});