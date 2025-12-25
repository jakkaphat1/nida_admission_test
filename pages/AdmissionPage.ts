import { Page, Locator } from '@playwright/test';

export class AdmissionPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly admissionMenu: Locator;
  readonly subjectSearchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // นิยามปุ่ม/ช่องต่างๆ ตามเอกสาร 
    this.loginButton = page.getByRole('button', { name: 'เข้าใช้งานระบบ' });
    this.admissionMenu = page.getByText('สมัครสอบ');
    this.subjectSearchInput = page.locator('input[type="text"]');
  }

  async goto() {
    await this.page.goto('https://admissions-uat.nida.ac.th/'); // 
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async searchSubject(subjectName: string) {
    await this.admissionMenu.click();
    await this.subjectSearchInput.fill(subjectName);
    await this.page.getByRole('button', { name: 'ค้นหา' }).click();
  }
}