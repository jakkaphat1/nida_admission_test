import { test, expect } from '../../fixtures/baseTest';

test.describe('Test Script - NIDA Backoffice โมดูล ADM งานรับสมัคร/ข้อมูลตั้งต้น/ข้อมูลปฏิทินการรับสมัคร', () => {
    test('TC-01 การเข้าใช้งานระบบรับสมัคร (NIDA Admission)' , async ({ commonPage , page}) => {
        await commonPage.gotoBackOfficeLogin();
        await expect(page).toHaveURL('https://backoffice-uat.nida.ac.th/login/');
        await commonPage.fillUsernameAndPassword('sys_admin1','unext@2022')
    });

    test('TC-02 ทดสอบการเข้าเมนูข้อมูลปฏิทินการรับสมัคร' , async ({ admissionCalendarInformationPage, page}) => {
        await admissionCalendarInformationPage.gotoPrograms()
        await admissionCalendarInformationPage.gotoAdmissionCalendarInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar/);
    });

    test('TC-03 ทดสอบค้นหาปฏิทิน' , async ({ admissionCalendarInformationPage, page}) => {
        await admissionCalendarInformationPage.gotoPrograms()
        await admissionCalendarInformationPage.gotoAdmissionCalendarInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar/);

        const searchInfo = {
            searchCalendarName:'ปฏิทินรับสมัคร ปี 2569 ครั้งที่ 4 ภาคการศึกษาที่ 1 ปริญญาโท ภาคปกติ',
            status:'ใช้งาน',
            round:'4',
            eduLevel : 'ปริญญาโท',
            studentType : 'ภาคปกติ',
            term : 'ภาคการศึกษาที่ 1',
            academicYear : '2569',
            display: 'แสดง' as const
        }

        await admissionCalendarInformationPage.searchByFilter(searchInfo)
        await expect(page.getByText('ปฏิทินรับสมัคร ปี 2569 ครั้งที่ 4 ภาคการศึกษาที่ 1 ปริญญาโท ภาคปกติ')).toBeVisible()
    });

    test('TC-04 ทดสอบสร้างปฏิทินการรับสมัคร' , async ({ admissionCalendarInformationPage, page}) => {
        test.setTimeout(80000)
        await admissionCalendarInformationPage.gotoPrograms()
        await admissionCalendarInformationPage.gotoAdmissionCalendarInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar/);
        await admissionCalendarInformationPage.clickAddCalendarButton()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar\/create.*/);
        await admissionCalendarInformationPage.checkAddCalendarPage()

        const addCalendarInfo = {
            display : 'ไม่แสดง' as const, 
            round : '4',
            education : 'ปริญญาโท',
            student : 'ภาคปกติ',
            term : 'ภาคการศึกษาที่ 2',
            year : '2569',
            faculty : 'GSAS - คณะสถิติประยุกต์',
        }
        await admissionCalendarInformationPage.filAddCalendarPageFirstStep(addCalendarInfo)
        await admissionCalendarInformationPage.clickSaveButton()
        await expect(page.getByRole('heading',{name:'บันทึกข้อมูลสำเร็จ'})).toBeVisible()
        await admissionCalendarInformationPage.clickNextStep()
        await admissionCalendarInformationPage.fillScheduleDates([
            {
                field: "วันเปิดรับสมัคร",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ (สอบสัมภาษณ์)",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันประกาศผลสอบข้อเขียน",
                startDate: "15072025",
                endDate: "15072025",
            },
            {
                field: "วันประกาศผลการคัดเลือก",
                startDate: "01082025",
                endDate: "01082025",
            },
            {
                field: "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ (ข้อเขียน)",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันรับเอกสารขึ้นทะเบียน",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันสอบสัมภาษณ์",
                startDate: "01062025",
                endDate: "30062025",
            },
            
            {
                field: "วันเปิดภาคการศึกษา",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันสอบข้อเขียน",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันปฐมนิเทศ",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันชำระเงินค่าลงทะเบียน",
                startDate: "01062025",
                endDate: "30062025",
            },
        ]);

        // await admissionCalendarInformationPage.reorderScheduleRows([
        //     "วันเปิดรับสมัคร",
        //     "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ (ข้อเขียน)",
        //     "วันสอบข้อเขียน",
        //     "วันประกาศผลสอบข้อเขียน",
        //     "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ (สอบสัมภาษณ์)",
        //     "วันสอบสัมภาษณ์",
        //     "วันประกาศผลการคัดเลือก",
        //     "วันรับเอกสารขึ้นทะเบียน",
        //     "วันชำระเงินค่าลงทะเบียน",
        //     "วันปฐมนิเทศ",
        //     "วันเปิดภาคการศึกษา",
        // ])
        await admissionCalendarInformationPage.clickSaveButton()
        await expect(page.getByRole('heading',{name:'บันทึกข้อมูลสำเร็จ'})).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar/);
    });

    test('TC-05 ทดสอบแก้ไขปฏิทินการรับสมัคร' , async ({ admissionCalendarInformationPage, page}) => {
        test.setTimeout(80000)
        await admissionCalendarInformationPage.gotoPrograms()
        await admissionCalendarInformationPage.gotoAdmissionCalendarInformationMenu()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar/);

        const searchInfo = {
            searchCalendarName:'ปฏิทินรับสมัคร ปี 2569 ครั้งที่ 5 ภาคการศึกษาที่ 2 ปริญญาโท ภาคปกติ',
            status:'ใช้งาน',
            // round:'4',
            // eduLevel : 'ปริญญาโท',
            // studentType : 'ภาคปกติ',
            // term : 'ภาคการศึกษาที่ 2',
            // academicYear : '2569',
            // display: 'แสดง' as const
        }

        await admissionCalendarInformationPage.searchByFilter(searchInfo)
        await expect(page.getByText('ปฏิทินรับสมัคร ปี 2569 ครั้งที่ 5 ภาคการศึกษาที่ 2 ปริญญาโท ภาคปกติ')).toBeVisible()
        await admissionCalendarInformationPage.clickKebabMenuByCard('ปฏิทินรับสมัคร ปี 2569 ครั้งที่ 5 ภาคการศึกษาที่ 2 ปริญญาโท ภาคปกติ')
        await admissionCalendarInformationPage.clickKebabOption('แก้ไข')
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar\/edit.*/);

        await admissionCalendarInformationPage.clickEditButton()
        const editCalendarInfo = {
            display : 'ไม่แสดง' as const, 
            round : '5',
            education : 'ปริญญาโท',
            student : 'ภาคปกติ',
            term : 'ภาคการศึกษาที่ 2',
        }
        await admissionCalendarInformationPage.filEditalendarPageFirstStep(editCalendarInfo)
        await admissionCalendarInformationPage.clickSaveButton()
        await expect(page.getByRole('heading',{name:'บันทึกข้อมูลสำเร็จ'})).toBeVisible()
        await admissionCalendarInformationPage.clickNextStep()

        await admissionCalendarInformationPage.clickEditButton()
        await admissionCalendarInformationPage.fillEditScheduleDates([
            {
                field: "วันเปิดรับสมัคร",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ (สอบสัมภาษณ์)",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันประกาศผลสอบข้อเขียน",
                startDate: "15072025",
                endDate: "15072025",
            },
            {
                field: "วันประกาศผลการคัดเลือก",
                startDate: "01082025",
                endDate: "01082025",
            },
            {
                field: "วันประกาศรายชื่อผู้มีสิทธิ์สอบและสถานที่สอบ (ข้อเขียน)",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันรับเอกสารขึ้นทะเบียน",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันสอบสัมภาษณ์",
                startDate: "01062025",
                endDate: "30062025",
            },
            
            {
                field: "วันเปิดภาคการศึกษา",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันสอบข้อเขียน",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันปฐมนิเทศ",
                startDate: "01062025",
                endDate: "30062025",
            },
            {
                field: "วันชำระเงินค่าลงทะเบียน",
                startDate: "01062025",
                endDate: "30062025",
            },
        ]);
        await admissionCalendarInformationPage.clickSaveButton()
        await expect(page.getByRole('heading',{name:'บันทึกข้อมูลสำเร็จ'})).toBeVisible()
        await expect(page).toHaveURL(/.*admin\/admission\/master\/academic-calendar/);
    });
});