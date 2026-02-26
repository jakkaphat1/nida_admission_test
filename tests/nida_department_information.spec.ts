import { test, expect } from '../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ เมนูข้อมูลสาขาวิชา', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ admissionPage ,departmentInformationPage, page}) => {
        await admissionPage.goto();
        await admissionPage.loginButton.click();
        await admissionPage.fillEmail(admissionPage.email);
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await departmentInformationPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบไปที่เมนูข้อมูลสาขาวิชา' , async ({ departmentInformationPage, page}) => {
        await departmentInformationPage.gotoPrograms();
        await departmentInformationPage.gotoSubjectFieldMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/subject-field/);
    });

    test('TC-03 ทดสอบค้นหาข้อมูลสาขาวิชา' , async ({ departmentInformationPage, page}) => {
        await departmentInformationPage.gotoPrograms();
        await departmentInformationPage.gotoSubjectFieldMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/subject-field/);

        const searchData = {
            searchInput:'สาขาวิชานิเทศศาสตร์และนวัตกรรม',
            status: 'ใช้งาน' as const,
            facultyName:'GSCM - คณะนิเทศศาสตร์',
        }
        await departmentInformationPage.fillSearchAndFilterBox(searchData)
    });

    test('TC-04 ทดสอบกำหนดข้อมูลสาขาวิชา' , async ({ departmentInformationPage, page}) => {
        await departmentInformationPage.gotoPrograms();
        await departmentInformationPage.gotoSubjectFieldMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/subject-field/);

        await departmentInformationPage.clickAddSubjectButton()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/subject-field\/create.*/);

        const fillData = {
            id: '10008986', 
            status:'ใช้งาน' as const,
            faculty: 'GSPA - คณะรัฐประศาสนศาสตร์', 
            subjectTH: 'การจัดการทรัพยากรมนุษย์', 
            subjectEN: 'Human Resource Management', 
            subjectCN: '',
            majorSubjectStatus:'มี',
            majorSubject:'GSPA007'
        }
        await departmentInformationPage.fillAddSubjectPage(fillData)
        await departmentInformationPage.clickSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
    });


    test('TC-05 ทดสอบแก้ไขข้อมูลสาขาวิชา' , async ({ departmentInformationPage, page}) => {
        await departmentInformationPage.gotoPrograms();
        await departmentInformationPage.gotoSubjectFieldMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/subject-field/);

        const searchData = {
            searchInput:'10008986',
            status: 'ใช้งาน' as const,
        }
        await departmentInformationPage.fillSearchAndFilterBox(searchData)
        await departmentInformationPage.clickEditSubjectCardByName('10008986')
        await expect(page).toHaveURL(/.*admin\/admission\/master\/subject-field\/edit.*/);

        const editData = {
            faculty: 'คณะสถิติประยุกต์', 
            majorSubjectStatus:'มี',
            majorSubject:'GSAS003 - สาขาวิชาเอกสถิติ',
        }

        await departmentInformationPage.fillEditMajorSubjectPage(editData)
        await departmentInformationPage.clickSaveButton()
        await expect(page.getByText('บันทึกข้อมูลสำเร็จ')).toBeVisible()
    });
});