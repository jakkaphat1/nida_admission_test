import { Page, Locator , expect } from '@playwright/test'; 

export class DocumentRequirementPage {
    page:Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */

    ApplicationWork : Locator;
    InitialData
    DocumentAttachmentMenu 
    SearchBox
    filterMoreInfo
    selectEducationLevel
    facultyDropdown
    studentTypeDropdown
    educationDropdown
    addDocumentButton
    documentNumber
    educationLevel
    studentType
    faculty 
    documentNameTH
    specificDocument
    toggleStatus
    addInformationFile
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page: Page) {
        this.page = page;

        this.ApplicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        this.InitialData = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        this.DocumentAttachmentMenu  = this.page.getByRole('link', { name: 'กำหนดการแนบเอกสาร' })
        this.SearchBox = this.page.getByRole('textbox', { name: 'ค้นหารหัสหรือชื่อกำหนดเอกสาร' })

        this.filterMoreInfo = this.page.getByRole('button', { name: 'ตัวกรอง' })

        this.selectEducationLevel = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ })
        this.facultyDropdown = this.page.locator('div').filter({ hasText: /^เลือกคณะ$/ }).nth(3)
        this.studentTypeDropdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
        this.educationDropdown = this.page.locator('div').filter({ hasText: /^เลือกระดับการศึกษา$/ }).last();

        this.addDocumentButton = this.page.getByRole('button', { name: 'เพิ่มการแนบเอกสาร' })
        this.documentNumber = this.page.getByRole('textbox', { name: 'รหัสกำหนดเอกสาร*' })
        this.educationLevel = this.page.getByText('เลือกระดับการศึกษา')
        this.studentType = this.page.getByText('เลือกประเภทนักศึกษา')
        this.faculty = this.page.locator('div').filter({ hasText: /^เลือกคณะ$/ }).nth(3)
        this.documentNameTH = this.page.getByRole('textbox', { name: 'ชื่อกำหนดเอกสาร (ภาษาไทย)*' })
        this.specificDocument = this.page.getByText('กำหนดเอกสาร', { exact: true })

        this.toggleStatus = page.locator('span.label.is-checked', { hasText: 'ใช้งาน' });
        this.addInformationFile =  page.getByRole('button', { name: 'เพิ่มข้อมูล' })

    }

    /**
 * Method SECTION
 * ---------------------------------------------------------------- */

    async clickDocumentAttachmentMenu(){
        await this.ApplicationWork.click()
        await this.InitialData.click()
        await this.DocumentAttachmentMenu.click()
    }

    async searchingInsearchBox(indexOfDocument:string){
        await this.page.waitForTimeout(500)
        const searchingWord = this.SearchBox
        await searchingWord.fill(indexOfDocument)
    }

    async clearSearchingBox(){
        await this.page.waitForTimeout(500)
        const searchingBox = this.SearchBox
        await searchingBox.clear()
    }

    async clickFilterMoreInfo(){
        await this.page.waitForTimeout(500)
        await this.filterMoreInfo.click()
    }
    
    async searchByfilterBtn(edulevelName : string , facultyName :string , studentType : string){
        await this.page.waitForTimeout(500)
        await this.educationDropdown.click();
        const edu_option = this.page.getByRole('option', { name: edulevelName });
        await edu_option.waitFor({ state: 'visible' });
        await edu_option.click();

        await this.page.waitForTimeout(200)
        await this.facultyDropdown.click()
        const faculty_option = this.page.getByRole('option', { name: facultyName });
        await faculty_option.waitFor({ state: 'visible' });
        await faculty_option.click();

        await this.page.waitForTimeout(200)
        await this.studentTypeDropdown.click()
        const student_option = this.page.getByRole('option', { name: studentType });
        await student_option.waitFor({ state: 'visible' });
        await student_option.click();

    }

    async clickAddDocumentBtn(){
        await this.addDocumentButton.click()
    }

    async checkFormDetail(){
        await expect(this.documentNumber).toBeVisible();
        await expect(this.educationLevel).toBeVisible();
        await expect(this.studentType).toBeVisible();
        await expect(this.faculty).toBeVisible();
        await expect(this.documentNameTH).toBeVisible();
        await expect(this.specificDocument).toBeVisible();
    }

    async clickStstusToggle(){
        await this.toggleStatus.click()
    }

    async fillFormDetail(Documentnumber?:string , Educationlevel?:string ,Studenttype? :string, Faculty?:string, DocumentNameTH?:string){
        
        if(Documentnumber){
            await this.documentNumber.fill(Documentnumber);
        }

        if(Educationlevel){
            await this.educationLevel.click();
            await this.page.getByRole('option', { name: Educationlevel }).click()
        }
        
        if(Studenttype){
            await this.studentType.click();
            await this.page.getByRole('option', { name: Studenttype }).click()
        }

        if(Faculty){
            await this.faculty.click();
            await this.page.getByRole('option', { name: Faculty }).click()
        }    

        if(DocumentNameTH){
            await this.documentNameTH.fill(DocumentNameTH);
        }    
    }

    async deleteAllDocuments() {
        const deleteBtn = this.page.locator('button.delete-button');
        while ((await deleteBtn.count()) > 0) {
            await deleteBtn.first().click();
            await expect(deleteBtn).toHaveCount((await deleteBtn.count()) - 1, { timeout: 100 }).catch(() => {});
            await this.page.getByRole('button', { name: 'ยืนยัน' }).click()
        }
    }

    async setDocumentRequired(docName: string, isRequired: boolean) {
        // const cardSection = this.page.locator('.formLayout_container').filter({ hasText: docName }).first();
        const cardSection = this.page.locator('div.flex.flex-col')
            .filter({ hasText: docName })
            .first();
        await expect(cardSection).toBeVisible();

        const checkbox = cardSection.getByLabel('จำเป็นต้องแนบเอกสาร');

        if (isRequired) {
            await checkbox.check();
        } else {
            await checkbox.uncheck();
        }
    }

    async fillFileSize(index: number, size: number) {
        const sizeInput = this.page.locator(`input[id="details[${index}].limit_size"]`);
        await expect(sizeInput).toBeVisible();
        await sizeInput.fill(size.toString());
    }

    async clickFileTypePDF(index: number) {
        const pdfCheckbox = this.page.locator(`input[id="details[${index}].file_type_code-application/pdf"]`);
        await expect(pdfCheckbox).toBeAttached();
        await pdfCheckbox.check({ force: true });
    }

    async clickAddInformationFile(){
        await this.addInformationFile.click()
    }

    async clickSaveButton(){
        await this.page.getByRole('button', { name: 'บันทึก' }).click()
    }

    async clickEditCardInfo(cardName:string) {
        const card = this.page.locator('div.card-container')
            .filter({ hasText: cardName })
            .first();
        const editButton = card.locator('button.buttonAction_button').first();
        await expect(editButton).toBeVisible();
        await editButton.click();
    }

    async clickDeleteCardInfo(cardName:string) {
        const card = this.page.locator('div.card-container')
            .filter({ hasText: cardName })
            .first();
        const deleteButton = card.locator('.delete-button').first();
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();
    }

    async clickConfirmPopupButton(){
        await this.page.getByRole('button', { name: 'ยืนยัน' }).click()
    }
}
