import { Page, Locator , expect } from '@playwright/test'; 

export class AdmissionScheduleInformationPage {
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

    async fillUsernameAndPassword(username:string , password:string){
        await expect(this.usernameBox).toBeVisible()
        await this.usernameBox.pressSequentially(username ,{ delay : 100 })

        await expect(this.passwordBox).toBeVisible()
        await this.passwordBox.pressSequentially(password ,{ delay : 100 })
    }

    async gotoAdmissionScheduleInformationMenu(){
        const applicationWork = this.page.getByRole('listitem', { name: 'งานรับสมัคร' })
        const basicInfoButton = this.page.getByRole('listitem', { name: 'ข้อมูลตั้งต้น' }).nth(4)
        const admissionScheduleInformationButton = this.page.getByRole('link', { name: 'ข้อมูลกำหนดการรับสมัคร' })
        await applicationWork.click()
        await basicInfoButton.click()
        await admissionScheduleInformationButton.click()
    }

    async gotoPrograms() {
        await this.page.goto('https://backoffice-uat.nida.ac.th/admin/rolesAndPermissions/master/role-permission');
    }

    async searchByFilter(data:{
        searchEventName?:string
        status?:string
        eventType?:string
    } ){
        const searchBox = this.page.getByRole('textbox', { name: 'ค้นหาชื่อกำหนดการ' })
        const filterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' })
        const backFilterBtn = this.page.getByRole('button', { name: 'ตัวกรอง' }).nth(1)
        const statusLabel = this.page.locator('.react-select__value-container').first()
        const statusOption = this.page.getByRole('option', { name: data.status, exact: true })
        const eventDropdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทกิจกรรม$/ }).nth(4)
        const eventOption = this.page.getByRole('option', { name: data.eventType })

        if(data.searchEventName){
            await searchBox.pressSequentially(data.searchEventName)
        }
        
        if(data.status){
            await statusLabel.click()
            await statusOption.click()
        }

        if(data.eventType){
            await filterBtn.click()
            await eventDropdown.click()
            await eventOption.click()
            await backFilterBtn.click()
        }
    }

    async clickAddScheduleButton(){
        const addBtn = this.page.getByRole('button', { name: 'สร้างประเภทกำหนดการ' })
        await addBtn.click()
    }

    async checkAddSchedulePage(){
        const scheduleNameTH = this.page.getByRole('textbox', { name: 'ชื่อประเภทกำหนดการ*' })
        const scheduleNameEN = this.page.getByRole('textbox', { name: 'ชื่อกำหนดการ (อังกฤษ)' })
        const scheduleTypeDroppdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
        const statusLabel = this.page.locator('span').nth(4)
        await expect(scheduleNameTH).toBeVisible()
        await expect(scheduleNameEN).toBeVisible()
        await expect(scheduleTypeDroppdown).toBeVisible()
        await expect(statusLabel).toBeVisible()
    }

    async fillInfoAddSchedulePage(data:{
        scheduleNameTH? : string
        scheduleNameEN? : string
        scheduleOption? : string
    }){
        const scheduleNameTHBox = this.page.getByRole('textbox', { name: 'ชื่อประเภทกำหนดการ*' })
        const scheduleNameENBox = this.page.getByRole('textbox', { name: 'ชื่อกำหนดการ (อังกฤษ)' })
        const scheduleTypeDroppdown = this.page.locator('div').filter({ hasText: /^เลือกประเภทนักศึกษา$/ }).nth(3)
        const scheduleOption = this.page.getByRole('option', { name: data.scheduleOption })

        if(data.scheduleNameTH){
            await scheduleNameTHBox.fill(data.scheduleNameTH)
        }

        if(data.scheduleNameEN){
            await scheduleNameENBox.fill(data.scheduleNameEN)
        }

        if(data.scheduleOption){
            await scheduleTypeDroppdown.click()
            await scheduleOption.click()
        }
    }

    async fillInfoEditSchedulePage(data:{
        scheduleNameTH? : string
        scheduleNameEN? : string
        scheduleOption? : string
    }){
        const scheduleNameTHBox = this.page.getByRole('textbox', { name: 'ชื่อประเภทกำหนดการ*' })
        const scheduleNameENBox = this.page.getByRole('textbox', { name: 'ชื่อกำหนดการ (อังกฤษ)' })
        const scheduleTypeDroppdown = this.page.locator('.react-select__indicators')
        const scheduleOption = this.page.getByRole('option', { name: data.scheduleOption })

        if(data.scheduleNameTH){
            await scheduleNameTHBox.fill(data.scheduleNameTH)
        }

        if(data.scheduleNameEN){
            await scheduleNameENBox.fill(data.scheduleNameEN)
        }

        if(data.scheduleOption){
            await scheduleTypeDroppdown.click()
            await scheduleOption.click()
        }
    }

    async clickSaveButton(){
        const saveBtn = this.page.getByRole('button', { name: 'บันทึก' })
        await saveBtn.click()
    }

    async clickEditScheduleButtonByName(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).first()
        const editButton = card.getByRole('button').nth(5)
        await editButton.click()
    }

    async clickDeleteScheduleButtonByName(cardName:string){
        const card = this.page.locator('div').filter({ hasText: cardName }).first()
        const deleteButton = card.getByRole('button').filter({ hasText: /^$/ }).nth(3)
        await deleteButton.click()
    }

    async clickConfirmDelete(){
        const popup = this.page.getByRole('heading', { name: 'ต้องการลบข้อมูล' })
        const cancel = this.page.getByRole('button', { name: 'ยกเลิก' })
        const confirm  = this.page.getByRole('button', { name: 'ยืนยัน' })
        await expect(popup).toBeVisible()
        await expect(cancel).toBeVisible()
        await expect(confirm).toBeVisible()

        await confirm.click()
    }
}