import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';
type DateString = `${string}`;

type CalendarField =
  | "วันที่เปิดรับสมัครสอบข้อเขียน"
  | "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ"
  | "วันที่สอบ"
  | "วันประกาศผลสอบข้อเขียน";
  

interface CalendarDateInput {
  field: CalendarField;
  startDate: DateString;
  endDate: DateString;
}
export class SubjectWrittenExamPage {
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
    async gotoSubjectWrittenExamMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const subjectWritten = this.page.getByRole('link', { name: 'วิชาที่เปิดสอบข้อเขียน' })
        await applicationWork.click()
        await basicInfoButton.click()
        await subjectWritten.click()
    }

    async checkSubjectWrittenExamMenu(){
        const notOpen = this.page.getByRole('button', { name: 'ยังไม่ประกาศเปิดรับสมัคร' })
        const opened = this.page.getByRole('button', { name: 'ประกาศเปิดรับสมัครแล้ว' })
        await expect(notOpen).toBeVisible()
        await expect(opened).toBeVisible()
    }

    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อวิชา' })
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
        status?:string
    }){
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backfilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()

        if(data.eduYear){
            const eduYearDropdown = this.page.locator('div').filter({ hasText: /^ปีการศึกษา$/ }).nth(3)
            const eduYearOption = this.page.getByRole('option', { name: data.eduYear })
            await eduYearDropdown.click()
            await eduYearOption.click()
        }

        if(data.semester){
            const semesterDropdown = this.page.locator('div').filter({ hasText: /^ภาคการศึกษา$/ }).nth(3)
            const semesterOption = this.page.getByRole('option', { name: data.semester })
            await semesterDropdown.click()
            await semesterOption.click()
        }

        if(data.round){
            const roundDropdown = this.page.locator('div').filter({ hasText: /^ครั้งที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }

        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('div').filter({ hasText: /^ระดับการศึกษา$/ }).nth(3)
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }
        
        if(data.studentType){
            const studentTypeDropdown = this.page.locator('div').filter({ hasText: /^ประเภทนักศึกษา$/ }).nth(3)
            const studentTypeOption = this.page.getByRole('option', { name: data.studentType })
            await studentTypeDropdown.click()
            await studentTypeOption.click()
        }

        if(data.status){
            const statusTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกสถานะทั้งหมด$/ }).nth(3)
            const statusTypeOption = this.page.getByRole('option', { name: data.status ,exact:true }).first()
            await statusTypeDropdown.click()
            await statusTypeOption.click()
        }
        await backfilterBtn.click()
    }

    async addSubjectWrittenExamButton(){
        const writtenExamBtn = this.page.getByRole('button', { name: 'เพิ่มข้อมูล' })
        await writtenExamBtn.click()
    }

    //กรอกข้อมูลหน้าเพิ่มวิชาที่เปิดสอบข้อเขียน
    async fillAddWrittenExamPageStep1(data:{
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

    async fillEditWrittenExamPageStep1(data:{
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

    async fillAddWrittenExamPageStep2(data:{
        subject?:string
        changeDate?:'Yes' | 'No'
        startDate?:string
        endDate?:string
        fee?:string
    }){
        const viewForSubject = this.page.locator('.card-container').filter({ hasText: data.subject }).first()
        const selectSubjectCheckBox = viewForSubject.locator('#exam_id')
        
        const startDateBox = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' }).first()
        const endDateBox = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' }).nth(1)
        if(data.subject){
            await selectSubjectCheckBox.click()
        }
        if(data.changeDate=='Yes'){
            const keywordBox = this.page.locator('div').filter({ hasText: /^เปลี่ยนแปลงวันที่เปิดรับ\*$/ }).nth(2)
            const selectChangeDate = keywordBox.getByRole('checkbox').first()
            await selectChangeDate.click()
        }
        if(data.startDate && data.endDate){
            await startDateBox.click({clickCount:3})
            await startDateBox.pressSequentially(data.startDate,{delay:100})
            await endDateBox.click({clickCount:3})
            await endDateBox.pressSequentially(data.endDate,{delay:100})
        }
        if (data.fee) {
            const feeRadio = viewForSubject.locator('input[type="radio"]').filter({ 
                has: this.page.locator('..').filter({ hasText: data.fee }) 
            }).first();
            const feeOption = viewForSubject.locator('div').filter({ hasText: data.fee }).last();
            await feeOption.click();
            await feeRadio.check({ force: true });
        }
    }

    async fillEditWrittenExamPageStep2(data:{
        subject?:string
        changeDate?:'Yes' | 'No'
        startDate?:string
        endDate?:string
        fee?:string
    }){
        const viewForSubject = this.page.locator('.card-container').filter({ hasText: data.subject }).first()
        const selectSubjectCheckBox = viewForSubject.locator('#exam_id')
        
        const startDateBox = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' }).first()
        const endDateBox = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' }).nth(1)
        if(data.subject){
            const selectSubjectCheckBox = viewForSubject.locator('#exam_id');
            await selectSubjectCheckBox.setChecked(true);
        }
        if(data.changeDate=='Yes'){
            const keywordBox = this.page.locator('div').filter({ hasText: /^เปลี่ยนแปลงวันที่เปิดรับ\*$/ }).nth(2)
            const selectChangeDate = keywordBox.getByRole('checkbox').first()
            if (await selectChangeDate.isEnabled()) {
                await selectChangeDate.setChecked(true);
            }
        }
        if(data.startDate && data.endDate){
            await startDateBox.click({clickCount:3})
            await startDateBox.pressSequentially(data.startDate,{delay:100})
            await endDateBox.click({clickCount:3})
            await endDateBox.pressSequentially(data.endDate,{delay:100})
        }
        if (data.fee) {
            const feeRadio = viewForSubject.locator('input[type="radio"]').filter({ 
                has: this.page.locator('..').filter({ hasText: data.fee }) 
            }).first();
            const feeOption = viewForSubject.locator('div').filter({ hasText: data.fee }).last();
            if (!(await feeRadio.isChecked())) {
                await feeOption.click(); // คลิกที่ตัวแถวเพื่อให้ Radio เปลี่ยนสถานะ
                console.log(`เลือกค่าธรรมเนียม: ${data.fee}`);
            } else {
                console.log(`ค่าธรรมเนียม: ${data.fee} ถูกเลือกไว้อยู่แล้ว`);
            }
        }
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

    async fillEditScheduleDates(data: CalendarDateInput[]) {
        for (const item of data) {
            const escapedField = item.field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const row = this.page.locator("div").filter({ 
                hasText: new RegExp(`^\\d+${escapedField}$`) 
            }).first();
            const startDateInput = row.getByRole("textbox", { name: "DD/MM/YYYY" }).first();
            const endDateInput   = row.getByRole("textbox", { name: "DD/MM/YYYY" }).nth(1);

            console.log(`กำลังกรอก field: "${item.field}" | start: ${item.startDate} → end: ${item.endDate}`)

            await startDateInput.click({clickCount:3});
            await startDateInput.pressSequentially(item.startDate );
            await this.page.keyboard.press("Tab");

            await endDateInput.click({clickCount:3});
            await endDateInput.pressSequentially(item.endDate );
            await this.page.keyboard.press("Tab");
            await row.click()
            console.log(`กรอกเสร็จ: "${item.field}"`)
        }
    }

    async clickSaveButton(){
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        await saveBtn.click()
    }

    async confirmSaveButton(){
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(this.page.getByRole('heading', { name: 'ยืนยันการบันทึก' })).toBeVisible()
        await confirmBtn.click()
    }

    async clickNextButton(){
        const nextBtn = this.page.getByRole('button', { name: 'ถัดไป' })
        await nextBtn.click()
    }

    async clickConfirmSave(){
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(this.page.getByRole('heading', { name: 'ยืนยันการบันทึก' })).toBeVisible() 
        await confirmBtn.click()
    }

    async clickEditByCard(cardName:string){
        const card = this.page.locator('.card-container').filter({ hasText: cardName }).first()
        const editBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await editBtn.click()
    }

    async clickEditInfoButton(){
        const editInfoBtn = this.page.getByRole('button', { name: 'แก้ไข' })
        await editInfoBtn.click()
    }

    async clickUploadAnnoucementByCard(cardName:string){
        const card = this.page.locator('.card-container').filter({hasText:cardName}).first()
        const uploadBtn = card.getByRole('button', { name: 'อัปโหลดประกาศ' })
        await uploadBtn.click()
    }

    async checkUploadAnnoucementPage(subjectName:string){
        const subject = this.page.locator('.card-container').filter({hasText:subjectName}).first()
        const inputFileBox = this.page.locator('.drop-file-box')
        await expect(subject).toBeVisible()
        await expect(inputFileBox).toBeVisible()
    }

    async clickSeeAnnoucementButtonByCard(cardName:string){
        const card = this.page.locator('.card-container').filter({hasText:cardName}).first()
        const seeAnnoucemenntBtn = card.getByRole('button', { name: 'ดูประกาศ' })
        await seeAnnoucemenntBtn.click()
    }

    async clickKebabButtonForEditAnnouceByNumber(number:string){
        const card = this.page.locator('div').filter({ hasText: number}).nth(5)
        const kebabBtn = card.locator('button.menuAction_button')
        const editButton = this.page.getByRole('button', { name: 'แก้ไขประกาศ' })
        await kebabBtn.click()
        await editButton.click()
    }

    async selectSubjectToOpen(subjectName:string){
        const subject = this.page.locator('.card-container').filter({hasText:subjectName}).first()
        const subjectCheckBox = subject.locator('input#exam_id')
        await subject.click()
        await subjectCheckBox.click()
    }

    async selectEditSubjectToOpen(subjectName:string){
        const subject = this.page.locator('.card-container').filter({hasText:subjectName}).first()
        const subjectCheckBox = subject.locator('input#exam_id')
        await subjectCheckBox.setChecked(true);
        console.log(`ตรวจสอบสถานะวิชา: ${subjectName} -> สถานะปัจจุบัน: เลือกแล้ว `);
    }

    async uploadAnnouceFile(filePath: string) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.getByRole('button', { name: 'เลือกไฟล์' }).click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);

    }

    async clickConfirmUploadAnnouceFilePopup(){
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(this.page.getByRole('heading', { name: 'ยืนยันการอัปโหลดประกาศ' })).toBeVisible()
        await confirmBtn.click()
        await expect(this.page.getByText('อัปโหลดประกาศสำเร็จ')).toBeVisible()
    }

    async clearFileUpload(hoverText:string){
        const hoverPlace = this.page.getByText(hoverText)
        const clearBtn = this.page.locator('.delete-button')
        await hoverPlace.hover()
        await clearBtn.click()
    }

    async clickConfirmEditUploadAnnouceFilePopup(){
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(this.page.getByRole('heading', { name: 'ยืนยันการแก้ไขประกาศ' })).toBeVisible()
        await confirmBtn.click()
        await expect(this.page.getByText('แก้ไขประกาศสำเร็จ')).toBeVisible()
    }
}