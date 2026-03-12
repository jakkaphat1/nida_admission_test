import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/การทำงาน/หลักสูตรที่เปิดรับ', () => {
    test('TC-01 ทดสอบการเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบการเข้าเมนูหลักสูตรที่เปิดรับ' , async ({ commonPage , courseOpenPage , page}) => {
        await commonPage.gotoPrograms()
        await courseOpenPage.gotoCourseOpenMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
    });

    test('TC-03 ทดสอบค้นหาข้อมูลหลักสูตรที่ยังไม่เปิดรับสมัคร' , async ({ commonPage , courseOpenPage , page}) => {
        await commonPage.gotoPrograms()
        await courseOpenPage.gotoCourseOpenMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
        await courseOpenPage.clickCourseNotOpenTab()
        await courseOpenPage.fillSearchBox('สถิติประยุกต์')
        await courseOpenPage.clickStatusByKeyword('ใช้งาน')
        await courseOpenPage.filterMoreOption({
            eduYear:'2569',
            semester:'ภาคการศึกษาที่ 2',
            round:'1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ'
        })
        await expect(page.getByText('รอบที่ 1/2569 (ภาคการศึกษาที่ 2)')).toBeVisible()
    });    

    test('TC-04 ทดสอบกำหนดข้อมูลหลักสูตรเปิดรับนักศึกษาใหม่' , async ({ commonPage , courseOpenPage , page}) => {
        await commonPage.gotoPrograms()
        await courseOpenPage.gotoCourseOpenMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
        await courseOpenPage.clickAddCourseOpenButton()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program\/create.*/);
        await courseOpenPage.handleStatusToggle('ไม่ใช้งาน')
        await courseOpenPage.fillCreateCoursePage({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ'
        })
        await courseOpenPage.clickSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
    });

    test('TC-05 ทดสอบแก้ไขข้อมูลหลักสูตรเปิดรับนักศึกษาใหม่' , async ({ commonPage , courseOpenPage , page}) => {
        await commonPage.gotoPrograms()
        await courseOpenPage.gotoCourseOpenMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
        await courseOpenPage.clickCourseNotOpenTab()
        await courseOpenPage.clickStatusByKeyword('ไม่ใช้งาน')
        await courseOpenPage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'1',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ'
        })
        await expect(page.getByText('รอบที่ 1/2570 (ภาคการศึกษาที่ 1)')).toBeVisible()
        await courseOpenPage.clickKebabButtonByCard('รอบที่ 1/2570 (ภาคการศึกษาที่ 1)')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program\/edit.*/);
        await page.waitForLoadState('networkidle')
        await courseOpenPage.fillEditCoursePage({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'4',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ'
        })
        await courseOpenPage.handleStatusToggle('ใช้งาน')
        await courseOpenPage.clickSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
    });
});