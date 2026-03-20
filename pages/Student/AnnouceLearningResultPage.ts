import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class AnnouceLearningResultPage {
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
        this.notAnnouceScoreTab = this.page.getByRole('button', { name: 'ยังไม่ประกาศผลการคัดเลือก' })
        this.annoucedScoreTab = this.page.getByRole('button', { name: 'ประกาศรายชื่อผลการคัดเลือก' })
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoAnnouceLearningResultMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const learningApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครเรียน' })
        const annouceLearningApplicationMenu = this.page.getByRole('link', { name: 'ตรวจสอบและประกาศผลการคัดเลือก', exact: true })
        await applicationWork.click()
        await basicInfoButton.click()
        await learningApplicationListItem.click()
        await annouceLearningApplicationMenu.click()
    }
    async checkAnnouceLearningResultMenu(){
        await this.notAnnouceScoreTab.highlight()
        await this.annoucedScoreTab.highlight()
        await expect(this.notAnnouceScoreTab).toBeVisible();
        await expect(this.annoucedScoreTab).toBeVisible()
    }

    async clickAnyTabByKeyword(tab:'ยังไม่ประกาศผลการคัดเลือก'|'ประกาศรายชื่อผลการคัดเลือก'){
        const tabBtn = this.page.getByRole('button', { name: tab })
        const tabBtnExact = this.page.getByRole('button', { name: tab})
        if(tab){
            await tabBtn.click()
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

    async highlightDetailButtonByName(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        await card.evaluate(el => el.style.backgroundColor = 'yellow');
        await expect(card).toBeVisible()
    }

    //Verify detail
    async clickVerifyDetailButtonByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const verifyDetailBtn = card.getByRole('button', { name: 'ตรวจสอบข้อมูล' })
        await verifyDetailBtn.click()
    }

    async checkStudentScoreDetailPage(...texts: string[]){
        const eligibleStudentTextBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อ-นามสกุลใบสมัคร' })
        await expect(eligibleStudentTextBox).toBeVisible()

        for (const text of texts) {
            const element = this.page.getByText(text , {exact:true})
            await element.evaluate(el => el.style.backgroundColor = 'yellow');
            await expect(element).toBeVisible()
        }
    }

    async fillSearchEligibleLearningStudent(studentName:string){
        const texBox = this.page.getByRole('textbox', { name: 'ค้นหาจากรหัส หรือชื่อ-นามสกุลใบสมัคร' })
        await texBox.pressSequentially(studentName)
    }

    async filterEligibleSearchOption(data:{
        status?:string , faculty?:string , course?:string , program?:string
    }){
        const statusDropdown = this.page.locator('div').filter({ hasText: /^สถานะ$/ }).nth(3)
        const statusOption = this.page.getByRole('option', { name: data.status })
        const facultyDropdown = this.page.locator('div').filter({ hasText: /^คณะ$/ }).nth(3)
        const facultyOption = this.page.getByRole('option', { name: data.faculty })
        const courseDropdown = this.page.locator('div').locator('div').filter({ hasText: /^หลักสูตร$/ }).nth(3)
        const courseOption = this.page.getByRole('option', { name: data.course })
        const programDropdown = this.page.locator('div').filter({ hasText: /^โครงการ$/ }).nth(3)
        const programOption = this.page.getByRole('option', { name: data.program })

        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const filterBackBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()
        if(data.status){
            await statusDropdown.click()
            await statusOption.click()
        }
        if(data.faculty){
            await facultyDropdown.click()
            await facultyOption.click()
        }
        if(data.course){
            await courseDropdown.click()
            await courseOption.click()
        }
        if(data.program){
            await programDropdown.click()
            await programOption.click()
        }
        await filterBackBtn.click()
    }

    async clickExpandDetailButtonByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const expandDetailBtn = card.getByRole('button').filter({ hasText: /^$/ }).first()
        await expandDetailBtn.click()
    }

    async clickCheckandAddStudentResultButtonByCard(cardName:string){
        const card = this.page.locator('.card-container').filter({hasText:cardName})
        const addStudentScoreBtn = card.getByRole('button', { name: 'ตรวจสอบและจัดการ' })
        await addStudentScoreBtn.click()
    }

    async handleEditStudentResultButton(){
        const editBtn = this.page.getByRole('button', { name: 'แก้ไข' })
        // await expect(editBtn).toBeVisible
        if (await editBtn.count() > 0) {
            await editBtn.click()
        }
    }

    async handlSequenceStudentResultPopup(){
        const heading = this.page.getByRole('heading', { name: 'กำหนดลำดับของการแสดงผลผู้ผ่านการคัดเลือก' })
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        // await expect(editBtn).toBeVisible
        if (await heading.count() > 0) {
            await saveBtn.click()
        }
    }

    async handleEditStudentResultButton2(){
        const editBtn = this.page.getByRole('button', { name: 'แก้ไข' })
        await editBtn.click()
    }

    async selectLearningExamResult(id: string, result: 'ผ่าน' | 'ไม่ผ่าน') {
        const row = this.page.locator('tr').filter({ hasText: id })
        const dropdown = row.locator('.react-select__indicators').first()
        await dropdown.click()
        await this.page.getByRole('option', { name: result, exact: true }).click()
    }

    async selectLearningExamResultForScholarship(id: string, result: 'ผ่าน' | 'ไม่ผ่าน',scholar:string) {
        const row = this.page.locator('tr').filter({ hasText: id })
        const dropdown = row.locator('.react-select__indicators').first()
        const scholarDropdown = row.locator('.react-select__indicators').nth(1)
        await dropdown.click()
        await this.page.getByRole('option', { name: result, exact: true }).click()
        await scholarDropdown.click()
        await this.page.getByRole('option', { name: scholar, exact: true }).click()
    }

    async editLearningExamResult(id: string, result: 'ผ่าน' | 'ไม่ผ่าน') {
        const row = this.page.locator('tr').filter({ hasText: id })
        const clearBtn = row.locator('.react-select__indicators div[aria-hidden="true"]').first()
        await clearBtn.click()
        const dropdown = row.locator('.react-select__control')
        await dropdown.click()
        await this.page.getByRole('option', { name: result, exact: true }).click()
    }

    async clickSaveButton(){
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        await saveBtn.click()
    }

    async clickNextButton(){
        const nextBtn = this.page.getByRole('button', { name: 'ถัดไป' })
        await nextBtn.click()
    }

    async clickExportButton(){
        const exportBtn = this.page.getByRole('button', { name: 'Export' })
        await exportBtn.click()
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

    // async selectProgramForAnnouce(faculty:string,...programs:string[]){
    //     const facultyCard = this.page.locator('.card-container').filter({hasText:faculty})
    //     const expand = facultyCard.getByRole('button').nth(0)
    //     await expand.click()
    //     for (const program of programs) {
    //         const programLocator = this.page.locator('.card-container').filter({ hasText: program })
    //         const checkbox = programLocator.locator('#exam_id').first()
    //         await checkbox.evaluate(el => el.style.backgroundColor = 'yellow');
    //         await checkbox.click() 
    //         await this.page.waitForTimeout(1000)
    //     }
    // }
    async selectProgramForAnnounce(faculty: string, ...programs: string[]) {
        const facultyCard = this.page.locator('.card-container').filter({ hasText: faculty })
        const expandBtn = facultyCard.getByRole('button').first()
        await expandBtn.click()

        for (const program of programs) {
            const checkbox = facultyCard.locator('.checkbox_container')
                .filter({ hasText: program })
                .locator('#exam_id')
            
            await checkbox.evaluate(el => (el as HTMLElement).style.backgroundColor = 'yellow')
            await checkbox.click()
            await this.page.waitForTimeout(1000)
        }
    }

    async uploadAnnouceFile(filePath: string) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.getByRole('button', { name: 'เลือกไฟล์' }).click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
    }


    async clickConfirmUploadAnnoucementPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการอัปโหลดประกาศ' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }

    async clickConfirmReUploadAnnoucementPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการแก้ไขประกาศ' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }

    async clickCheckboxForAnnouceResultListByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const checkbox = card.getByRole('checkbox').first()
        await checkbox.click()
        console.log(` เลือกประกาศสมัครสำหรับ: ${cardName}`);
    }

    async clickAnnouceScoreList(){
        const annouceScoreBtn = this.page.getByRole('button', { name: 'ประกาศผลการคัดเลือก', exact: true })
        await annouceScoreBtn.click()
    }

    async clickConfirmResultAnnoucementPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันประกาศผลการคัดเลือก' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }




    //See Annnouce
    async clickSeeAnnoucementButtonByCard(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).nth(5)
        const seeAnnoucementBtn = card.getByRole('button', { name: 'ดูประกาศ' }).first()
        await seeAnnoucementBtn.click()
    }

    //Edit annouce
    async clickKebabButtonForEditAnnouceByNumber(number:string){
        const card = this.page.locator('div').filter({ hasText: number}).nth(5)
        const kebabBtn = card.locator('button.menuAction_button')
        const editButton = this.page.getByRole('button', { name: 'แก้ไขประกาศ' })
        await kebabBtn.click()
        await editButton.click()
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