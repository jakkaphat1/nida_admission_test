import { Page, Locator , expect } from '@playwright/test'; 
import { count } from 'node:console';

export class VerifyLearningApplicationPage {
    page : Page;
    /**
 * LOCATORS SECTION
 * ---------------------------------------------------------------- */
    applynedBtn
    draftApplicationBtn
    /**
 * Constructor SECTION
 * ---------------------------------------------------------------- */
    constructor(page:Page) {
        this.page = page;
        this.applynedBtn = this.page.getByRole('button', { name: 'ใบสมัคร', exact: true })
        this.draftApplicationBtn = this.page.getByRole('button', { name: 'ฉบับร่าง' })
    }
    /**
 * Method SECTION
 * ---------------------------------------------------------------- */    
    async gotoVerifyLearningApplicationMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'การทำงาน' }).nth(3)
        const learningApplicationListItem = this.page.getByRole('listitem', { name: 'การสมัครเรียน' })
        const verifyLearningApplicationMenu = this.page.getByRole('link', { name: 'ตรวจสอบใบสมัคร', exact: true })
        await applicationWork.click()
        await basicInfoButton.click()
        await learningApplicationListItem.click()
        await verifyLearningApplicationMenu.click()
    }

    async checkVerifyLearningApplicationMenu(){
        const draftApplicationTab = this.page.getByRole('button', { name: 'ฉบับร่าง' })
        const applicationTab = this.page.getByRole('button', { name: 'ใบสมัคร', exact: true })
        const confirmRegisTab = this.page.getByRole('button', { name: 'ยืนยันสิทธิ์' })
        await expect(draftApplicationTab).toBeVisible();
        await expect(applicationTab).toBeVisible()
        await expect(confirmRegisTab).toBeVisible()
    }

    async clickAnyTabByKeyword(tab:'ฉบับร่าง'|'ใบสมัคร'|'ยืนยันสิทธิ์'){
        const tabBtn = this.page.getByRole('button', { name: tab })
        const tabBtnExact = this.page.getByRole('button', { name: tab , exact:true })
        if(tab==='ฉบับร่าง'|| tab==='ยืนยันสิทธิ์'){
            await tabBtn.click()
        }
        if(tab==='ใบสมัคร'){
            await tabBtnExact.click()
        }
    }

    async clickVerifyInfoAnyTabByKeyword(tab:'ตรวจสอบข้อมูลผู้สมัคร'|'ตรวจสอบเอกสารแนบ'|'การชำระเงิน'){
        const tabBtn = this.page.getByRole('button', { name: tab })
        await tabBtn.click()
    }

    async fillSearchBox(searchKeyword:string){
        const searchBox = this.page.getByRole('textbox', { name: 'ระบุรหัสใบสมัครเรียน, เลขที่บัตรประชาชน, เลขที่หนังสือเดินทาง หรือชื่อ-นามสกุล' })
        await searchBox.pressSequentially(searchKeyword)
    }

    // filter อื่น ๆ
    async filterMoreOption(data:{
        eduYear?:string
        semester?:string
        round?:string
        faculty?:string
        eduLevel?:string
        course?:string
        program?:string
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
            const roundInputBox = this.page.locator('div').filter({ hasText: /^รอบที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round })
            await roundInputBox.click()
            await roundOption.click()
        }
        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('div').filter({ hasText: /^ระดับการศึกษา$/ }).nth(3)
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }
        if(data.faculty){
            const facultyInputBox = this.page.locator('div').filter({ hasText: /^คณะ$/ }).nth(3)
            const facultyOption = this.page.getByRole('option', { name: data.faculty })
            await facultyInputBox.click()
            await facultyOption.click()
        }
        if(data.course){
            const courseDropdown = this.page.locator('div').filter({ hasText: /^หลักสูตร$/ }).nth(3)
            const courseOption = this.page.getByRole('option', { name: data.course })
            await courseDropdown.click()
            await courseOption.click()
        }
        if(data.program){
            const programDropdown = this.page.locator('div').filter({ hasText: /^โครงการ$/ }).nth(3)
            const programOption = this.page.getByRole('option', { name: data.program ,exact:true }).first()
            await programDropdown.click()
            await programOption.click()
        }
        
        if(data.status){
            const statusDropdown = this.page.locator('div').filter({ hasText: /^สถานะการสมัคร$/ }).nth(3)
            const statusOption = this.page.getByRole('option', { name: data.status })
            await statusDropdown.click()
            await statusOption.click()
        }
        await backfilterBtn.click()
    }

    async filterApplicationMoreOption(data:{
        eduYear?:string
        semester?:string
        round?:string
        faculty?:string
        eduLevel?:string
        course?:string
        program?:string
        status?:string
        payStatus?:string
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
            const roundInputBox = this.page.locator('div').filter({ hasText: /^รอบที่$/ }).nth(3)
            const roundOption = this.page.getByRole('option', { name: data.round })
            await roundInputBox.click()
            await roundOption.click()
        }
        if(data.eduLevel){
            const eduLevelDropdown = this.page.locator('div').filter({ hasText: /^ระดับการศึกษา$/ }).nth(3)
            const eduLevelOption = this.page.getByRole('option', { name: data.eduLevel })
            await eduLevelDropdown.click()
            await eduLevelOption.click()
        }
        if(data.faculty){
            const facultyInputBox = this.page.locator('div').filter({ hasText: /^คณะ$/ }).nth(3)
            const facultyOption = this.page.getByRole('option', { name: data.faculty })
            await facultyInputBox.click()
            await facultyOption.click()
        }
        if(data.course){
            const courseDropdown = this.page.locator('div').filter({ hasText: /^หลักสูตร$/ }).nth(3)
            const courseOption = this.page.getByRole('option', { name: data.course })
            await courseDropdown.click()
            await courseOption.click()
        }
        if(data.program){
            const programDropdown = this.page.locator('div').filter({ hasText: /^โครงการ$/ }).nth(3)
            const programOption = this.page.getByRole('option', { name: data.program ,exact:true }).first()
            await programDropdown.click()
            await programOption.click()
        }
        if(data.status){
            const statusDropdown = this.page.locator('#search-select-status > .unext-form-control > .react-select__indicators')
            const statusOption = this.page.getByRole('option', { name: data.status })
            await statusDropdown.click()
            const isSelected = await statusOption.getAttribute('aria-selected')
            if (isSelected !== 'true') {
                await statusOption.click({ force: true })
            }
            await expect(statusOption).toHaveAttribute('aria-selected', 'true')
        }
        if(data.payStatus){
            const payStatusDropdown = this.page.locator('div').filter({ hasText: /^สถานะการชำระเงิน$/ }).nth(3)
            const payStatusOption = this.page.getByRole('option', { name: data.payStatus })
            await payStatusDropdown.click()
            await payStatusOption.click()
        }
        await backfilterBtn.click()
    }

    async clickResetAllFilter(){
        const resetFilterBtn = this.page.getByRole('button', { name: 'ล้างข้อมูลทั้งหมด' })
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backfilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        await filterBtn.click()
        await resetFilterBtn.click()
        await backfilterBtn.click()
    }

     async clickVerifyByIdCard(idCard: string) {
        const row = this.page.locator('tr').filter({ hasText: idCard })
        const verifyBtn = row.getByRole('button', { name: 'ตรวจสอบ' }).first()
        await verifyBtn.click()
    }

    async verifyTextVisible(...texts: string[]) {
        for (const text of texts) {
            const element = this.page.getByText(text)
            await element.highlight()
            await expect(element).toBeVisible()
        }
    }

    async checkVerifyLearningApplicationPage(){
        const candidateInfoTab = this.page.getByRole('button', { name: 'ตรวจสอบข้อมูลผู้สมัคร' })
        const attachmentInfoTab = this.page.getByRole('button', { name: 'ตรวจสอบเอกสารแนบ' })
        const paymentInfoTab = this.page.getByRole('button', { name: 'การชำระเงิน' })
        await expect(candidateInfoTab).toBeVisible()
        await expect(attachmentInfoTab).toBeVisible()
        await expect(paymentInfoTab).toBeVisible()
    }

    async clickVerifyLearningApplicationButton(){
        const verifyBtn = this.page.getByRole('button', { name: 'ยืนยันการตรวจสอบ' })
        await verifyBtn.click()
    }

    async clickConfirmVerifyApplicationPopup(){
        const heading = this.page.getByRole('heading', { name: 'ยืนยันการตรวจสอบ ?' })
        const confirmBtn = this.page.getByRole('button', { name: 'ยืนยัน', exact: true })
        await expect(heading).toBeVisible()
        await confirmBtn.click()
    }

    async clickPreviewByDocumentName(docName: string) {
        const docRow = this.page.locator('div').filter({ hasText: docName }).first()
        const newPagePromise = this.page.context().waitForEvent('page')
        await docRow.getByText('preview').click()

        const newPage = await newPagePromise
        await newPage.waitForLoadState()
        await newPage.close()
    }
}