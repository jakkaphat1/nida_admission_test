import { Page, Locator , expect } from '@playwright/test'; 

export class BackOffice {
    page : Page;    

/**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    backOfficeURL = 'https://backoffice-uat.nida.ac.th/login';
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

/**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;

        this.usernameInput = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' });
        this.loginButton = this.page.getByRole('button', { name: 'เข้าสู่ระบบ' });
    }

/**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async gotoBackOffice() {
        await this.page.goto(this.backOfficeURL);
    }

    async fillUsernameANDfillPassword(username: string , password: string) {
        await this.usernameInput.scrollIntoViewIfNeeded();
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.evaluate(el => el.style.border = '3px solid red');
        await this.page.waitForTimeout(500);
        await this.usernameInput.click();
        await this.usernameInput.fill(username);

        await this.passwordInput.scrollIntoViewIfNeeded();
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }
}