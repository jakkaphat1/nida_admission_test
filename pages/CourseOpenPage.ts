import { Page, Locator , expect } from '@playwright/test'; 
import { stat } from 'fs';

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

    async clickCourseNotOpenTab(){
        const notOpenTab = this.page.getByRole('button', { name: 'ยังไม่ประกาศเปิดรับสมัคร' })
        await notOpenTab.click()
    }

    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อหลักสูตรและโครงการ' })
        await searchBox.pressSequentially(searchKeyword)
    }

    async clickStatusByKeyword(status:string){
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const statusOption = this.page.getByRole('option', { name: status, exact: true })
        await statusDropdown.click()
        await statusOption.click()
    }
    
    async filterMoreOption(data:{
        eduYear?:string
        semester?:string
        round?:string
        eduLevel?:string
        studentType?:string
    }){
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backfilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()

        if(data.eduYear){
            const eduYearDropdown = this.page.locator('div').filter({ hasText: /^เลือกปีการศึกษา$/ }).nth(3)
            const eduYearOption = this.page.getByRole('option', { name: data.eduYear })
            await eduYearDropdown.click()
            await eduYearOption.click()
        }

        if(data.semester){
            const semesterDropdown = this.page.locator('div').filter({ hasText: /^เลือกภาคการศึกษา$/ }).nth(3)
            const semesterOption = this.page.getByRole('option', { name: data.semester })
            await semesterDropdown.click()
            await semesterOption.click()
        }

        if(data.round){
            const roundDropdown = this.page.locator('div').filter({ hasText: /^เลือกรอบที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }

        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ }).nth(3)
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }
        
        if(data.studentType){
            const studentTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
            const studentTypeOption = this.page.getByRole('option', { name: data.studentType })
            await studentTypeDropdown.click()
            await studentTypeOption.click()
        }
        await backfilterBtn.click()
    }

    async clickAddCourseOpenButton(){
        const createCourseBtn = this.page.getByRole('button', { name: 'เพิ่มข้อมูล' })
        await createCourseBtn.click()
    }

    async handleStatusToggle(targetStatus: 'ใช้งาน' | 'ไม่ใช้งาน'){
        const statusToggle = this.page.locator('span.label');
        const currentStatus = await statusToggle.innerText();
        console.log(`Current: ${currentStatus.trim()} -> Target: ${targetStatus}`);

        if (currentStatus.trim() !== targetStatus){
            await statusToggle.click()
            await expect(this.page.getByText(targetStatus , {exact:true})).toBeVisible()
        }
    }

    async fillCreateCoursePage(data:{
        eduYear?:string
        semester?:string
        round?:string
        eduLevel?:string
        studentType?:string
    }){
        if(data.eduYear){
            const eduYearDropdown = this.page.locator('.react-select__indicators').first()
            const eduYearOption = this.page.getByRole('option', { name: data.eduYear })
            await eduYearDropdown.click()
            await eduYearOption.click()
        }

        if(data.semester){
            const semesterDropdown = this.page.locator('#semester > .unext-form-control > .react-select__indicators')
            const semesterOption = this.page.getByRole('option', { name: data.semester })
            await semesterDropdown.click()
            await semesterOption.click()
        }

        if(data.round){
            const roundDropdown = this.page.locator('#round > .unext-form-control > .react-select__indicators')
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }

        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('#edulevel_code > .unext-form-control > .react-select__indicators')
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }
        
        if(data.studentType){
            const studentTypeDropdown = this.page.locator('#student_status_code > .unext-form-control > .react-select__indicators')
            const studentTypeOption = this.page.getByRole('option', { name: data.studentType })
            await studentTypeDropdown.click()
            await studentTypeOption.click()
        }
    }

    async clickSaveButton(){
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        await saveBtn.click()
    }

    async clickEditInKebabButtonByCard(cardName:string){
        const card = this.page.locator('.card-container').filter({ hasText: cardName })
        const kebabBtn = card.locator('button.menuAction_button')
        const editButton = this.page.getByRole('button', { name: 'แก้ไข' })
        await kebabBtn.click()
        await editButton.click()
    }

    async clickCopyInKebabButtonByCard(cardName:string){
        const card = this.page.locator('.card-container').filter({ hasText: cardName })
        const kebabBtn = card.locator('button.menuAction_button')
        const copyButton = this.page.getByRole('button', { name: 'คัดลอก' })
        await kebabBtn.click()
        await copyButton.click()
    }

    async fillEditCoursePage(data:{
        eduYear?:string
        semester?:string
        round?:string
        eduLevel?:string
        studentType?:string
    }){
        if(data.eduYear){
            const eduYearDropdown = this.page.locator('.react-select__indicators').first()
            const eduYearOption = this.page.getByRole('option', { name: data.eduYear })
            await eduYearDropdown.click()
            await eduYearOption.click()
        }

        if(data.semester){
            const semesterDropdown = this.page.locator('#semester > .unext-form-control > .react-select__indicators')
            const semesterOption = this.page.getByRole('option', { name: data.semester })
            await semesterDropdown.click()
            await semesterOption.click()
        }

        if(data.round){
            const roundDropdown = this.page.locator('#round > .unext-form-control > .react-select__indicators')
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }

        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('#edulevel_code > .unext-form-control > .react-select__indicators')
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }
        
        if(data.studentType){
            const studentTypeDropdown = this.page.locator('#student_status_code > .unext-form-control > .react-select__indicators')
            const studentTypeOption = this.page.getByRole('option', { name: data.studentType })
            await studentTypeDropdown.click()
            await studentTypeOption.click()
        }
    }

    async fillCopyCoursePopup(data:{
        eduYear?:string
        semester?:string
        round?:string
    }){
        if(data.eduYear){
            const eduYearDropdown = this.page.locator('.react-select__input-container')
            const eduYearOption = this.page.getByRole('option', { name: data.eduYear })
            await eduYearDropdown.click()
            await eduYearOption.click()
        }

        if(data.semester){
            const semesterDropdown = this.page.locator('#semester > .unext-form-control > .react-select__indicators')
            const semesterOption = this.page.getByRole('option', { name: data.semester })
            await semesterDropdown.click()
            await semesterOption.click()
        }

        if(data.round){
            const roundDropdown = this.page.locator('#round > .unext-form-control > .react-select__indicators')
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }
    }

    async clickConfirmCopying(){
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยันการคัดลอก' })
        await confirmBtn.click()
    }

    async clickSpecificApplicationDetails(){
        const specificApplicationButton = this.page.getByRole('button', { name: 'กำหนดรายละเอียดการเปิดรับ' })
        await specificApplicationButton.click()
    }

    async clickSpecficDetailByFaculty(faculty:string){
        const facultyRow = this.page.locator('div.flex.items-center.justify-between').filter({
            hasText: faculty
        });
        const specificDetailBtn = facultyRow.getByRole('button', { name: 'จัดทำข้อมูล' })
        await specificDetailBtn.click()
    }

    async clickCheckBoxByCourseOpen(courseName:string[]){
        for (const name of courseName){
            const course = this.page.locator('.card-container').filter({ hasText: name }).first()
            const checkBox = course.locator('#program_quota')
            await checkBox.setChecked(true);
            console.log(`เลือกหลักสูตร : ${name} แล้ว`);
        }      
    }

    async selectAdmissionPlanOpenDropdown(cardName:string , admPlanName:string){
            const admPlan = this.page.locator('.card-container').filter({ hasText: cardName }).first()
            const planDropdown = admPlan.locator('.react-select__indicators')
            const planOption = this.page.getByRole('option', { name: admPlanName })
            await planDropdown.click()
            await planOption.click()
            console.log(`เลือกแผนการรับ : ${cardName} ของหลักสูตร ${admPlanName} :  แล้ว`);
              
    }

    async clickNextButton(){
        const nextBtn = this.page.getByRole('button', { name: 'ถัดไป' })
        await nextBtn.click()
    }

    async selectApplicationPriceByOption(startDate:string,endDate:string){
        const selectPriceCheckbox = this.page.getByRole('checkbox', { name: 'กำหนดค่าสมัครเพิ่มเติม' })
        const createApplicationPriceBtn = this.page.getByRole('button', { name: 'กำหนดค่าสมัคร' })
        const startDatePicker = this.page.getByRole('textbox', { name: 'วันที่เริ่มต้น - วันที่สิ้นสุด*' })
        const endDatePicker = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' })
        // const clearDropdown = this.page.locator('.unext-form-control.react-select__control.react-select__control--is-focused > .react-select__indicators > div').first()
        // const priceDropdown = this.page.locator('.unext-form-control.unext-is-invalid > .react-select__indicators')
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน' })
        const heading = this.page.getByRole('heading', { name: 'กำหนดค่าสมัครเพิ่มเติม' })
        await selectPriceCheckbox.click()
        await createApplicationPriceBtn.click()
        await startDatePicker.pressSequentially(startDate , {delay:100})
        await endDatePicker.pressSequentially(endDate , {delay:100})
        await heading.click()
        // await clearDropdown.click()
        // await priceDropdown.click()
        // await priceOption.click()
        await confirmBtn.click()
    }

    async clickViewCalendarByCourse(courseName:string){
        const course = this.page.locator('.card-container').filter({hasText:courseName}).first()
        const calendarBtn = course.getByRole('button', { name: 'ดูกำหนดการ' })
        await calendarBtn.click()
    }

    async clickCloseViewCalendar(){
        const closeBtn = this.page.getByRole('button', { name: 'ปิด' })
        await closeBtn.click()
    }

    async clickDashboardButtonByCard(cardName:string){
        const card = this.page.locator('.card-container').filter({hasText:cardName}).first()
        const dashboardBtn = card.getByRole('button', { name: 'Dashboard' })
        await dashboardBtn.click()
    }

    async clickFacultyToSeePercentage(facultyName:string){
        const facultyCard = this.page.getByText(facultyName)
        await facultyCard.click()
        console.log(`เลือกดู : ${facultyName} `);
    }

    async clickBackToFirstPage(){
        const backFirstPage = this.page.getByRole('button', { name: 'กลับไปหน้าแรก' })
        await backFirstPage.click()
    }
}