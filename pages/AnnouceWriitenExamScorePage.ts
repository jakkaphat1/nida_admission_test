import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class AnnouceWriitenExamScorePage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    notAnnouceScoreTab
    annoucedScoreTab
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
        this.notAnnouceScoreTab = this.page.getByRole('button', { name: 'ยังไม่ประกาศผลคะแนน' })
        this.annoucedScoreTab = this.page.getByRole('button', { name: 'ประกาศผลคะแนนแล้ว' })
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoAnnouceWrittenExamScoreMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const writtenApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครสอบวิชาเฉพาะ' })
        const annouceWrittenExamScoreMenu = this.page.getByRole('link', { name: 'ตรวจสอบและประกาศคะแนน' })
        await applicationWork.click()
        await basicInfoButton.click()
        await writtenApplicationListItem.click()
        await annouceWrittenExamScoreMenu.click()
    }
    async checkAnnouceWrittenExamScoreMenu(){
        await this.notAnnouceScoreTab.highlight()
        await this.annoucedScoreTab.highlight()
        await expect(this.notAnnouceScoreTab).toBeVisible();
        await expect(this.annoucedScoreTab).toBeVisible()
    }

    //method ค้นหาในกล่องค้นหา
    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อวิชา' })
        await searchBox.pressSequentially(searchKeyword)
    }
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

    async clickAnnoucedTab(){
        await this.annoucedScoreTab.click()
    }

    async checkStudentScoreDetailPage(...texts: string[]){
        const eligibleStudentTextBox = this.page.getByRole('textbox', { name: 'ค้นหาใบสมัคร, ชื่อ-นามสกุล' })
        await expect(eligibleStudentTextBox).toBeVisible()

        for (const text of texts) {
            const element = this.page.getByText(text , {exact:true})
            await element.highlight()
            await expect(element).toBeVisible()
        }
    }

    async checkAddStudentScoreDetailPage(...texts: string[]){
        for (const text of texts) {
            const element = this.page.getByText(text , {exact:true})
            await element.highlight()
            await expect(element).toBeVisible()
        }
    }

    async clickCheckandAddStudentScoreButton(){
        const addStudentScoreBtn = this.page.getByRole('button', { name: 'ตรวจสอบและกรอกคะแนน' })
        await addStudentScoreBtn.click()
    }

    async fillStraightSpecialSubjectScoreByApplicationID(id:string, score:string){
        const inputScoreBox = this.page.getByRole('textbox', { name: 'กรุณาระบุ' })
        if(id){
            const row = this.page.locator('tr').filter({ hasText: id })
            await expect(row).toBeVisible()
            await inputScoreBox.fill(score)
        }
    }

    async clickInputScoreByFileButton(){
        const inputfileBtn = this.page.getByRole('button', { name: 'นำเข้าข้อมูลคะแนน' })
        await inputfileBtn.click()
    }

    async fillSpecialSubjectScoreByFile(filePath: string) {
        const importFileBtn = this.page.getByRole('button', { name: 'นำเข้า', exact: true })
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.getByRole('button', { name: 'เลือกไฟล์' }).click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
        await importFileBtn.click()
    }

    async clickConfirmImportScoreFile(){
        const confimrBtn = this.page.getByRole('button', { name: 'ยืนยันการนำเข้า' })
        await confimrBtn.click()
    }

    async clickConfirmImportScoreFilePopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการนำเข้า' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }

    async clickCheckboxForAnnouceScoreListByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const checkbox = card.getByRole('checkbox').first()
        await checkbox.click()
        console.log(` เลือกประกาศสมัครสำหรับ: ${cardName}`);
    }

    async clickAnnouceScoreList(){
        const annouceScoreBtn = this.page.getByRole('button', { name: 'ประกาศผลคะแนน', exact: true })
        await annouceScoreBtn.click()
    }

    async clickConfirmScoreAnnoucementPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันประกาศผลการคัดเลือก ?' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
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

    async selectCheckboxBySubject(...subjects: string[]) {

        for (const select of subjects) {
            const row = this.page.locator('.card-container').filter({hasText :select})
            const checkbox = row.locator('input[type="checkbox"]')
            await checkbox.check()
        }
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

    async clickPDFButtonForViewAnnouceByNumber(number:string){
        const card = this.page.locator('div').filter({ hasText: number}).nth(5)
        const viewButton = this.page.getByRole('button', { name: 'เปิดดู PDF' })
        await viewButton.click()
    }
}