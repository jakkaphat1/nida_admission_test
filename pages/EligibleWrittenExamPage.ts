import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class EligibleWrittenExamPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    notAnnouceTab
    annoucedTab
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
        this.notAnnouceTab = this.page.getByRole('button', { name: 'ยังไม่ประกาศรายชื่อผู้มีสิทธิ์สอบ' })
        this.annoucedTab = this.page.getByRole('button', { name: 'ประกาศรายชื่อผู้มีสิทธิ์สอบแล้ว' })
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoEligibleWrittenExamListMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const writtenApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครสอบวิชาเฉพาะ' })
        const eligibleWrittenExamMenu = this.page.getByRole('link', { name: 'ข้อมูลรายชื่อผู้มีสิทธิ์สอบประจำวิชาเฉพาะ' })
        await applicationWork.click()
        await basicInfoButton.click()
        await writtenApplicationListItem.click()
        await eligibleWrittenExamMenu.click()
    }

    async checkEligibleWrittenExamMenu(){
        await expect(this.notAnnouceTab).toBeVisible();
        await expect(this.annoucedTab).toBeVisible()
    }

    async clickAnnoucedTab(){
        await this.annoucedTab.click()
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

    async selectEditSubjectToOpen(subjectName:string){
        const subject = this.page.locator('.card-container').filter({hasText:subjectName}).first()
        const subjectCheckBox = subject.locator('input#exam_id')
        await subjectCheckBox.setChecked(true);
        console.log(`ตรวจสอบสถานะวิชา: ${subjectName} -> สถานะปัจจุบัน: เลือกแล้ว `);
    }

    async clearFileUpload(hoverText:string){
        const hoverPlace = this.page.getByText(hoverText)
        const clearBtn = this.page.locator('.file-container > .delete-button')
        await hoverPlace.hover()
        await clearBtn.click()
    }

    //method ค้นหาในกล่องค้นหา
    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อวิชา' })
        await searchBox.pressSequentially(searchKeyword)
    }

    // filter อื่น ๆ
    async filterMoreOption(data:{
        eduYear?:string
        semester?:string
        eduLevel?:string
        studentType?:string
        round?:string
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
        if(data.round){
            const roundDropdown = this.page.locator('div').filter({ hasText: /^ครั้งที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round , exact:true } )
            await roundDropdown.click()
            await roundOption.click()
        }
        if(data.status){
            const statusTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกสถานะทั้งหมด$/ }).nth(3)
            const statusTypeOption = this.page.getByRole('option', { name: data.status ,exact:true }).first()
            await statusTypeDropdown.click()
            await statusTypeOption.click()
        }
        await backfilterBtn.click()
    }

    async clickExpandDetailButtonByName(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const expandDetailBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await expandDetailBtn.click()
    }

    async clickVerifyDetailButtonByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const verifyDetailBtn = card.getByRole('button', { name: 'ตรวจสอบข้อมูล' })
        await verifyDetailBtn.click()
    }

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
    

    async selectSubjectForAnnouce(...subjects:string[]){
        for (const subject of subjects) {
            const subjectLocator = this.page.locator('.card-container').filter({ hasText: subject })
            const checkbox = subjectLocator.locator('#exam_id').first()
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

    async deleteExamRoom(examRoom:string){
        const card = this.page.locator('div').filter({ hasText: examRoom }).first()
        const deleteBtn = card.locator('button.delete-button').first();
        await deleteBtn.click()
    }

    async checkEligibleStudentDetailPage(...texts: string[]){
        const eligibleStudentTextBox = this.page.getByRole('textbox', { name: 'ค้นหาใบสมัคร, ชื่อ-นามสกุล' })
        await expect(eligibleStudentTextBox).toBeVisible()

        for (const text of texts) {
            const element = this.page.getByText(text)
            await element.highlight()
            await expect(element).toBeVisible()
        }
    }

    async fillSearchEligibleWrittenExamStudent(studentName:string){
        const texBox = this.page.getByRole('textbox', { name: 'ค้นหาใบสมัคร, ชื่อ-นามสกุล' })
        await texBox.pressSequentially(studentName)
    }

    async clickExpandDetailButtonBySubject(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const expandDetailBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await expandDetailBtn.click()
    }

    async filterEligibleSearchOption(subject?:string , annouce?:string){
        const subjectDropdown = this.page.locator('.react-select__indicators').first()
        const subjectOption = this.page.getByRole('option', { name: subject })
        const annouceDropdown = this.page.locator('#search-select-announceStatus > .unext-form-control > .react-select__indicators')
        const annouceOption = this.page.getByRole('option', { name: annouce })
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const filterBackBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()
        if(subject){
            await subjectDropdown.click()
            await subjectOption.click()
        }
        if(annouce){
            await annouceDropdown.click()
            await annouceOption.click()
        }
        await filterBackBtn.click()
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

    async handleExportType(type:string){
        const heading = this.page.getByRole('heading', { name: 'ประเภทไฟล์การนำออกข้อมูล' })
        const typeRadio = this.page.getByRole('radio', { name: type })
        const confirm = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(heading).toBeVisible()
        await expect(typeRadio).toBeVisible()
        await typeRadio.click()
        await confirm.click()
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

    async clickCheckboxForAnnouceEligibleListByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const checkbox = card.getByRole('checkbox').first()
        await checkbox.click()
        console.log(` เลือกประกาศสมัครสำหรับ: ${cardName}`);
    }

    async clickConfirmEligibleAnnoucementPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการทำรายการ' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }

    async clickAnnouceEligibleList(){
        const annouceEligibleBtn = this.page.getByRole('button', { name: 'ประกาศรายชื่อผู้มีสิทธิ์สอบ', exact: true })
        await annouceEligibleBtn.click()
    }










    
}