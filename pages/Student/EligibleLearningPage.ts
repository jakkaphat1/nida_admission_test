import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class EligibleLearningPage {
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
    async gotoEligibleLearningMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const learningApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครเรียน' })
        const eligibleLearningApplicationMenu = this.page.getByRole('link', { name: 'ข้อมูลรายชื่อผู้มีสิทธิ์สอบประจำโครงการ', exact: true })
        await applicationWork.click()
        await basicInfoButton.click()
        await learningApplicationListItem.click()
        await eligibleLearningApplicationMenu.click()
    }

    async checkLearningEligibleMenu(){
        const notAnnouce = this.page.getByRole('button', { name: 'ยังไม่ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' })
        const annouced = this.page.getByRole('button', { name: 'ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' }).nth(1)
        await expect(notAnnouce).toBeVisible();
        await expect(annouced).toBeVisible()
    }

    async clickAnyTabByKeyword(tab:'ยังไม่ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ'|'ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ'){
        const tabBtn = this.page.getByRole('button', { name: tab })
        const tabBtnExact = this.page.getByRole('button', { name: tab}).nth(1)
        if(tab==='ยังไม่ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ'){
            await tabBtn.click()
        }
        if(tab==='ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ'){
            await tabBtnExact.click()
        }
        
    }

    //method ค้นหาในกล่องค้นหา
    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อหลักสูตรและโครงการ' })
        await searchBox.pressSequentially(searchKeyword)
    }

    async filterMoreOption(data:{
        eduYear?:string
        semester?:string
        eduLevel?:string
        studentType?:string
        round?:string

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
        if(data.round){
            const roundDropdown = this.page.locator('div').filter({ hasText: /^เลือกรอบที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }
        await backfilterBtn.click()
    }

    async clickExpandDetailButtonByName(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const expandDetailBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await expandDetailBtn.click()
    }

    async clickStatusByKeyword(status:string){
        const statusDropdown = this.page.locator('.react-select__value-container').first()
        const statusOption = this.page.getByRole('option', { name: status, exact: true })
        await statusDropdown.click()
        await statusOption.click()
    }

//Verify
    async clickVerifyDetailButtonByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const verifyDetailBtn = card.getByRole('button', { name: 'ตรวจสอบข้อมูล' })
        await verifyDetailBtn.click()
    }

    async checkEligibleStudentDetailPage(...texts: string[]){
        const eligibleStudentTextBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อ-นามสกุลใบสมัคร' })
        await expect(eligibleStudentTextBox).toBeVisible()

        for (const text of texts) {
            const element = this.page.getByText(text)
            await element.highlight()
            await expect(element).toBeVisible()
        }
    }

    async fillSearchEligibleLearningStudent(studentName:string){
        const texBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อ-นามสกุลใบสมัคร' })
        await texBox.pressSequentially(studentName)
    }

    async filterEligibleSearchOption(data: {
        status?: string
        faculty?: string
        course?: string
        program?: string
    }) {
        const statusDropdown = this.page.locator('div').filter({ hasText: /^สถานะ$/ }).nth(3)
        const statusOption = this.page.getByRole('option', { name: data.status })
        const facutltyDropdown = this.page.locator('div').filter({ hasText: /^คณะ$/ }).nth(3)
        const facutltyOption = this.page.getByRole('option', { name: data.faculty })
        const courseDropdown = this.page.locator('div').filter({ hasText: /^หลักสูตร$/ }).nth(3)
        const courseOption = this.page.getByRole('option', { name: data.course })
        const programDropdown = this.page.locator('div').filter({ hasText: /^โครงการ$/ }).nth(3)
        const programOption = this.page.getByRole('option', { name: data.program })

        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const filterBackBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        
        await filterBtn.click()
        if (data.status) {
            await statusDropdown.click()
            await statusOption.click()
        }
        if (data.faculty) {
            await facutltyDropdown.click()
            await facutltyOption.click()
        }
        if (data.course) {
            await courseDropdown.click()
            await courseOption.click()
        }
        if (data.program) {
            await programDropdown.click()
            await programOption.click()
        }
        await filterBackBtn.click()
    }

    async clickExpandDetailButtonByCourse(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const expandDetailBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await expandDetailBtn.click()
    }
    async clickCheckboxBySubject(subjectName:string){
        const card = this.page.locator('.input-and-title').filter({hasText:subjectName})
        const checkbox = card.locator('#appication_form')
        await checkbox.click()
    }

    async clickExportButton(){
        const exportBtn = this.page.getByRole('button', { name: 'EXPORT' })
        await exportBtn.click()
    }

    async handleExportPopup(){
        const heading = this.page.getByRole('heading', { name: 'คุณต้องการนำออกไฟล์ ?' })
        const confirm = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(heading).toBeVisible()
        await confirm.click()
    }

//Upload
    async clickUploadAnnoucementButtonByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const verifyDetailBtn = card.getByRole('button', { name: 'อัปโหลดประกาศ' }).first()
        await verifyDetailBtn.click()
    }

    async checkUploadAnnoucementPage(...texts: string[]){
        const dropBox = this.page.locator('.drop-file-box')
        await expect(dropBox).toBeVisible()

        for (const text of texts) {
            const element = this.page.getByText(text)
            await element.highlight()
            await expect(element).toBeVisible()
        }
    }

    async selectFacultyForAnnouce(...facultys:string[]){
        for (const faculty of facultys) {
            const facultyLocator = this.page.locator('.card-container').filter({ hasText: faculty })
            const checkbox = facultyLocator.locator('#exam_id').first()
            await checkbox.click() 
        }
    }

    async selectTime(locator: Locator, time: string) {
        const [hour, minute] = time.split(':')
        
        await locator.click()
        
        // ใช้ attribute selector แทน id selector
        await this.page.locator('.hour-container')
            .locator(`[id="${hour}"]`)
            .click()
        
        await this.page.locator('.minute-container')
            .locator(`[id="${minute}"]`)
            .click()
    }

    async selectExamRoomDetail(data : {
        examRoom1 : string
        examDate1 : string
        examStart1 : string
        examEnd1 : string
        seat1 : string
        addRoom? : 'Yes'|'No'
        examRoom2? : string
        examDate2? : string
        examStart2? : string
        examEnd2? : string
        seat2? : string
    }){
        const examRoomInput1 = this.page.getByRole('textbox', { name: 'ชื่อห้องสอบ' })
        const examDatePicker1 = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' })
        const examStartTimePicker1 = this.page.getByRole('textbox', { name: ':00' }).first()
        const examEndTimePicker1 = this.page.getByRole('textbox', { name: ':00' }).nth(1)
        const seatInput1 = this.page.getByRole('textbox', { name: 'ลำดับที่นั่งสอบ' })
        const addRoomBtn = this.page.getByRole('button', { name: 'เพิ่มข้อมูลห้องสอบ' })
        const examRoomInput2 = this.page.getByRole('textbox', { name: 'ชื่อห้องสอบ' }).nth(1)
        const examDatePicker2 = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' }).nth(1)
        const examStartTimePicker2 = this.page.getByRole('textbox', { name: ':00' }).nth(2)
        const examEndTimePicker2 = this.page.getByRole('textbox', { name: ':00' }).nth(3)
        const seatInput2 = this.page.getByRole('textbox', { name: 'ลำดับที่นั่งสอบ' }).nth(1)
        if(data.examRoom1){
            await examRoomInput1.pressSequentially(data.examRoom1)
        }
        if(data.examDate1){
            await examDatePicker1.click({clickCount:3})
            await examDatePicker1.pressSequentially(data.examDate1)
        }
        if(data.examStart1){
            await this.selectTime(examStartTimePicker1, data.examStart1)
        }
        if(data.examEnd1){
            await this.selectTime(examEndTimePicker1, data.examEnd1)
        }
        if(data.seat1){
            await seatInput1.pressSequentially(data.seat1)
        }

        if(data.addRoom==='Yes'){
            await addRoomBtn.click()
                if(data.examRoom2){
                    await examRoomInput2.pressSequentially(data.examRoom2)
            }
                if(data.examDate2){
                    await examDatePicker2.click({clickCount:3})
                    await examDatePicker2.pressSequentially(data.examDate2)
            }
                if(data.examStart2){
                    await this.selectTime(examStartTimePicker2, data.examStart2)
            }
                if(data.examEnd2){
                    await this.selectTime(examEndTimePicker2, data.examEnd2)
            }
                if(data.seat2){
                    await seatInput2.pressSequentially(data.seat2)
            }
        }
    }

    async uploadAnnouceFile(filePath: string) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.getByRole('button', { name: 'เลือกไฟล์' }).click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
    }

    async clickSaveButton(){
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        await saveBtn.click()
    }

    async clickConfirmUploadAnnoucementPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการอัปโหลดประกาศ' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }

 //Annouce
    async clickCheckboxForAnnouceEligibleListByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const checkbox = card.getByRole('checkbox').first()
        await checkbox.click()
        console.log(` เลือกประกาศสมัครสำหรับ: ${cardName}`);
    }   
    async clickAnnouceEligibleList(){
        const annouceEligibleBtn = this.page.locator('button').filter({ hasText: /^ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ$/ })
        await annouceEligibleBtn.click()
    }
    async clickConfirmEligibleAnnoucementPopup(){
        const heading = this.page.getByRole('heading', { name: 'ประกาศรายชื่อผู้มีสิทธิ์สอบประจำโครงการ' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }

    async clickSeeAnnoucementButtonByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const seeAnnoucementBtn = card.getByRole('button', { name: 'ดูประกาศ' }).first()
        await seeAnnoucementBtn.click()
    }

    async clickKebabButtonForEditAnnouceByNumber(number:string){
        const card = this.page.locator('div').filter({ hasText: number}).nth(5)
        const kebabBtn = card.locator('button.menuAction_button')
        const editButton = this.page.getByRole('button', { name: 'แก้ไขประกาศ' })
        await kebabBtn.click()
        await editButton.click()
    }

    async deleteExamRoom(examRoom:string){
        const card = this.page.locator('div').filter({ hasText: examRoom }).first()
        const deleteBtn = card.locator('button.delete-button').first();
        await deleteBtn.click()
    }

    async editExamRoomDetail(data : {
        examRoom1 : string
        examDate1 : string
        examStart1 : string
        examEnd1 : string
        seat1 : string
        addRoom? : 'Yes'|'No'
        examRoom2? : string
        examDate2? : string
        examStart2? : string
        examEnd2? : string
        seat2? : string
    }){
        const examRoomInput1 = this.page.getByRole('textbox', { name: 'ชื่อห้องสอบ' }).first()
        const examDatePicker1 = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' }).first()
        const examStartTimePicker1 = this.page.getByRole('textbox', { name: ':00' }).first()
        const examEndTimePicker1 = this.page.getByRole('textbox', { name: ':00' }).nth(1)
        const seatInput1 = this.page.getByRole('textbox', { name: 'ลำดับที่นั่งสอบ' }).first()
        const addRoomBtn = this.page.getByRole('button', { name: 'เพิ่มข้อมูลห้องสอบ' })
        const examRoomInput2 = this.page.getByRole('textbox', { name: 'ชื่อห้องสอบ' }).nth(1)
        const examDatePicker2 = this.page.getByRole('textbox', { name: 'DD/MM/YYYY' }).nth(1)
        const examStartTimePicker2 = this.page.getByRole('textbox', { name: ':00' }).nth(2)
        const examEndTimePicker2 = this.page.getByRole('textbox', { name: ':00' }).nth(3)
        const seatInput2 = this.page.getByRole('textbox', { name: 'ลำดับที่นั่งสอบ' }).nth(1)
        if(data.examRoom1){
            await examRoomInput1.click({clickCount:3})
            await examRoomInput1.pressSequentially(data.examRoom1)
        }
        if(data.examDate1){
            await examDatePicker1.click({clickCount:3})
            await examDatePicker1.pressSequentially(data.examDate1)
        }
        if(data.examStart1){
            await this.selectTime(examStartTimePicker1, data.examStart1)
        }
        if(data.examEnd1){
            await this.selectTime(examEndTimePicker1, data.examEnd1)
        }
        if(data.seat1){
            await seatInput1.click({clickCount:3})
            await seatInput1.pressSequentially(data.seat1)
        }

        if(data.addRoom==='Yes'){
            await addRoomBtn.click()
                if(data.examRoom2){
                    await examRoomInput2.click({clickCount:3})
                    await examRoomInput2.pressSequentially(data.examRoom2)
            }
                if(data.examDate2){
                    await examDatePicker2.click({clickCount:3})
                    await examDatePicker2.pressSequentially(data.examDate2)
            }
                if(data.examStart2){
                    await this.selectTime(examStartTimePicker2, data.examStart2)
            }
                if(data.examEnd2){
                    await this.selectTime(examEndTimePicker2, data.examEnd2)
            }
                if(data.seat2){
                    await seatInput2.click({clickCount:3})
                    await seatInput2.pressSequentially(data.seat2)
            }
        }
    }

    async clearFileUpload(hoverText:string){
        const hoverPlace = this.page.getByText(hoverText)
        const clearBtn = this.page.locator('.file-container > .delete-button')
        await hoverPlace.hover()
        await clearBtn.click()
    }

    async clickConfirmEditUploadAnnoucementPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการแก้ไขประกาศ' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }

    async clickPDFButtonForViewAnnouceByNumber(number:string){
        const card = this.page.locator('div').filter({ hasText: number}).nth(5)
        const viewButton = this.page.getByRole('button', { name: 'เปิดดู PDF' })
        await viewButton.click()
    }
}