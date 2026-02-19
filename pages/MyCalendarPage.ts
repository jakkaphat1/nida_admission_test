import { Page, Locator , expect } from '@playwright/test'; 

export class MyCalendarPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
   myCalendarMenu
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    constructor (page:Page){
      this.page = page;
      this.myCalendarMenu = this.page.getByRole('link', { name: 'ปฎิทินของฉัน' })
    }




    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async clickMyCalendarMenu(){
      await this.myCalendarMenu.click()
    }

    async checkMyCalendarLandingPage(){
      const studyApplication = this.page.getByRole('button', { name: 'สมัครสอบข้อเขียน' })
      const writtenExamApplication = this.page.getByRole('button', { name: 'สมัครเรียน' })

      await expect(studyApplication).toBeVisible()
      await expect(writtenExamApplication).toBeVisible()
    }

    async selectMonthYearDropdown(dateText: string) {
      await this.page.getByRole('button').filter({ hasText: dateText }).click();
    }

    async selectMonthYear(dateText: string) {
      await this.page.getByText(dateText).click();
    }
}