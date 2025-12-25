import { Page, Locator } from '@playwright/test';

export class AdmissionPage {
  readonly page: Page;

  readonly url = 'https://admissions-uat.nida.ac.th/';
  readonly emailSelector = 'input[name="email"]';
  readonly loginButtonSelector = 'button:has-text("เข้าใช้งานระบบ")';

  //ประกาศตัวแปร Locator สำหรับใช้ใน Method
  readonly loginEmailInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    //ผูก Selector เข้ากับ Locator
    this.loginEmailInput = page.locator(this.emailSelector);
    this.loginButton = page.locator(this.loginButtonSelector);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillEmail(email: string) {
    await this.loginEmailInput.fill(email);
  }
}