import { Page, Locator } from '@playwright/test';

export class AdmissionPage {

  /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
  page: Page;
  url = 'https://admissions-uat.nida.ac.th/';
  emailSelector = 'input[name="email"]';
  loginButtonSelector = 'button:has-text("เข้าใช้งานระบบ")';
  projectCardSelector = 'div.flex.flex-col.overflow-hidden.rounded-xl.border';
  googleLoginSelector = 'button:has-text("Login with Google")';

  /**
 * TEST DATA SECTION
 * ---------------------------------------------------------------- */
  email = 'jakkaphat.w@kkumail.com'
  

    /**
 * Initialize SECTION
 * ---------------------------------------------------------------- */
  //ประกาศตัวแปร Locator สำหรับใช้ใน Method ของ Constructor
  loginEmailInput: Locator;
  loginButton: Locator;
  googleLoginButton: Locator;

  /**
* GETTERS SECTION
* ---------------------------------------------------------------- */
  registerButtonByProject(projectName: string): Locator { // dynamic getter
    return this.page.locator(this.projectCardSelector)
      .filter({ hasText: projectName })
      .getByRole('button', { name: 'สมัครเรียน' });
  }



  /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
  constructor(page: Page) {
    //ผูก Selector เข้ากับ Locator
    this.page = page;
    this.loginEmailInput = page.locator(this.emailSelector);
    this.loginButton = page.locator(this.loginButtonSelector);
    this.googleLoginButton = page.locator(this.googleLoginSelector);
  }


  // Method
  async goto() {
    await this.page.goto(this.url);
  }

  // Method to fill email
  async fillEmail(email: string) {
    await this.loginEmailInput.fill(email);
  }

  // Method to click login with Google
  async clickLoginWithGoogle() {
    await this.googleLoginButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();

  }

  async clickRegister(projectName: string) {
    // เจาะจงไปที่ div ที่มี aria-label="card" และมีชื่อโครงการภายใน h3
    const projectCard = this.page.locator('div[aria-label="card"]')
      .filter({ has: this.page.locator('h3', { hasText: projectName }) });

    // ตรวจสอบสถานะการมองเห็น และการมีอยู่ของข้อมูล
    await projectCard.waitFor({ state: 'visible', timeout: 15000 });

    // สั่ง Scroll แบบบังคับเพื่อให้ Card มาอยู่กลางจอ
    await projectCard.scrollIntoViewIfNeeded();

    // หาปุ่ม "สมัครเรียน" ภายใน Card นั้นโดยตรง
    const registerBtn = projectCard.getByRole('button', { name: 'สมัครเรียน' });
    
    // คลิก
    await registerBtn.click();
  
  }
  
  async gotoPrograms() {
    await this.page.goto('https://admissions-uat.nida.ac.th/programs');
}
}
