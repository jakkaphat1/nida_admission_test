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

    async selectMonthInDatepicker(monthText: string) {
      // await this.page.getByText(dateText).click();
      await this.page.getByLabel(`Select ${monthText} of`).getByText(monthText).click()
    }

    async selectYearInDatepicker(yearText:string,selectYear:string){
      await this.page.getByText(yearText).nth(1).click();
      // await this.page.getByText(selectYear).click() //getByLabel(`Select year ${selectYear}`). 
      await this.page.getByLabel(`Select year ${selectYear}`).getByText(selectYear).click()
    }

    async checkMyCalendarSpace() {
      await expect(this.page.locator('.rbc-calendar')).toBeVisible();
      await expect(this.page.locator('.rbc-month-header')).toBeVisible();
      await expect(this.page.getByRole('columnheader', { name: 'วันจันทร์' })).toBeVisible();
      await expect(this.page.locator('.rbc-month-view')).toBeVisible();
    }


    async checkCurrentMonthYear(monthYear: string) {
      await expect(this.page.getByRole('button', { name: monthYear })).toBeVisible();
    }

    async checkEventOnCalendar(eventTitle: string) {
      await expect(this.page.locator(`.rbc-event-content[title="${eventTitle}"]`)).toBeVisible();
    }

    async checkMoreItemsLink() {
        await expect(this.page.getByText(/อีก \d+ รายการ/).first()).toBeVisible();
    }

    async checkTodayHighlight() {
        await expect(this.page.locator('.rbc-day-bg.rbc-today')).toBeVisible();
    }
}