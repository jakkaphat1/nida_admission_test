import { Page, Locator , expect } from '@playwright/test'; 

// type DateString = `${string}/${string}/${string}`;
type DateString = `${string}`;

type CalendarField =
  | "วันเปิดรับสมัคร"
  | "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ (ข้อเขียน)"
  | "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ (สอบสัมภาษณ์)"
  | "วันสอบข้อเขียน"
  | "วันสอบสัมภาษณ์"
  | "วันประกาศผลสอบข้อเขียน"
  | "วันประกาศผลการคัดเลือก"
  | "วันประกาศผลสอบข้อเขียน"
  | "วันรับเอกสารขึ้นทะเบียน"
  | "วันชำระเงินค่าลงทะเบียน"
  | "วันเปิดภาคการศึกษา"
  | "วันปฐมนิเทศ"
  | "วันรายงานตัวและบันทึกประวัติ"
  | "นักศึกษายืนยันสิทธิ์เข้าศึกษา";

interface CalendarDateInput {
  field: CalendarField;
  startDate: DateString;
  endDate: DateString;
}

export class AdmissionCalendarInformationPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    usernameBox
    passwordBox
    backOfficeLandingURL = 'https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission';

    constructor(page:Page) {
        this.page = page;
        

        this.usernameBox = this.page.getByRole('textbox', { name: 'ผู้ใช้งาน*' })
        this.passwordBox = this.page.getByRole('textbox', { name: 'รหัสผ่าน*' })
    }
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoBackOffice(){
        await this.page.goto(this.backOfficeLandingURL);
    }

    async clickNextStep(){
        const nextButton = this.page.getByRole('button', { name: 'ถัดไป' })
        await nextButton.click()
    }

    async fillUsernameAndPassword(username:string , password:string){
        await expect(this.usernameBox).toBeVisible()
        await this.usernameBox.pressSequentially(username ,{ delay : 100 })

        await expect(this.passwordBox).toBeVisible()
        await this.passwordBox.pressSequentially(password ,{ delay : 100 })
    }

    async gotoAdmissionCalendarInformationMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        const admissionCalendarInformationButton = this.page.getByRole('link', { name: 'ข้อมูลปฏิทินการรับสมัคร' })
        await applicationWork.click()
        await basicInfoButton.click()
        await admissionCalendarInformationButton.click()
    }

    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }

    async searchByFilter(data:{
        searchCalendarName?:string
        status?:string
        round?:string
        eduLevel? : string
        studentType? : string
        term? : string
        academicYear? : string
        display? : 'แสดง'|'ไม่แสดง'
    } ){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาชื่อปฏิทินรับสมัคร' })
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backFilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        const statusLabel = this.page.locator('.react-select__value-container').first()
        const statusOption = this.page.getByRole('option', { name: data.status, exact: true })
        const roundDropdown = this.page.locator('div').filter({ hasText: /^เลือกรอบที่$/ }).nth(3)
        const educationLvlDropdown = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ }).nth(3)
        const studentTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
        const termDropdown = this.page.locator('div').filter({ hasText: /^เลือกภาคการศึกษา$/ }).nth(3)
        const academicYearDropdown = this.page.locator('div').filter({ hasText: /^เลือกปีการศึกษา$/ }).nth(3)
        const displayDropdown = this.page.locator('div').filter({ hasText: /^เลือกการแสดงที่หน้ารับสมัคร$/ }).nth(3)

        if(data.searchCalendarName){
            await searchBox.pressSequentially(data.searchCalendarName)
        }
        
        if(data.status){
            await statusLabel.click()
            await statusOption.click()
        }

        // if(data.round){
        //     const roundOption = this.page.getByRole('option', { name: data.round })
        //     await filterBtn.click()
        //     await roundDropdown.click()
        //     await roundOption.click()
        // }

        // if(data.eduLevel){
        //     const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
        //     await educationLvlDropdown.click()
        //     await eduLevelOption.click()
        // }

        // if(data.studentType){
        //     const studentTypeOption = this.page.getByRole('option', { name: data.studentType })
        //     await studentTypeDropdown.click()
        //     await studentTypeOption.click()
        // }

        // if(data.term){
        //     const termOption = this.page.getByRole('option', { name: data.term })
        //     await termDropdown.click()
        //     await termOption.click()
        // }

        // if(data.academicYear){
        //     const academicYearOption = this.page.getByRole('option', { name: data.academicYear })
        //     await academicYearDropdown.click()
        //     await academicYearOption.click()
        // }

        // if(data.display){
        //     const displayOption = this.page.getByRole('option', { name: data.display, exact: true })
        //     await displayDropdown.click()
        //     await displayOption.click()
        // }

        const hasAnyFilter =
            !!(data.round || data.eduLevel || data.studentType || data.term || data.academicYear || data.display)

        if (hasAnyFilter) {
            await filterBtn.click()
        }

        if (data.round) {
            await roundDropdown.click()
            await this.page.getByRole('option', { name: data.round, exact: true }).click()
        }

        if (data.eduLevel) {
            await educationLvlDropdown.click()
            await this.page.getByRole('option', { name: data.eduLevel, exact: true }).click()
        }

        if (data.studentType) {
            await studentTypeDropdown.click()
            await this.page.getByRole('option', { name: data.studentType, exact: true }).click()
        }

        if (data.term) {
            await termDropdown.click()
            await this.page.getByRole('option', { name: data.term, exact: true }).click()
        }

        if (data.academicYear) {
            await academicYearDropdown.click()
            await this.page.getByRole('option', { name: data.academicYear, exact: true }).click()
        }

        if (data.display) {
            await displayDropdown.click()
            await this.page.getByRole('option', { name: data.display, exact: true }).click()
        }

        if (hasAnyFilter) {
            await backFilterBtn.click() // ปิด panel ตัวกรอง เพื่อดูผลลัพธ์
        }
    }

    async clickAddCalendarButton(){
        const addBtn = this.page.getByRole('button', { name: 'สร้างปฏิทิน' })
        await addBtn.click()
    }

    async checkAddCalendarPage(){
        const roundDropdown = this.page.locator('div').filter({ hasText: /^เลือกรอบที่$/ }).nth(3)
        const educationLevelDropdown = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ }).nth(3)
        const studentTypeDroppdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
        const termDropdown = this.page.locator('div').filter({ hasText: /^ภาคการศึกษาที่ 2$/ }).nth(3)
        const academicYearDropdown = this.page.locator('div').filter({ hasText: /^2569$/ }).nth(3)
        const facultyDropdonw = this.page.locator('div').filter({ hasText: /^เลือกคณะ$/ }).nth(3)
        await expect(roundDropdown).toBeVisible()
        await expect(educationLevelDropdown).toBeVisible()
        await expect(studentTypeDroppdown).toBeVisible()
        await expect(termDropdown).toBeVisible()
        await expect(academicYearDropdown).toBeVisible()
        await expect(facultyDropdonw).toBeVisible()
    }

    async filAddCalendarPageFirstStep(data:{
        display : 'แสดง'|'ไม่แสดง'
        round : string
        education : string
        student : string
        term : string
        year : string
        faculty : string
    }){
        const displayRadio = this.page.getByRole('radio', { name: data.display, exact: true })
        const roundDropdown = this.page.locator('div').filter({ hasText: /^เลือกรอบที่$/ }).nth(3)
        const educationLvlDropdown = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ }).nth(3)
        const studentTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
        const termDropdown = this.page.locator('div').filter({ hasText: /^ภาคการศึกษาที่ 2$/ }).nth(3)
        const academicYearDropdown = this.page.locator('div').filter({ hasText: /^2569$/ }).nth(3)
        const facultyDropdonw = this.page.locator('div').filter({ hasText: /^เลือกคณะ$/ }).nth(3)

        if(data.display){
            await displayRadio.click()
        }

        if(data.round){
            const roundOption = this.page.getByRole('option', { name: data.round, exact: true })
            await roundDropdown.click()
            await roundOption.click()
        }

        if(data.education){
            const educationOption = this.page.getByRole('option', { name: data.education, exact: true })
            await educationLvlDropdown.click()
            await educationOption.click()
        }

        if(data.student){
            const studentTypeOption = this.page.getByRole('option', { name: data.student, exact: true })
            await studentTypeDropdown.click()
            await studentTypeOption.click()
        }

        if(data.term){
            const termOption = this.page.getByRole('option', { name: data.term, exact: true })
            await termDropdown.click()
            await termOption.click()
        }

        if(data.year){
            const yearOption = this.page.getByRole('option', { name: data.year, exact: true })
            await academicYearDropdown.click()
            await yearOption.click()
        }

        if(data.faculty){
            const facultyOption = this.page.getByRole('option', { name: data.faculty, exact: true })
            await facultyDropdonw.click()
            await facultyOption.click()
        }
    }

    async fillScheduleDates(data: CalendarDateInput[]) {
        for (const item of data) {
            const escapedField = item.field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const row = this.page.locator("div").filter({ 
                hasText: new RegExp(`^\\d+${escapedField}$`) 
            }).first();
            const startDateInput = row.getByRole("textbox", { name: "DD/MM/YYYY" }).first();
            const endDateInput   = row.getByRole("textbox", { name: "DD/MM/YYYY" }).nth(1);

            console.log(`กำลังกรอก field: "${item.field}" | start: ${item.startDate} → end: ${item.endDate}`)

            await startDateInput.click();
            await startDateInput.pressSequentially(item.startDate );
            await this.page.keyboard.press("Tab");

            await endDateInput.click();
            await endDateInput.pressSequentially(item.endDate );
            await this.page.keyboard.press("Tab");
            await row.click()
            console.log(`กรอกเสร็จ: "${item.field}"`)
        }
    }

    async reorderScheduleRows(order: CalendarField[]) {
        for (let targetIndex = 0; targetIndex < order.length; targetIndex++) {
            const fieldName = order[targetIndex]

            const dragHandle = this.page
                .locator("div")
                .filter({ hasText: new RegExp(`${fieldName}`) })
                .locator('[role="button"][aria-roledescription="sortable"]')
                .first()

            const targetRow = this.page
                .locator('[aria-roledescription="sortable"]')
                .nth(targetIndex)

            console.log(` ย้าย "${fieldName}" → ตำแหน่งที่ ${targetIndex + 1}`)

            await dragHandle.dragTo(targetRow)
            await this.page.waitForTimeout(300)
        }
    }

    async clickSaveButton(){
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        await saveBtn.click()
    }
}