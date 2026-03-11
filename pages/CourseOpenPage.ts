import { Page, Locator , expect } from '@playwright/test'; 

export class CourseOpenPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */

    
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
    
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoCourseOpenMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const cOpen = this.page.getByRole('link', { name: 'หลักสูตรที่เปิดรับ' })
        await applicationWork.click()
        await basicInfoButton.click()
        await cOpen.click()
    }

    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }
}