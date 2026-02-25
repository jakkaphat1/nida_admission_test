import { test, expect } from '../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ เมนูข้อมูลวิชาเอก', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage ,majorSubjectPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await majorSubjectPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบไปที่เมนูข้อมูลวิชาเอก' , async ({ majorSubjectPage, page}) => {
        await majorSubjectPage.gotoPrograms();
        await majorSubjectPage.gotoMajorSubjectMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/major/);
    });

    test('TC-03 ทดสอบค้นหาข้อมูลวิชาเอก' , async ({ majorSubjectPage, page}) => {
        await majorSubjectPage.gotoPrograms();
        await majorSubjectPage.gotoMajorSubjectMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/major/);
        await majorSubjectPage.fillSearchAndFilterBox('สาขาวิชาเอกการจัดการระบบสารสนเทศ','ใช้งาน','คณะสถิติประยุกต์')
        await expect(page.getByText('สาขาวิชาเอกการจัดการระบบสารสนเทศ')).toBeVisible();
    });

    test('TC-04 ทดสอบเพิ่มวิชาเอก' , async ({ majorSubjectPage, page}) => {
        await majorSubjectPage.gotoPrograms();
        await majorSubjectPage.gotoMajorSubjectMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/major/);
        await majorSubjectPage.clickAddMajorSubjectButton()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/major\/create.*/);
        await majorSubjectPage.checkAddMajorSubjectPage()

        const data = {
            id: 'GSPA001',
            faculty: 'GSPA - คณะรัฐประศาสนศาสตร์',
            subjectTH: 'การจัดการทรัพยากรมนุษย์',
            subjectEN: 'Human Resource Management',
            subjectCN: ''
        }
        await majorSubjectPage.fillAddMajorSubjectPage(data)
        await majorSubjectPage.clickSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible();
    });

    test('TC-05 ทดสอบแก้ไขข้อมูลวิชาเอก' , async ({ majorSubjectPage, page}) => {
        await majorSubjectPage.gotoPrograms();
        await majorSubjectPage.gotoMajorSubjectMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/major/);
        await majorSubjectPage.fillSearchAndFilterBox('GSPA001','ใช้งาน')
        await majorSubjectPage.clickEditMajorSubjectCardByName('GSPA001')
        await expect(page).toHaveURL(/.*admin\/admission\/master\/major\/edit.*/);

        const editData = {
            subjectCN: '人力资源管理'
        }
        await majorSubjectPage.fillEditMajorSubjectPage(editData)
        await majorSubjectPage.clickSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible();
    });


});