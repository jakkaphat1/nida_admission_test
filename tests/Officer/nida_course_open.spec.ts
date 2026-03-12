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
        await courseOpenPage.clickEditInKebabButtonByCard('รอบที่ 1/2570 (ภาคการศึกษาที่ 1)')
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

    test('TC-06 ทดสอบคัดลอกข้อมูลหลักสูตรเปิดรับนักศึกษาใหม่' , async ({ commonPage , courseOpenPage , page}) => {
        await commonPage.gotoPrograms()
        await courseOpenPage.gotoCourseOpenMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
        await courseOpenPage.clickCourseNotOpenTab()
        await courseOpenPage.clickStatusByKeyword('ใช้งาน')
        await courseOpenPage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'4',
            eduLevel:'ปริญญาโท',
            studentType:'ภาคปกติ'
        })
        await expect(page.getByText('รอบที่ 4/2570 (ภาคการศึกษาที่ 1)')).toBeVisible()
        await courseOpenPage.clickCopyInKebabButtonByCard('รอบที่ 4/2570 (ภาคการศึกษาที่ 1)')
        await expect(page.getByRole('heading', { name: 'คัดลอกหลักสูตรเปิดรับนักศึกษา' })).toBeVisible()
        await courseOpenPage.fillCopyCoursePopup({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 2',
            round:'1'
        })
        await courseOpenPage.clickConfirmCopying()
        await expect(page.getByText('คัดลอกข้อมูลสำเร็จ')).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
    });

    test('TC-07 ทดสอบกำหนดรายละเอียดการเปิดรับ' , async ({ commonPage , courseOpenPage , page}) => {
        test.setTimeout(50000)
        await commonPage.gotoPrograms()
        await courseOpenPage.gotoCourseOpenMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program/);
        await courseOpenPage.clickCourseNotOpenTab()
        await courseOpenPage.clickStatusByKeyword('ใช้งาน')
        await courseOpenPage.filterMoreOption({
            eduYear:'2570',
            semester:'ภาคการศึกษาที่ 1',
            round:'4',
            // eduLevel:'ปริญญาโท',
            // studentType:'ภาคปกติ'
        })
        await expect(page.getByText('รอบที่ 4/2570 (ภาคการศึกษาที่ 1)')).toBeVisible()
        await courseOpenPage.clickSpecificApplicationDetails()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program\/faculties.*/);
        await expect(page.getByText('รอบที่ 4/2570')).toBeVisible();
        await courseOpenPage.clickSpecficDetailByFaculty('คณะสถิติประยุกต์')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program\/faculties\/quotas.*/);
        await expect(page.getByText('GSAS คณะสถิติประยุกต์')).toBeVisible();
        await courseOpenPage.clickCheckBoxByCourseOpen([
            'TGAS12001 - วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI)',
        ])
        await courseOpenPage.clickSaveButton()
        await expect(page.getByRole('alert').filter({ hasText: 'บันทึกรายการเรียบร้อยแล้ว' })).toBeVisible()
        await courseOpenPage.clickNextButton()
        await courseOpenPage.selectAdmissionPlanOpenDropdown('TGAS12001 - วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และระบบสารสนเทศ ภาคปกติ (สอบสัมภาษณ์ CSAI)','1099')
        // await courseOpenPage.selectApplicationPriceByOption('12032569','12032569')  
        await courseOpenPage.clickSaveButton()
        await expect(page.getByRole('alert').filter({ hasText: 'บันทึกรายการเรียบร้อยแล้ว' }).last()).toBeVisible()
        await courseOpenPage.clickNextButton()

        await courseOpenPage.clickViewCalendarByCourse('TGAS12001')
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program\/program-calendar.*/);
        await expect(page.locator('div').filter({ hasText: 'TGAS12001' }).nth(4)).toBeVisible()
        await courseOpenPage.clickCloseViewCalendar()
        await courseOpenPage.clickSaveButton()
        await expect(page.getByRole('alert').filter({ hasText: 'บันทึกข้อมูลสำเร็จ' })).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/transaction\/quota-program.*/);
    });
});